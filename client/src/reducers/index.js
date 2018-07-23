import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userFetchReducer from './userFetchReducer';
import recipesReducer from './recipesReducer';

export default combineReducers({
    user: userFetchReducer,
    form: formReducer,
    recipes: recipesReducer
});
