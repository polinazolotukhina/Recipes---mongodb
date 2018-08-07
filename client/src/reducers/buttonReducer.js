import { ACTIVE_BUTTON } from '../actions/types';

export default function(state = '', action) {
    switch (action.type) {
        case ACTIVE_BUTTON:
            return action.payload;
        default:
            return state;
    }
}
