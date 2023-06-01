import React, { createContext, useState, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

type SnackbarContextType = {
    showSnackbar: (message: string, variant?: AlertColor) => void;
    hideSnackbar: () => void;
};

const SnackbarContext = createContext<SnackbarContextType>({
    showSnackbar: () => {},
    hideSnackbar: () => {},
});

type SnackbarProviderProps = {
    children: ReactNode;
};

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState<AlertColor | undefined>('info');

    const showSnackbar = (msg: string, snackbarVariant?: AlertColor) => {
        setMessage(msg);
        setVariant(snackbarVariant);
        setIsOpen(true);
    };

    const hideSnackbar = () => {
        setIsOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
            {children}
            <Snackbar
                open={isOpen}
                autoHideDuration={3000}
                onClose={hideSnackbar}
            >
                <Alert onClose={hideSnackbar} severity={variant}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export { SnackbarContext, SnackbarProvider };
