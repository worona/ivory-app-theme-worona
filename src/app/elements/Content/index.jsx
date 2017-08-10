/* eslint react/no-danger: 0 */
import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import HtmlToReactConverter from '../../components/HtmlToReactConverter';
import converters from '../../libs/converters';
import Ad from '../../components/Ad';

class Content extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.content !== nextProps.content) return true;

    return false;
  }

  render() {
    const { content, slide } = this.props;
    return (
      <Container>
        <HtmlToReactConverter
          html={content}
          converters={converters}
          extraProps={{ [Ad]: { slide } }}
        />
      </Container>
    );
  }
}

Content.propTypes = {
  content: PropTypes.string.isRequired,
  slide: PropTypes.number,
};

export default Content;

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  width: 100%;

  * {
    max-width: 100%;
  }

  a {
    font-size: inherit;
    text-decoration: underline;
    color: steelblue;
  }

  h1,
  h2 {
    padding: 0 15px;
    font-size: 1.5rem;
    margin: 15px 0;
    margin-top: 30px;
  }

  h3,
  h4,
  h5,
  h6 {
    padding: 0 15px;
    margin: 15px 0;
    margin-top: 30px;
  }

  p {
    margin: 15px 0;
    padding: 0 15px;
    hyphens: auto;
  }

  strong {
    font-size: inherit;
  }

  ul {
    margin: 15px;
  }

  div.video-container {
    margin: 20px 0;
  }

  div.gallery {
    display: flex;
    justify-content: center;
    padding: 0 15px;
    margin: 30px 0 !important;
  }

  iframe {
    width: 100% !important;
    height: 35vh;
  }

  figure {
    box-sizing: border-box;
    margin: 15px 0;
    margin-top: 30px;
    padding: 0 15px;
    width: 100% !important;
  }

  blockquote {
    margin: 30px 15px;
    padding: 10px;
  }

  blockquote p:nth-child(2) {
    text-align: right;
    padding-left: 25%;
  }

  blockquote::after {
    content: '';
  }

  aside {
    box-sizing: border-box;
    box-shadow: 0 0 3px 0 #333;
    margin: 30px 15px;
    display: flex;
  }
`;
