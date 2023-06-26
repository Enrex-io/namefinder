import firebase from 'firebase/compat';
import Regions from '@/consts/region';
import Medias from '@/consts/medias';

export type NodeEnvType = 'development' | 'production' | 'prod' | 'test';

export interface Details {
    region: string;
    media: string;
    description: string;
}

export type ResponsePayload<T = unknown> = {
    result?: T;
    error?: string;
};

export enum SubscriptionStatus {
    ACTIVE = 'active',
    FAILED = 'failed',
}

export enum PopupVariant {
    PAYMENT_FAILED = 'paymentFailed',
    ZERO_CREDITS = 'zeroCredits',
    THANK_YOU = 'thankYou',
}

type PopupVariantType = (typeof PopupVariant)[keyof typeof PopupVariant];

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
    history: IPrompt[];
    updateDates?: number[];
    subscriptionId?: string;
    subscriptionStatus: SubscriptionStatus;
}

export type FirebaseContextType = {
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
    ) => Promise<firebase.User | null>;
    sendSignInLink(email: string, url: string): Promise<void>;
    signInWithEmailLink: (
        email: string,
        emailLink: string
    ) => Promise<firebase.auth.UserCredential>;
    firebaseGoogleSignIn: () => Promise<firebase.auth.UserCredential>;
    firebaseResendEmailVerification: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateUserPassword: (code: string, newPassword: string) => Promise<void>;
    updateProfile: (
        name: string,
        email: string
    ) => Promise<firebase.User | null>;
    updatePhoto: (photoUrl: string) => Promise<firebase.User | null>;
    verifyEmail: (
        code: string
    ) => Promise<{ isVerifiedEmail: boolean; firebase: typeof firebase }>;
    checkFirebaseEmailVerification: () => Promise<boolean | undefined>;
    checkActionCode: (code: string) => Promise<firebase.auth.ActionCodeInfo>;
};

export interface InitialLoginContextProps {
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
}

export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};

export interface StringColorProps {
    id?: string;
    label?: string;
    color?: string;
    primary?: string;
    secondary?: string;
}

export type StringBoolFunc = (s: string) => boolean;
export type StringNumFunc = (s: string) => number;
export type NumbColorFunc = (n: number) => StringColorProps | undefined;

export interface SubscriptionData {
    priceId: string;
    priceName?: string;
    productName: string | null;
    price: number | null;
    currency: string;
    interval?: 'day' | 'month' | 'week' | 'year';
    subscriptionStartDate: number;
    nextPaymentDate: number;
    counter: number;
    status:
        | 'active'
        | 'canceled'
        | 'incomplete'
        | 'incomplete_expired'
        | 'past_due'
        | 'paused'
        | 'trialing'
        | 'unpaid';
}
