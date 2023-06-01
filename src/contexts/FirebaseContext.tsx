import React, { createContext, useEffect, useReducer } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { LOGIN, LOGOUT } from '../store/actions';
import accountReducer from '../store/accountReducer';
import Loader from '../components/Loader/Loader';
import { FirebaseContextType, InitialLoginContextProps } from '../types';
import axios from '../utils/axios';
import { firebaseConfig } from '@/config/firebaseApp.config';

// firebase initialize
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// const
const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isEmailVerified: false,
    isInitialized: false,
    user: null,
};

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider = ({
    children,
}: {
    children: React.ReactElement;
}) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(
        () =>
            firebase.auth().onAuthStateChanged(async (user) => {
                if (user) {
                    const tokenResult = await user?.getIdTokenResult(true);

                    const userEmailVerified = user.emailVerified;
                    // localStorage.setItem('emailVerificationGreenifs', userEmailVerified.toString());

                    axios.defaults.headers.common.Authorization = `Bearer ${tokenResult.token}`;
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: userEmailVerified,
                            isEmailVerified: userEmailVerified,
                            user: {
                                id: user.uid,
                                email: user.email,
                                name: user.displayName || '',
                                token: tokenResult.token,
                                claims: tokenResult.claims,
                                photo: user.photoURL || '',
                                phone: user.phoneNumber,
                                isEmailVerified: userEmailVerified,
                            },
                        },
                    });
                } else {
                    delete axios.defaults.headers.common.Authorization;
                    dispatch({
                        type: LOGOUT,
                    });
                }
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dispatch]
    );

    const logout = () => firebase.auth().signOut();

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {
                    logout();
                }
                return Promise.reject(error);
            }
        );
        return () => axios.interceptors.response.eject(interceptor);
    }, []);

    const firebaseEmailPasswordSignIn = (email: string, password: string) =>
        firebase.auth().signInWithEmailAndPassword(email, password);

    const firebaseGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        return firebase.auth().signInWithPopup(provider);
    };

    const firebaseRegister = async (email: string, password: string) => {
        const userCredential = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
        firebase.auth().currentUser?.sendEmailVerification();
        return userCredential;
    };

    const firebaseResendEmailVerification = async () => {
        const data = await firebase.auth().currentUser?.sendEmailVerification();
        return data;
    };

    const verifyEmail = async (code: string) => {
        await firebase.auth().applyActionCode(code);
        return { isVerifiedEmail: true, firebase };
    };

    const checkActionCode = async (code: string) => {
        const info = await firebase.auth().checkActionCode(code);
        return info;
    };

    const checkFirebaseEmailVerification = async () => {
        const data = await firebase.auth().currentUser?.emailVerified;
        return data;
    };

    const resetPassword = async (email: string) => {
        await firebase.auth().sendPasswordResetEmail(email);
    };

    const updateProfile = async (name: string, email: string) => {
        const user = firebase.auth().currentUser;
        if (user?.email !== email) {
            await user?.updateEmail(email);
        }
        if (user?.displayName !== name) {
            await user?.updateProfile({ displayName: name });
        }
    };

    const updatePhoto = async (photoUrl: string) => {
        const user = firebase.auth().currentUser;
        if (user?.photoURL !== photoUrl) {
            await user?.updateProfile({ photoURL: photoUrl });
        }
    };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <FirebaseContext.Provider
            value={{
                ...state,
                firebaseRegister,
                firebaseEmailPasswordSignIn,
                login: () => {},
                firebaseGoogleSignIn,
                logout,
                resetPassword,
                updateProfile,
                updatePhoto,
                firebaseResendEmailVerification,
                verifyEmail,
                checkFirebaseEmailVerification,
                checkActionCode,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseContext;
