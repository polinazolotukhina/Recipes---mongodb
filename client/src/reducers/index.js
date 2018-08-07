import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userFetchReducer from './userFetchReducer';
import recipesReducer from './recipesReducer';
import buttonReducer from './buttonReducer';

export default combineReducers({
    user: userFetchReducer,
    form: formReducer,
    recipes: recipesReducer,
    activeButton: buttonReducer
});
