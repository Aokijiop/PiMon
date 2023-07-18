import React, { useState, useEffect } from 'react';

import { Spinner } from '@chakra-ui/react';

import { Navigate } from 'react-router-dom';

import { Backend } from './utils';

const ProtectedRoute = ({ Component, redirectRoute }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const getLoginInfo = async () => {
            const result = await Backend.get('/api/v1/login-details');
            setIsLoggedIn(result.data.loggedIn);
            setIsLoading(false);
        };
        getLoginInfo();
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    if (isLoggedIn) {
        return <Component />;
    }

    return <Navigate to={redirectRoute} />;
}

export default ProtectedRoute;