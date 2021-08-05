import { MODALONOFF, SETMODAL } from '../actions';
import { combineReducers } from 'redux';

type actionType = {
    type: string;
    payload: any;
    isOpen?: boolean;
    modalComponent?: JSX.Element;
}

const modalInitialState = {
    isOpen: false,
    modalComponent: null,
};

const modal = (state = modalInitialState, action: actionType) => {
    switch(action.type) {
        case MODALONOFF:
            return {
                ...state,
                isOpen: action.isOpen,
            }
        case SETMODAL:
            return {
                ...state,
                modalComponent: action.modalComponent,
            }
        default:
            return state;
    }
};

const reducer = combineReducers({
    modal
});

export default reducer;