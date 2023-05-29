import {
    useState,
    useEffect,
    useContext,
    createContext,
    ReactElement,
} from 'react';
import firebase from '../firebase';
import { UserProfile } from '@/types';
import axios from '@/utils/axios';

type User = UserProfile | null | false;
interface UserContext {
    user: User;
    signout?: () => void;
}

const authContext = createContext<UserContext>({ user: null });

export function ProvideAuth({ children }: { children: ReactElement | null }) {
    const AuthContextProvider = authContext.Provider;
    const auth = useProvideAuth();
    return <AuthContextProvider value={auth}>{children}</AuthContextProvider>;
}

export const useAuth = () => {
    return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState<User>(null);

    const signout = async () => {
        await firebase.auth().signOut();
        setUser(false);
    };

    useEffect(() => {
        if (!firebase.auth) return;
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.getIdTokenResult(true)
                    .then((authResult) => {
                        setUser({
                            id: user.uid,
                            photo: user.photoURL,
                            email: user.email,
                            name: user.displayName,
                            phone: user.phoneNumber,
                            token: authResult.token,
                            claims: authResult.claims,
                            isEmailVerified: user.emailVerified,
                        });
                        axios.defaults.headers.common.Authorization = `Bearer ${authResult.token}`;
                    })
                    .catch(() => {
                        delete axios.defaults.headers.common.Authorization;
                        setUser(false);
                    });
            } else {
                delete axios.defaults.headers.common.Authorization;
                setUser(false);
            }
        });
        return () => unsubscribe();
    }, []);

    return {
        user,
        signout,
    };
}
