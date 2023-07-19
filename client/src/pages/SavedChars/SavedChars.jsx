import React, { useState, useEffect } from 'react';

import { 
    Card,
    Stack,
    CardBody,
    CardFooter,
    Heading,
    Text,
    Divider,
    ButtonGroup,
    Button,
    Image,
    Flex,
    SimpleGrid,
    useDisclosure
} from '@chakra-ui/react'

import CharCard from '../../components/CharCard/CharCard';
import AddChar from '../../components/AddCharForm/AddChar';

import spiral from '../../assets/spiral.png';

import { Backend } from '../../utils/utils';

const SavedChars = () => {
  const [UID, setUID] = useState('');
  const [characterArr, setCharacterArr] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateCharData = async () => {
    try {
      const loginData = await Backend.get('/api/v1/login-details');
      setUID(loginData.data.uid);
      const charData = await Backend.get(`/api/v1/characters/${loginData.data.uid}`);
      setCharacterArr(charData.data.data.characters);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    updateCharData();
  }, []);

    return (
      <>
        <Flex direction="column" bgImage={spiral} bgRepeat="no-repeat" bgSize="cover" minH='100vh' minW='100vh' padding='20px' bgAttachment="fixed">
          <Flex alignItems="center" mb='20px' justify="center">
            <Text fontSize='4xl' fontWeight="bold" color='white'>Select Character</Text>
            <Button variant='solid' colorScheme='green' position="absolute" right="30px" onClick={onOpen}>Add Character</Button>
          </Flex>
          <SimpleGrid columns={characterArr.length >= 3 ? 3 : characterArr.length} rowGap={20} spacing={4} justifyItems="center">
            {characterArr.map((character) => (
              <CharCard id={character.id} name={character.name} level={character.level} weapon={character.weapon} uid={UID} updateCharData={updateCharData} />
            ))};
          </SimpleGrid>
        </Flex>
        <AddChar isOpen={isOpen} onOpen={onOpen} onClose={onClose} uid={UID} updateCharData={updateCharData} />
      </>
    );
};

export default SavedChars;