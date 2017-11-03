import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Media from '../../Media';
import Header from '../../Post/Header';
import Content from '../../../elements/Content';
import SeoWord from '../../../elements/SeoWord';
import TagList from '../../Post/TagList';
import Comments from '../../Comments';
import MorePosts from '../../MorePosts';
import MainFooter from '../../Footer';
import * as selectorCreators from '../../../selectorCreators';

const PostItem = ({ id, media, slide }) => (
  <Container>
    <InnerContainer>
      <Media id={media} lazy height="55vh" width="100%" />
      <Header id={id} active />
      <Content id={id} type={'post'} slide={slide} />
      <TagList id={id} />
      <Comments id={id} active />
      <MorePosts currentPost={id} onlyFollowing />
      <SeoWord />
      <MainFooter />
    </InnerContainer>
  </Container>
);

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  media: PropTypes.number.isRequired,
  slide: PropTypes.number.isRequired,
};

const mapStateToProps = (state, { id }) => ({
  media: selectorCreators.post.getMedia(id)(state),
});

export default connect(mapStateToProps)(PostItem);

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.postLight};
  color: ${({ theme }) => theme.postDark};
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  transition: padding-top 0.5s ease;
  z-index: 0;
  position: relative;
`;

const InnerContainer = styled.div`
  padding-top: ${({ theme }) => theme.titleSize};
  padding-bottom: ${({ theme }) => theme.shareBarHeight};
`;