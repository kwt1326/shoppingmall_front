import { MODALONOFF, SETMODAL } from '../actions';
import { HYDRATE } from 'next-redux-wrapper';
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
        case HYDRATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

const reducer = combineReducers({
    modal
});

export default reducer;