import { combineReducers } from 'redux';
import {
    MODALONOFF, SETMODAL,
    LOGGING, USERAUTH,
} from '../actions';

import { UserAuthTypes } from '../../interface/storeTypes';

type ModalActionType = {
    type: string;
    payload: any;
    isOpen?: boolean;
    modalComponent?: JSX.Element;
}

const modalInitialState = {
    isOpen: false,
    modalComponent: null,
};

const modal = (state = modalInitialState, action: ModalActionType) => {
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

type AuthActionType = {
    type: string;
    logging?: boolean;
} & UserAuthTypes

const authInitialState = {
    jwt: null,
    username: null,
    userId: null,
    realname: null,
    logging: false,
};

const auth = (state = authInitialState, action: AuthActionType) => {
    switch (action.type) {
        case LOGGING:
            return {
                ...state,
                logging: action.logging,
            }
        case USERAUTH:
            return {
                ...state,
                jwt: action.jwt,
                userId: action.userId,
                username: action.username,
                realname: action.realname,
            }
        default:
            return state;
    }
}

const reducer = combineReducers({
    modal,
    auth,
});

export default reducer;