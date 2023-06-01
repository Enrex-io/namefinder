import firebase from 'firebase/compat';
import Regions from '@/consts/region';
import Medias from '@/consts/medias';

export type Phone = `${number}` | `${number}-${number}`;
export type Label = Capitalize<string>;

export type Country = {
    code: Uppercase<string>;
    label: Label;
    phone: Phone;
    isSuggested?: boolean;
};

export type Industry = `${Label} - ${Label}`;

export interface Details {
    region: string;
    media: string;
    description: string;
}

export type ResponsePayload<T = unknown> = {
    result?: T;
    error?: string;
};

export type FeedbackTags = 'NEWSLETTER' | 'DEMO' | 'COLLABORATE';

export enum TagStatus {
    inactive = 'inactive',
    active = 'active',
}

export enum FeedbackTagsEnum {
    NEWSLETTER = 'NEWSLETTER',
    DEMO = 'DEMO',
    COLLABORATE = 'COLLABORATE',
}

export interface TagsToUpdate {
    name: FeedbackTags;
    status: TagStatus;
}

export type UserProfile = {
    id: string;
    photo: string | null;
    email: string | null;
    name: string | null;
    phone: string | null;
    isEmailVerified: boolean;
    token?: string;
    claims?: { [key: string]: any };
};

export interface IPrompt {
    userId: string;
    media: Medias;
    region: Regions;
    request: string;
    unparsedResponse: string;
    response: {
        terms: string[];
        correctText: string;
    };
    date?: string;
}

export interface IGreenWashingUser {
    userId: string;
    counter: number;
    plan: string;
}

export type FirebaseContextType = {
    isLoggedIn: boolean;
    isEmailVerified?: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    logout: () => Promise<void>;
    login: () => void;
    firebaseRegister: (
        email: string,
        password: string
    ) => Promise<firebase.auth.UserCredential>;
    firebaseEmailPasswordSignIn: (
        email: string,
        password: string
    ) => Promise<firebase.auth.UserCredential>;
    firebaseGoogleSignIn: () => Promise<firebase.auth.UserCredential>;
    firebaseResendEmailVerification: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: (name: string, email: string) => Promise<void>;
    updatePhoto: (photoUrl: string) => Promise<void>;
    verifyEmail: (
        code: string
    ) => Promise<{ isVerifiedEmail: boolean; firebase: typeof firebase }>;
    checkFirebaseEmailVerification: () => Promise<boolean | undefined>;
    checkActionCode: (code: string) => Promise<firebase.auth.ActionCodeInfo>;
};

export interface InitialLoginContextProps {
    isLoggedIn: boolean;
    isEmailVerified?: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
}

export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};
