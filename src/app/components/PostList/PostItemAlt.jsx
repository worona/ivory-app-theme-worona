/* eslint react/no-danger: 0, jsx-a11y/no-static-element-interactions: 0 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Media from '../Media';
import ShareButton from './ShareButton';
import * as actions from '../../actions';

const PostItemAlt = ({ id, post, postList, title, author, activePostSlideChangeRequested }) =>
  <Post>
    <StyledLink
      to={`?p=${id}`}
      onClick={() => {
        const index = postList.indexOf(post.id);

        activePostSlideChangeRequested({
          activeSlide: index,
          sliderAnimation: null,
          sliderLength: postList.length,
        });
      }}
    >
      <Media lazy id={post.featured_media} height="30vh" width="100%" />
      <Info>
        <Title dangerouslySetInnerHTML={{ __html: title }} />
        <Author>
          {author.name}
        </Author>
      </Info>
    </StyledLink>
    <ShareButton id={post.id} wpType={'posts'} />
  </Post>;

PostItemAlt.propTypes = {
  id: PropTypes.number.isRequired,
  post: PropTypes.shape({}).isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({}).isRequired,
  activePostSlideChangeRequested: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activeSlide: state.theme.postSlider.final.activeSlide,
});

const mapDispatchToProps = dispatch => ({
  activePostSlideChangeRequested: payload =>
    dispatch(actions.postSlider.activePostSlideChangeRequested(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItemAlt);

const Post = styled.div`
  box-sizing: border-box;
  min-height: 20vh;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.postListLight};
  color: ${({ theme }) => theme.postListDark};
  box-shadow: 0 0 3px 0 ${({ theme }) => theme.shadowColor};
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  all: inherit;
  margin: 0;
`;

const Info = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.p`
  box-sizing: border-box;
  margin: 0;
  padding: 10px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.5rem;
`;

const Author = styled.p`
  font-weight: 300;
  padding: 10px;
  padding-top: 0;
  color: ${({ theme }) => theme.postListGrey};
  margin: 0;
  text-transform: uppercase;
  font-size: 0.7rem;
  display: inline-block;
`;
