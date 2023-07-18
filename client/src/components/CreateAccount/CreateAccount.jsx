import React, { useState } from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    useToast
} from '@chakra-ui/react'

import { useForm } from "react-hook-form";

import { Backend } from '../../utils/utils';

const CreateAccount = ({ isOpen, onClose }) => {
    const toast = useToast();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [UID, setUID] = useState('');
    const [UIDErr, setUIDErr] = useState(false);
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordErr, setPasswordErr] = useState(false);

    const validateUID = (event) => {
        event.target.value = event.target.value.replace(/\D/g, '');
        if (event.target.value.length >= 9) {
            event.target.value = event.target.value.slice(0, 9);
            setUIDErr(false);
        }
        else if (event.target.value.length < 9) {
            setUIDErr(true);
        }
        setUID(event.target.value);
    };

    const validateEmail = (event) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(event.target.value)) {
          setEmailErr(false);
        } else {
          setEmailErr(true);
        }
        setEmail(event.target.value);
      }

    const validatePassword = (event) => {
        if (event.target.value != password) {
            setPasswordErr(true);
        } else {
            setPasswordErr(false);
        }
        setPasswordConfirmation(event.target.value);
    };

    const handleErrCode = (errCode) => {
        console.log(errCode);
        if (errCode == 'auth/email-already-in-use') {
            toast({
                title: 'Failed to create account.',
                description: "Email is already in use.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    };

    const handleAccountCreation = async ({ uid, email, password }) => {
        try {
            await Backend.post('/api/v1/create-account', { uid, email, password });
            toast({
                title: 'Account successfully created.',
                description: "Login with your account details.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            onClose();
        } catch (err) {
            const errCode = err.response.data.code;
            console.log(errCode);
            handleErrCode(errCode);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form>
                <FormControl isInvalid={UIDErr} isRequired>
                  <FormLabel>UID</FormLabel>
                  <Input placeholder='UID' {...register('uid')} onInput={validateUID} />
                  <FormErrorMessage>UIDs must be 9 digits long</FormErrorMessage>
                </FormControl>
    
                <FormControl mt={4} isInvalid={emailErr} isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input placeholder='Email' {...register('email')} onInput={validateEmail} />
                  <FormErrorMessage>Invalid email format</FormErrorMessage>
                </FormControl>
    
                <FormControl mt={4} isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input placeholder='Password' {...register('password')} onInput={(e) => setPassword(e.target.value)}/>
                </FormControl>

                <FormControl mt={4} isInvalid={passwordErr} isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input placeholder='Confirm password' {...register('passwordConfirmation')} onInput={validatePassword} />
                  <FormErrorMessage>Passwords do not match</FormErrorMessage>
                </FormControl>
              </form>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} isDisabled={emailErr || passwordErr || UIDErr || !UID || !email || !password || !passwordConfirmation} onClick={handleSubmit(handleAccountCreation)}>
                Create account
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    );
}

export default CreateAccount;