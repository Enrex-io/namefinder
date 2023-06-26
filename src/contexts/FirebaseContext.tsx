import React, { createContext, useEffect, useReducer } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { LOGIN, LOGOUT } from '@/store/actions';
import accountReducer from '../store/accountReducer';
import { FirebaseContextType, InitialLoginContextProps } from '@/types';
import axios from '../utils/axios';
import { firebaseConfig } from '@/config/firebaseApp.config';
import { AxiosError, AxiosResponse } from 'axios';
import FullscreenLoader from '@/components/Loader/FullscreenLoader';

// firebase initialize
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// const
const initialState: InitialLoginContextProps = {
    isInitialized: false,
    user: null,
};

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
                    axios.defaults.headers.common.Authorization = `Bearer ${tokenResult.token}`;
                    dispatch({
                        type: LOGIN,
                        payload: {
                            user: {
                                id: user.uid,
                                email: user.email,
                                name: user.displayName || '',
                                token: tokenResult.token,
                                claims: tokenResult.claims,
                                photo: user.photoURL || '',
                                phone: user.phoneNumber,
                                isEmailVerified: user.emailVerified || false,
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
        [dispatch]
    );

    const logout = () => firebase.auth().signOut();

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
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

    const firebaseEmailPasswordSignIn = async (
        email: string,
        password: string
    ) => {
        const { user } = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
        // .then((res) => {
        //     const details = getAdditionalUserInfo(res);
        //     return user;
        // });
        const tokenResult = await user?.getIdTokenResult(true);
        if (user)
            dispatch({
                type: LOGIN,
                payload: {
                    user: {
                        id: user.uid,
                        email: user.email,
                        name: user.displayName || '',
                        token: tokenResult?.token,
                        claims: tokenResult?.claims,
                        photo: user.photoURL || '',
                        phone: user.phoneNumber,
                        isEmailVerified: user.emailVerified,
                    },
                },
            });
        return user;
    };

    const firebaseIsNewUser = (): boolean => {
        const auth: firebase.auth.Auth = firebase.auth();

        if (!auth.currentUser) return false;

        const metadata: firebase.auth.UserMetadata = auth.currentUser.metadata;

        console.log(metadata.creationTime, metadata.lastSignInTime);

        return metadata.creationTime == metadata.lastSignInTime;
    };

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

    const firebaseResendEmailVerification = async () =>
        await firebase.auth().currentUser?.sendEmailVerification();

    const verifyEmail = async (code: string) => {
        const user = firebase.auth().currentUser;
        if (!user) return { isVerifiedEmail: false, firebase };

        await firebase.auth().applyActionCode(code);
        await firebase.auth().currentUser?.reload?.();
        const tokenResult = await user?.getIdTokenResult(true);
        dispatch({
            type: LOGIN,
            payload: {
                user: {
                    id: user.uid,
                    email: user.email,
                    name: user.displayName || '',
                    token: tokenResult?.token,
                    claims: tokenResult?.claims,
                    photo: user.photoURL || '',
                    phone: user.phoneNumber,
                    isEmailVerified: true,
                },
            },
        });
        return { isVerifiedEmail: true, firebase };
    };

    const checkActionCode = async (code: string) =>
        await firebase.auth().checkActionCode(code);

    const checkFirebaseEmailVerification = async () =>
        await firebase.auth().currentUser?.emailVerified;

    const resetPassword = async (email: string) => {
        await firebase.auth().sendPasswordResetEmail(email);
    };

    const updateUserPassword = async (code: string, newPassword: string) =>
        await firebase.auth().confirmPasswordReset(code, newPassword);

    const updateProfile = async (name: string, email: string) => {
        const user = firebase.auth().currentUser;
        if (user?.email !== email) {
            await user?.updateEmail(email);
        }
        if (user?.displayName !== name) {
            await user?.updateProfile({ displayName: name });
        }
        return user;
    };

    const updatePhoto = async (photoUrl: string) => {
        const user = firebase.auth().currentUser;
        if (user?.photoURL !== photoUrl) {
            await user?.updateProfile({ photoURL: photoUrl });
        }
        return user;
    };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <FullscreenLoader />;
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
                updateUserPassword,
                updateProfile,
                updatePhoto,
                firebaseResendEmailVerification,
                verifyEmail,
                checkFirebaseEmailVerification,
                checkActionCode,
                firebaseIsNewUser,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseContext;
