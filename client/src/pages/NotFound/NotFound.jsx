import React from 'react';

import { 
    Flex,
    Text,
    Card,
} from '@chakra-ui/react'

import notFound from '../../assets/notFound.jpg';

const NotFound = () => {
    return (
      <Flex minW='100vh' minH='100vh' justifyContent="center" bgImage={notFound} bgRepeat="no-repeat" bgSize="cover">
        <Text fontSize='4xl' fontWeight="bold" color='white'>Oops! Page not found!</Text>
      </Flex>
    );
};

export default NotFound;