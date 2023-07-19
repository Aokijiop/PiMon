import React from 'react';

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    IconButton,
    Box,
    useDisclosure,
    Button,
    Flex
  } from '@chakra-ui/react'

import { Backend } from '../../utils/utils';

import { useNavigate } from 'react-router-dom';

import pimon from '../../assets/pimon.jpg';
import pimonMenu from '../../assets/pimonMenu.jpg';

const Menu = () => {
  const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleLogout = () => {
      Backend.delete('/api/v1/logout');
      navigate('/login');
    };

    return (
        <Box position="absolute" top="20px" left="20px">
          <IconButton
          aria-label='Call Segun'
          size='lg'
          icon={<img src={pimon} style={{ borderRadius: "50%" }} />}
          width="50px"
          height="50px"
          onClick={onOpen}
          isRound
          />
          <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent bgImage={pimonMenu} bgRepeat="no-repeat" bgSize="cover">
              <DrawerHeader borderBottomWidth='1px' textAlign="center">Pimon Menu</DrawerHeader>
              <DrawerCloseButton />
              <DrawerBody display="flex" mb="300px" flexDirection="column" justifyContent="space-between">
                <Flex direction="column">
                  <p>Poo Poo...</p>
                  <p>Pee Pee...</p>
                  <p>Wee Woo...</p>
                </Flex>
                <Button colorScheme="red" w="200px" alignSelf="center" onClick={handleLogout}>Logout</Button>
              </DrawerBody>
          </DrawerContent>
          </Drawer>
        </Box>
    );
};

export default Menu;