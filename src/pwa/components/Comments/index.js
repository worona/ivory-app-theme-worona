import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dynamic from '@worona/next/dynamic';
import { connect } from 'react-redux';
import CommentsIcon from 'react-icons/lib/fa/comments-o';
import ArrowIcon from 'react-icons/lib/fa/angle-down';
import styled from 'styled-components';
import { dep } from 'worona-deps';

const loading = () => null;
const DynamicDisqus = dynamic(import('../../elements/Disqus'), { loading });

class Comments extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      wasOpen: false,
    };
  }

  componentWillUpdate(nextProps) {
    // Close panel when not active.
    if (this.props.active && !nextProps.active && this.state.isOpen) this.toggle();
  }

  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen, wasOpen: true }));
  }

  render() {
    const { id, shortname, active } = this.props;
    const { isOpen, wasOpen } = this.state;

    return shortname ? (
      <Container>
        <Button onClick={this.toggle}>
          <CommentsIconWrapper>
            <CommentsIcon size={40} />
          </CommentsIconWrapper>
          <span>{'Comentarios'}</span>
          <ArrowIconWrapper isOpen={isOpen}>
            <ArrowIcon size={40} />
          </ArrowIconWrapper>
        </Button>
        <InnerContainer isOpen={isOpen}>
          {active && wasOpen && <DynamicDisqus id={id} shortname={shortname} />}
        </InnerContainer>
      </Container>
    ) : null;
  }
}

Comments.propTypes = {
  id: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  shortname: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  shortname: dep('settings', 'selectorCreators', 'getSetting')('theme', 'disqus')(state) || '',
});

export default connect(mapStateToProps)(Comments);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0 10px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
`;

const Button = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: white !important;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #535353;
  outline: none;
`;

const CommentsIconWrapper = styled.div`
  position: relative;
  display: block;
`;

const ArrowIconWrapper = styled.div`
  transition: transform 300ms;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg);'};
`;

const InnerContainer = styled.div`
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? '100%' : 0)};
`;
