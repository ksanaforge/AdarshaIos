import Immutable from 'immutable';
import _ from 'lodash';

const open = require('../helpers/openDb');

const SET_DB = 'SET_DB';
const SET_DB_ERROR = 'SET_DB_ERROR';
const SET_LOADING = 'SET_LOADING';
const SET_SELECTED_TAB = 'SET_SELECTED_TAB';
const SET_SUTRA_MAP = 'SET_SUTRA_MAP';
const SET_TOC_ROWS = 'SET_TOC_ROWS';

const initialState = Immutable.Map({
  db: null,
  dbError: null,
  loading: false,
  selectedTab: 'category',
  sutraMap: {}
});

const actionsMap = {

  [SET_DB]: (state, action) => state.set('db', action.db),

  [SET_DB_ERROR]: (state, action) => state('dbError', action.err),

  [SET_LOADING]: (state, action) => state.set('loading', action.loading),

  [SET_SELECTED_TAB]: (state, action) => state.set('selectedTab', action.selectedTab),

  [SET_SUTRA_MAP]: (state, action) => state.set('sutraMap', action.sutraMap)
};

export default function reducer(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  return reduceFn ? reduceFn(state, action) : state;
}

export function openDb() {

  return dispatch => {

    return open()
      .then(db => {

        db.get([['fields', 'sutra_id'], ['fields', 'sutra_vpos'], ['fields', 'head']], (fields) => {
          let [sutraIds, sutraVposs, heads] = fields;
          let rows = sutraVposs.map((vpos, index) => ({vpos, head: heads[index]}));
          let sutraMap = _.object(sutraIds, rows);
          dispatch(setSutraMap(sutraMap));
        });
        dispatch(setDb(db));
        return db;
      })
      .catch(err => {
        dispatch(setDbError(err));
        return err;
      });
  };
}

export function setDb(db) {
  return {
    type: SET_DB,
    db
  };
}

export function setDbError(err) {
  return {
    type: SET_DB_ERROR,
    err
  };
}

export function setLoading(loading) {
  return {
    type: SET_LOADING,
    loading
  };
}

export function setSelectedTab(selectedTab) {
  return {
    type: SET_SELECTED_TAB,
    selectedTab
  };
}

export function setSutraMap(sutraMap) {
  return {
    type: SET_SUTRA_MAP,
    sutraMap
  };
}