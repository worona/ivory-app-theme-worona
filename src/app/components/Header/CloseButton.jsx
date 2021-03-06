import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import IconClose from 'react-icons/lib/md/close';
import styled, { keyframes } from 'styled-components';
import { libs, selectors } from '../../deps';

class CloseButton extends PureComponent {
  constructor() {
    super();

    this.state = {
      touched: false,
    };
  }

  toggleTouched() {
    this.setState(
      {
        touched: !this.state.touched,
      },
      () => {
        setTimeout(() => {
          this.setState({
            touched: !this.state.touched,
          });
        }, 150);
      }
    );
  }

  render() {
    return (
      <Container
        touched={this.state.touched}
        onClick={() => {
          this.toggleTouched();
          this.props.goBack();
        }}
      >
        <IconClose size={33} />
      </Container>
    );
  }
}

CloseButton.propTypes = {
  goBack: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  historyLength: selectors.getHistoryLength(state),
});

const mergeProps = ({ historyLength }) => ({
  goBack() {
    if (historyLength > 1) libs.goBack();
    else libs.push('?');
  },
});

export default connect(mapStateToProps, null, mergeProps)(CloseButton);

const touch = keyframes`
  100% {
    background-color: rgba(255, 255, 255, 0.2)
  }
`;

const Container = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  width: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 15px;
  z-index: 50;

  animation-name: ${({ touched }) => (touched ? touch : '')};
  animation-duration: 70ms;
  animation-timing-function: ease-out;
  animation-iteration-count: 2;
  animation-direction: alternate;
`;
