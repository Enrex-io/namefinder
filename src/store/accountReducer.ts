// action - state management
import { LOGIN, LOGOUT, REGISTER } from './actions';
import { InitialLoginContextProps } from '@/types';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState: InitialLoginContextProps = {
    isInitialized: false,
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
            const { user } = action.payload!;
            return {
                ...state,
                isInitialized: true,
                user,
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isInitialized: true,
                user: null,
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
