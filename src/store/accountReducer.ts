// action - state management
import { LOGIN, LOGOUT, REGISTER } from './actions';
import { InitialLoginContextProps } from '../types';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    isEmailVerified: false,
    user: null,
};

interface AccountReducerActionProps {
    type: string;
    payload?: InitialLoginContextProps;
}

// eslint-disable-next-line
const accountReducer = (state = initialState, action: AccountReducerActionProps) => {
    switch (action.type) {
        case REGISTER: {
            const { user } = action.payload!;
            return {
                ...state,
                user,
            };
        }
        case LOGIN: {
            const { user, isLoggedIn } = action.payload!;
            return {
                ...state,
                isLoggedIn,
                isInitialized: true,
                user,
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                user: null,
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
