import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import PostItem from './PostItem';
import Spinner from '../../elements/Spinner';

const MorePosts = ({ currentPost, posts, postList, isReady, onlyFollowing }) => {
  const currentIndex = postList.indexOf(currentPost);
  return (
    <Container>
      <h4>{`${onlyFollowing ? 'Siguientes' : 'Otros'} artículos`}</h4>
      {(!isReady) ? <Spinner /> : null}
      <List>
        {postList.map((id, index) => {
          if (onlyFollowing && index <= currentIndex) return null;
          if (index === currentIndex) return null;
          return (
            <PostItem
              id={id}
              key={id}
              post={posts[id]}
              postList={postList}
              title={posts[id].title.rendered}
              author={''}
            />
          );
        })}
      </List>
    </Container>
  );
};

MorePosts.propTypes = {
  currentPost: PropTypes.number.isRequired,
  posts: PropTypes.shape({}).isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  isReady: PropTypes.bool.isRequired,
  onlyFollowing: PropTypes.bool,
};

const mapStateToProps = state => ({
  posts: dep('connection', 'selectors', 'getPostsEntities')(state),
  postList: dep('connection', 'selectorCreators', 'getListResults')('currentList')(state),
  isReady: dep('connection', 'selectorCreators', 'isListReady')('currentList')(state),
});

export default connect(mapStateToProps)(MorePosts);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0 10px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  margin-bottom: 5px;
`;

const List = styled.div`
  height: 150px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: stretch;
  overflow-y: scroll;
`;