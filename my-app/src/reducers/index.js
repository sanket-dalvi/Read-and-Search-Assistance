// reducers/index.js
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer
  // add your other reducers here
});

export default rootReducer;
