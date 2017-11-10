import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import { dep } from 'worona-deps';
import IconInstagram from 'react-icons/lib/fa/instagram';
import styled from 'styled-components';

class LazyInstagram extends Component {
  constructor() {
    super();

    this.ref = null;
    this.state = {
      loaded: false,
    };

    this.handleContentVisible = this.handleContentVisible.bind(this);
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return this.state.loaded !== nextState.loaded;
  }

  componentWillUpdate() {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else if (!window.document.getElementById('lazy-instagram')) {
      const script = window.document.createElement('script');
      script.id = 'lazy-instagram';
      script.src = '//platform.instagram.com/en_US/embeds.js';
      script.async = true;
      script.defer = true;
      script.chartset = 'utf-8';
      script.onload = () => window.instgrm.Embeds.process();

      window.document.body.appendChild(script);
    }
  }

  handleContentVisible() {
    this.setState({
      loaded: true,
    });
  }

  render() {
    const { children, width, height, isAmp, instagramId } = this.props;

    return (
      <Container
        height={height}
        width={width}
        innerRef={node => {
          this.ref = node;
        }}
      >
        {!this.state.loaded && (
          <Icon>
            <IconInstagram size={40} />
          </Icon>
        )}
        {isAmp ? (
          <amp-instagram
            data-shortcode={instagramId}
            data-captioned
            width="1"
            height="1"
            layout="responsive"
          />
        ) : (
          <StyledLazyLoad
            offsetVertical={700}
            throttle={50}
            onContentVisible={this.handleContentVisible}
          >
            {children}
          </StyledLazyLoad>
        )}
      </Container>
    );
  }
}

LazyInstagram.propTypes = {
  children: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  isAmp: PropTypes.bool.isRequired,
  instagramId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isAmp: dep('build', 'selectors', 'getAmp')(state),
});

export default connect(mapStateToProps)(LazyInstagram);

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: ${props => props.width};
  height: ${props => props.height};
  min-height: 170px;
  padding: 0 15px;
  margin: 15px 0;

  blockquote {
    margin: 0;
  }

  amp-instagram {
    border: 1px solid #dbdbdb;
    border-radius: 4px;
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 65px;
  left: 0;
  color: #bdbdbd;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLazyLoad = styled(LazyLoad)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  background-color: transparent;
  border: none !important;
  z-index: 10 !important;
`;
