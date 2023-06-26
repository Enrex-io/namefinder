import { Grid, ToggleButton } from '@mui/material';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React from 'react';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    background: theme.palette.grey[200],
    borderRadius: '50px',
    '& .MuiToggleButtonGroup-grouped': {
        border: 'none',
        color: theme.palette.primary.main,
        borderRadius: '50px !important',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        textTransform: 'none',
        fontWeight: '700',
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:last-of-type)': {
            marginRight: theme.spacing(1),
        },
        '&.Mui-selected': {
            background: theme.palette.primary.main,
            color: '#ffffff',
            '&:hover': {
                background: theme.palette.primary.main,
            },
        },
    },
}));

const LoginRegisterSwitcher = () => {
    const router = useRouter();
    const handleSwitch = (_event: React.SyntheticEvent, newRoute: string) => {
        if (!newRoute || router.pathname === newRoute) return;
        router.push(newRoute);
    };
    return (
        <Grid container justifyContent="center">
            <Grid item>
                <StyledToggleButtonGroup
                    value={router.pathname}
                    exclusive
                    onChange={handleSwitch}
                    aria-label="Log in / sign up switch"
                    color="primary"
                >
                    <ToggleButton value="/register" aria-label="sign up">
                        Sign up
                    </ToggleButton>
                    <ToggleButton value="/login" aria-label="login">
                        Log in
                    </ToggleButton>
                </StyledToggleButtonGroup>
            </Grid>
        </Grid>
    );
};

export default LoginRegisterSwitcher;
