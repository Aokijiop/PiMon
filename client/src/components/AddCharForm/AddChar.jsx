import React from 'react';

import { useForm } from "react-hook-form";
import { Backend } from '../../utils/utils';

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
} from '@chakra-ui/react'

const AddChar = ({ isOpen, onOpen, onClose, uid, updateCharData }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        const result = await Backend.post(`/api/v1/characters/${uid}`, { data });
        console.log("This is the result:");
        console.log(result);
        updateCharData();
        onClose()
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Character</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form>
              <FormControl>
                <FormLabel>Character Name</FormLabel>
                <Input placeholder='Enter name' {...register('name')} />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Character Level</FormLabel>
                <Input placeholder='Enter level' {...register('level')} />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Weapon</FormLabel>
                <Input placeholder='Enter weapon' {...register('weapon')} />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
};

export default AddChar;