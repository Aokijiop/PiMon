import React, { useState, useEffect } from "react";

import {
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Box,
  Image,
  Flex,
} from "@chakra-ui/react";

import { GenshinDevAPI } from "../../utils/utils";

const SelectChar = ({ isOpen, onClose, setValue }) => {
  const [charArr, setCharArr] = useState([]);

  const getChars = async () => {
    const result = await GenshinDevAPI.get("/characters");
    console.log(result.data);
    setCharArr(result.data);
  };

  useEffect(() => {
    getChars();
  }, []);

  const handleCharChange = (char) => {
    setValue("name", char);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bgColor="gray.800" color="white">
        <ModalHeader>Select Character</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={5} spacing={1}>
            {charArr.map((char) => (
              <Flex
                key={char}
                borderColor="gray.900"
                borderWidth="2px"
                borderRadius="10px"
                justifyContent="center"
                alignItems="center" // Center the image vertically
                transition="border-color 0.3s ease-in-out" // Add a transition for hover effect
                _hover={{
                  borderColor: "blue.500", // Change border color on hover
                }}
                cursor="pointer" // Add a pointer cursor on hover
                onClick={() => handleCharChange(char)}
              >
                <Image
                  key={char}
                  src={`https://api.genshin.dev/characters/${char}/icon`}
                  boxSize="75px"
                  alt={char}
                />
              </Flex>
            ))}
          </SimpleGrid>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SelectChar;
