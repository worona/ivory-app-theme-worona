import { createSelector } from 'reselect';
import * as selectorCreators from '../selectorCreators';
import * as deps from '../deps';

export const isOpen = state => state.theme.shareModal.isOpen;
export const getId = state => state.theme.shareModal.id;
export const getWpType = state => state.theme.shareModal.wpType;

export const getEntity = createSelector(state => state, getWpType, getId, (state, wpType, id) =>
  deps.selectorCreators.getWpTypeById(wpType, id)(state)
);

export const areCurrentCountsReady = createSelector(state => state, getId, (state, id) =>
  selectorCreators.areCountsReady(id)(state)
);

export const getCurrentCounts = createSelector(
  state => state,
  getId,
  areCurrentCountsReady,
  (state, id, countsReady) => (countsReady ? state.theme.shareModal.entities.counts[id] : {})
);

export const getCurrentTotalShares = createSelector(
  state => state,
  getId,
  areCurrentCountsReady,
  (state, id, countsReady) => (countsReady ? selectorCreators.getTotalShares(id)(state) : NaN)
);

export const isLinkCopied = state => state.theme.shareModal.linkCopied;
