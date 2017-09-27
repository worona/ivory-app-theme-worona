/* global window */
import { takeEvery } from 'redux-saga/effects';
import * as types from '../types';

function classicVersion() {
  window.document.cookie = 'woronaClassicVersion=true;path=/';
  window.location.reload(true);
}

export default function* footerSagas() {
  yield takeEvery(types.CLASSIC_VERSION_REQUESTED, classicVersion);
}
