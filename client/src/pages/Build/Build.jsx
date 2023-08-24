import React from "react";

import {
  Flex,
  Card,
  Button,
  Heading,
  Table,
  Thead,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Text,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import missingCharIcon from "../../assets/missingChar.jpg";
import char from "../../assets/char.jpg";
import weapon from "../../assets/weapon.jpg";
import artifact from "../../assets/artifact.jpg";
import buildThree from "../../assets/buildThree.jpg";

import CharBuildTab from "../../components/CharBuildTab/CharBuildTab";

import dmgSpoof from "../../assets/dmgSpoof.png";

const Build = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Flex
      bgImage={buildThree}
      bgRepeat="no-repeat"
      bgSize="cover"
      minH="100vh"
      minW="100vh"
      padding="20px"
      bgAttachment="fixed"
      justifyContent="center"
      alignItems="center"
    >
      <Flex bgColor="gray.800" borderRadius={20}>
        <Card bgColor="gray.800" w="30vw" h="75vh" overflowY="auto">
          <Tabs color="white" variant="line" colorScheme="messenger">
            <TabList
              justifyContent="center"
              position="sticky"
              top="0"
              zIndex="sticky"
              zIndexTop="1"
              bgColor="gray.800"
            >
              <Tab>
                <Image src={char} boxSize="50px" objectFit="contain" />
              </Tab>
              <Tab>
                <Image src={weapon} boxSize="50px" objectFit="contain" />
              </Tab>
              <Tab>
                <Image src={artifact} boxSize="50px" objectFit="contain" />
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel display="flex" justifyContent="center">
                <CharBuildTab setValue={setValue} watch={watch} />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <Button colorScheme="green" onClick={handleSubmit(onSubmit)}>
                  Save
                </Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Card>
        <Card bgColor="gray.800" w="30vw" h="75vh" p="10px">
          <Heading color="white" textAlign="center">
            Damage
          </Heading>
          <Image mt={5} src={dmgSpoof} borderRadius="10px" />
        </Card>
      </Flex>
    </Flex>
  );
};

export default Build;
