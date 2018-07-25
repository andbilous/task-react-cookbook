import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
    form: formReducer,
    recipes: recipesReducer
});

export default rootReducer;