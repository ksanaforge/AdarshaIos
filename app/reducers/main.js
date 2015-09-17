import * as types from '../actions/mainActions';
import Immutable from 'immutable';

const initialState = Immutable.Map({
  db: null,
  dbError: null,
  selectedTab: 'keyboardSearch'
});

const actionsMap = {
  [types.SET_DB]: setDb,
  [types.SET_DB_ERROR]: setDbError,
  [types.SET_SELECTED_TAB]: setSelectedTab
};

export default function main(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  return reduceFn ? reduceFn(state, action) : state;
}

function setSelectedTab(state, action) {
  return state.set('selectedTab', action.selectedTab);
}

function setDb(state, action) {
  return state.set('db', action.db);
}

function setDbError(state, action) {
  return state.set('dbError', action.err);
}
