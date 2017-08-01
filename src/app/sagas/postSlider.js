import { take, put, fork, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import {
  ACTIVE_POST_SLIDE_CHANGE_REQUESTED,
  ACTIVE_POST_SLIDE_CHANGE_STARTED,
  ACTIVE_POST_SLIDE_CHANGE_FINISHED,
  POST_HAS_SCROLLED,
} from '../types';
import { actions, types } from '../deps';
import { postSlider } from '../actions';

function* handleSlideChange(action) {
  const { activeSlide, sliderAnimation, sliderLength } = action;

  yield put(
    postSlider.activePostSlideChangeStarted({
      activeSlide,
    })
  );

  yield put(
    postSlider.activePostSlideChangeFinished({
      activeSlide,
      sliderAnimation,
      sliderLength,
    })
  );
}

function* handleSlideChangeWatcher() {
  yield takeEvery(ACTIVE_POST_SLIDE_CHANGE_REQUESTED, handleSlideChange);
}

function* handlePostsPrefetching() {
  //eslint-disable-next-line
  while (true) {
    const action = yield take(ACTIVE_POST_SLIDE_CHANGE_FINISHED);

    if (action.activeSlide >= action.sliderLength - 2) {
      yield put(actions.anotherPostsPageRequested());
      yield take(
        ({ type, name }) =>
          (type === types.ANOTHER_POSTS_PAGE_SUCCEED || type === types.ANOTHER_POSTS_PAGE_FAILED) &&
          name === 'currentList'
      );
    }
  }
}

function* handleHiddenBarsOnScroll(action) {
  const hiddenBars = yield select(state => state.theme.postSlider.hiddenBars);
  const { direction } = action;

  if (direction === 'up' && !hiddenBars) {
    yield put(postSlider.barsHaveHidden());
  } else if (direction === 'down' && hiddenBars) {
    yield put(postSlider.barsHaveShown());
  }
}

function* handleHiddenBarsOnScrollWatcher() {
  yield takeEvery(POST_HAS_SCROLLED, handleHiddenBarsOnScroll);
}

function* handleHiddenBarsOnSlideChange() {
  const hiddenBars = yield select(state => state.theme.postSlider.hiddenBars);

  if (hiddenBars) yield put(postSlider.barsHaveShown());
}

function* handleHiddenBarsOnSlideChangeWatcher() {
  yield takeEvery(ACTIVE_POST_SLIDE_CHANGE_STARTED, handleHiddenBarsOnSlideChange);
}

export default function* postSliderSagas() {
  yield [
    fork(handleSlideChangeWatcher),
    fork(handlePostsPrefetching),
    fork(handleHiddenBarsOnScrollWatcher),
    fork(handleHiddenBarsOnSlideChangeWatcher),
  ];
}
