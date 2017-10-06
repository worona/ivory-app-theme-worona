/* eslint react/no-danger: 0, jsx-a11y/no-static-element-interactions: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import * as selectorCreators from '../../selectorCreators';
import Media from '../Media';
import ShareButton from './ShareButton';

const ListItem = ({ Link, id, title, media, excerpt /* , author */}) =>
  <Post>
    <Link type="post" id={id}>
      <A>
        <Media lazy id={media} width="40%" />
        <Info>
          <Title dangerouslySetInnerHTML={{ __html: title }} />
          {/* <Author>
            {author}
          </Author> */}
          <Excerpt>{excerpt}</Excerpt>
        </Info>
      </A>
    </Link>
    <ShareButton id={id} type={'posts'} />
  </Post>;

ListItem.propTypes = {
  Link: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  media: PropTypes.number.isRequired,
  // author: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { id }) => ({
  title: selectorCreators.post.getTitle(id)(state),
  media: selectorCreators.post.getMedia(id)(state),
  author: selectorCreators.post.getAuthor(id)(state),
  excerpt: selectorCreators.post.getShortExcerpt(id)(state),
  Link: dep('connection', 'components', 'Link'),
});

export default connect(mapStateToProps)(ListItem);

const Post = styled.div`
  box-sizing: border-box;
  min-height: 20vh;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.postListLight};
  box-shadow: 0 0 3px 0 ${({ theme }) => theme.shadowColor};
  position: relative;
`;

const A = styled.a`
  all: inherit;
  box-shadow: none;
  display: flex;
  flex-direction: row-reverse;
  margin: 0;
`;

const Info = styled.div`
  box-sizing: border-box;
  width: 60%;
  height: 100%;
`;

const Title = styled.p`
  box-sizing: border-box;
  margin: 0;
  padding: 10px;
  padding-right: 20px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.4rem;
  color: ${({ theme }) => theme.postListDark};
`;

// const Author = styled.p`
//   display: inline-block;
//   font-weight: 300;
//   padding: 10px;
//   padding-top: 0;
//   color: ${({ theme }) => theme.postListGrey};
//   margin: 0;
//   text-transform: uppercase;
//   font-size: 0.7rem;
// `;


const Excerpt = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 300;
  margin: 10px;
  margin-top: 0;
  color: ${({ theme }) => theme.postListGrey};
  font-size: 0.8rem;
`;
