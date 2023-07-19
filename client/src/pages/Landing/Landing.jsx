import React, { useState, useEffect } from 'react';

import { 
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button,
    Box,
    Text,
    Flex,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Link,
    useDisclosure,
    useToast
} from '@chakra-ui/react'

import { useForm } from "react-hook-form";

import { useNavigate } from 'react-router-dom';

import { Backend } from '../../utils/utils';

import CreateAccount from '../../components/CreateAccount/CreateAccount';

import charBackground from '../../assets/charBackground.jpg';
import landing from '../../assets/landing.jpg';
import landingTwo from '../../assets/landingTwo.jpg';
import landingThree from '../../assets/landingThree.jpg';
import landingFour from '../../assets/landingFour.jpg';


const Landing = () => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [emailErr, setEmailErr] = useState(false);

    useEffect(() => {
      Backend.delete('/api/v1/logout');
    }, []);

    const validateEmail = (event) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(event.target.value)) {
        setEmailErr(false);
      } else {
        setEmailErr(true);
      }
    }

    const handleErrCode = (errCode) => {
        let desc = 'An unknown error occurred.';

        if (errCode == 'auth/wrong-password') {
          desc = 'Incorrect password.';
        }
        else if (errCode == 'auth/too-many-requests') {
          desc = 'Too many login attempts. Try again later.';
        }
        else if (errCode == 'auth/invalid-email') {
          desc = 'The email is invalid.';
        }

        toast({
          title: 'Failed to login.',
          description: desc,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
    };

    // Refactor this to call login route from backend
    const onSubmit = async ({ email, password }) => {
        console.log(email);
        console.log(password);
        try {
            const result = await Backend.post('/api/v1/login', { email, password });
            console.log(result);
            toast({
              title: 'Successfully logged in.',
              description: "Happy theorycrafting!",
              status: 'success',
              duration: 3000,
              isClosable: true,
          })
          navigate('/characters');
        } catch (err) {
          const errCode = err.response.data.code;
          handleErrCode(errCode);
        }
        // setIsLoggedIn(true);
        // navigate('/characters', { state: { uid } });
    };

    const getLoginDetails = async () => {
        const result = await Backend.get('/api/v1/login-details');
        console.log(result);
    };

    const handleLogout = async () => {
        const result = await Backend.delete('/api/v1/logout');
        console.log(result);
    };

    return (
      <Flex minW='100vh' minH='100vh' alignItems="center" justifyContent="center" bgImage={landingFour} bgRepeat="no-repeat" bgSize="cover">
        <Card w='350px'>
          <CardBody>
            <Heading size='lg' mb={5}>Login</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={emailErr} mb={5}>
                  <FormLabel ml={0.5}>Email</FormLabel>
                  <Input placeholder='Email' {...register('email')} onBlur={validateEmail} />
                  <FormErrorMessage>Invalid email format</FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel ml={0.5}>Password</FormLabel>
                  <Input placeholder='Password' {...register('password')} />
                </FormControl>
                <Flex dir="col" justifyContent="space-between" alignItems="center" mt={5}>
                  <Link color='teal.500' onClick={onOpen}>
                    <Text>I don't have an account</Text>
                  </Link>
                  <Button colorScheme="green" onClick={handleSubmit(onSubmit)}>Submit</Button>
                  {/* <Button colorScheme="blue" onClick={getLoginDetails}>Who tf logged in??</Button>
                  <Button colorScheme="red" onClick={handleLogout}>Logout</Button> */}
                </Flex>
            </form>
          </CardBody>
        </Card>

        <CreateAccount isOpen={isOpen} onClose={onClose} />
      </Flex>
    );
}

export default Landing;