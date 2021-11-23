import {
    UserAuthTypes
} from '../../interface/storeTypes';

export const USERAUTH = 'auth/USERAUTH';
export const LOGGING = 'auth/LOGGING';
export const MODALONOFF = 'modal/MODALONOFF';
export const SETMODAL = 'modal/SETMODAL';

export function userAuth(props: UserAuthTypes) {
    return {
        type: USERAUTH,
        userId: props?.userId,
        username: props?.username,
        realname: props?.realname,
        email: props?.email,
        contact: props?.contact,
    }
}

export function logging(logged: boolean) {
    return {
        type: LOGGING,
        logging: logged
    }
}

export function modalOnOff(isOpen: boolean) {
    return {
        type: MODALONOFF,
        isOpen,
    };
}

export function setModal(modalComponent: JSX.Element) {
    return {
        type: SETMODAL,
        modalComponent,
    };
}