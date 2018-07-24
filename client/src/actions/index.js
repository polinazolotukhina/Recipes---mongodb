import * as types from './types';
import axios from 'axios';

export const getUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: types.FETCH_USER, payload: res.data });
};

export const getRecipies = param => async dispatch => {
    const res = await axios.get(`/api/recipes/${param}`);
    dispatch({ type: types.FETCH_RECIPE, payload: res.data });
};

export const deleteRecipies = recipeId => async dispatch => {
    await axios.delete(`/api/delete-recipe/${recipeId}`);
    const res = await axios.get(`/api/recipes`);
    dispatch({ type: types.FETCH_RECIPE, payload: res.data });
};

export const getUserRecipies = id => async dispatch => {
    const res = await axios.get(`/api/user_recipes/${id}`);
    dispatch({ type: types.FETCH_RECIPE, payload: res.data });
};

export const postRecipe = (values, history) => async dispatch => {
    const res = await axios({
        method: 'post',
        url: '/api/new_recipe',
        data: values
    });
    history.push('/recipes');
    dispatch({ type: types.POST_RECIPE, payload: res.data });
};
