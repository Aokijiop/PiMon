import React from 'react';
import styles from './Landing.module.css';

import { 
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button,
    Box,
    Text,
    Flex,
} from '@chakra-ui/react'

import { Field, Form, Formik } from 'formik';

import background from '../../assets/landing.jpg';
import spiral from '../../assets/spiral.png';
import charBackground from '../../assets/charBackground.jpg';

const OldLanding = () => {
    const validateName = value => {
      let error
      if (!value) {
        error = 'UID is required'
      } else if (value !== '615224465') {
        error = "You're not Aokijiop! 😱"
      }
      return error
    }
  
    return (
      <Flex minW='100vh' minH='100vh' alignItems="center" justifyContent="center" bgImage={charBackground} bgRepeat="no-repeat" bgSize="cover">
        <Box w='200px'>
          <Formik
              initialValues={{ name: '615224465' }}
              onSubmit={(values, actions) => {
              setTimeout(() => {
                  alert(JSON.stringify(values, null, 2))
                  actions.setSubmitting(false)
              }, 1000)
              }}
          >
              {(props) => (
              <Form>
                  <Flex direction="column">
                    <Field name='name' validate={validateName}>
                    {({ field, form }) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel>Please enter your UID</FormLabel>
                        <Input {...field} placeholder='UID' />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        </FormControl>
                    )}
                    </Field>
                    <Button
                    mt={4}
                    colorScheme='teal'
                    isLoading={props.isSubmitting}
                    type='submit'
                    alignSelf="center"
                    >
                    Submit
                    </Button>
                  </Flex>
              </Form>
              )}
          </Formik>
        </Box>
      </Flex>
    )
  }

export default OldLanding;