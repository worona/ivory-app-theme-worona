import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import IconNext from 'react-icons/lib/fa/angle-right';
import { dep } from 'worona-deps';
import Truncate from 'react-truncate';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

const NextButton = ({
  isListLoading,
  isLastPost,
  activeSlide,
  sliderLength,
  activePostSlideChangeStarted,
  anotherPostsPageRequested,
}) => {
  const loadingText = isListLoading ? 'Cargando...' : 'Cargar más';
  const isLastSlide = activeSlide === sliderLength - 1;

  return (
    !isLastPost && (
      <Container
        onClick={() => {
          if (sliderLength && activeSlide + 1 < sliderLength) {
            activePostSlideChangeStarted({ from: 'next-button', direction: 'right' });
          } else if (!isListLoading) {
            anotherPostsPageRequested();
          }
        }}
      >
        <Text>
          <Truncate>{isLastSlide ? loadingText : 'Siguiente'}</Truncate>
        </Text>
        {!isLastSlide && <StyledIconNext />}
      </Container>
    )
  );
};

NextButton.propTypes = {
  isListLoading: PropTypes.bool.isRequired,
  isLastPost: PropTypes.bool.isRequired,
  activeSlide: PropTypes.number.isRequired,
  sliderLength: PropTypes.number.isRequired,
  activePostSlideChangeStarted: PropTypes.func.isRequired,
  anotherPostsPageRequested: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activeSlide: selectors.post.getActiveSlide(state),
  sliderLength: selectors.post.getSliderLength(state),
  isListLoading: dep('connection', 'selectorCreators', 'isListLoading')('currentList')(state),
  isLastPost: selectors.post.isLastPost(state),
});

const mapDispatchToProps = dispatch => ({
  activePostSlideChangeStarted: payload =>
    dispatch(actions.postSlider.activePostSlideChangeStarted(payload)),
  anotherPostsPageRequested: () =>
    dispatch(dep('connection', 'actions', 'anotherPostsPageRequested')()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextButton);

const Container = styled.div`
  height: 100%;
  width: auto;
  max-width: 35vw;
  margin: 0;
  margin-left: 5px;
  padding: 0 5px 0 10px;
  background: #bdbdbd;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  align-items: center;
  user-select: none;

  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  text-transform: uppercase;
`;

const StyledIconNext = styled(IconNext)`
  height: 1em;
  width: 1em;
  padding-bottom: 1px;
  padding-left: 0px;
`;
