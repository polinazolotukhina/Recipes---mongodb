import { FETCH_RECIPE } from '../actions/types';

export default function(state = [], action) {
    console.log(action);
    switch (action.type) {
        case FETCH_RECIPE:
            return action.payload || [];

        default:
            return state;
    }
}
