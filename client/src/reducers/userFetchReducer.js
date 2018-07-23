import { U_REQUEST, U_SUCCESS, U_FAILURE, FETCH_USER } from '../actions/types';

const INITIAL_STATE = {
    user: {
        data: {},
        isLoading: false,
        error: false
    }
};

export default function fetchUser(state = INITIAL_STATE.user, action) {
    switch (action.type) {
        case U_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case U_SUCCESS:
            return {
                isLoading: false,
                error: null,
                data: action.data
            };

        case U_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.data
            };
        case FETCH_USER:
            return action.payload || false;

        default:
            return state;
    }
}
