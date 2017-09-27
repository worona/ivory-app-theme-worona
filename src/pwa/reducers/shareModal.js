import { combineReducers } from 'redux';
import * as types from '../types';

const isOpen = (state = false, action) => {
  switch (action.type) {
    case types.SHARE_MODAL_OPENING_REQUESTED:
      return true;
    case types.SHARE_MODAL_CLOSING_REQUESTED:
      return false;
    default:
      return state;
  }
};

const id = (state = null, action) => {
  switch (action.type) {
    case types.SHARE_MODAL_OPENING_REQUESTED:
      return action.id;
    default:
      return state;
  }
};

const wpType = (state = null, action) => {
  switch (action.type) {
    case types.SHARE_MODAL_OPENING_REQUESTED:
      return action.wpType;
    default:
      return state;
  }
};

const counts = (state = {}, action) => {
  switch (action.type) {
    case types.SHARE_COUNT_SUCCEED:
      return { ...state, [action.id]: { ...state[action.id], [action.network]: action.value } };
    default:
      return state;
  }
};

const isReady = (state = {}, action) => {
  switch (action.type) {
    case types.ALL_SHARE_COUNT_RESOLVED:
      return { ...state, [action.id]: true };
    default:
      return state;
  }
};

const linkCopied = (state = false, action) => {
  switch (action.type) {
    case types.LINK_COPIED:
      return action.value;
    default:
      return state;
  }
};

const entities = combineReducers({
  counts,
  isReady,
});

const shareModal = combineReducers({
  isOpen,
  id,
  wpType,
  entities,
  linkCopied,
});

export default shareModal;
