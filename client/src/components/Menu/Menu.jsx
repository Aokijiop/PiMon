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
  } from '@chakra-ui/react'

import pimon from '../../assets/pimon.jpg';
import pimonMenu from '../../assets/pimonMenu.jpg';

const Menu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

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
              <DrawerBody>
              <p>Poo Poo...</p>
              <p>Pee Pee...</p>
              <p>Wee Woo...</p>
              </DrawerBody>
          </DrawerContent>
          </Drawer>
        </Box>
    );
};

export default Menu;