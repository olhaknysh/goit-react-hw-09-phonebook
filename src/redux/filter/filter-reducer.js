import { createReducer } from '@reduxjs/toolkit';
import * as actions from './filter-actions';

const filterReducer = createReducer('', {
  [actions.setFilter]: (_, { payload }) => payload,
});

export default filterReducer;
