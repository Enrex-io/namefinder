import { PopupVariant } from '@/types';
import React, { createContext, useState, ReactNode, useContext } from 'react';

type PopupContextType = {
    variant: PopupVariant | null;
    setPopup: (variant: PopupVariant | null) => void;
    hidePopup: () => void;
};

const PopupContext = createContext<PopupContextType>({
    variant: null,
    setPopup: () => {},
    hidePopup: () => {},
});

type PopupProviderProps = {
    children: ReactNode;
};

const PopupProvider = ({ children }: PopupProviderProps) => {
    const [variant, setVariant] = useState<PopupVariant | null>(null);

    const setPopup = (variant: PopupVariant | null) => {
        setVariant(variant);
    };

    const hidePopup = () => {
        setVariant(null);
    };

    return (
        <PopupContext.Provider value={{ variant, setPopup, hidePopup }}>
            {children}
        </PopupContext.Provider>
    );
};

const usePopup = () => useContext(PopupContext);

export { PopupContext, PopupProvider, usePopup };
