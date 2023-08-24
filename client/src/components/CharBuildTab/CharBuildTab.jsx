import React, { useState, useEffect } from "react";

import {
  Stack,
  Image,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Select,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import SelectChar from "../SelectChar/SelectChar";

import eulaIcon from "../../assets/eula.jpg";
import xiaoIcon from "../../assets/xiao.jpg";
import zhongliIcon from "../../assets/zhongli.jpg";
import kazuhaIcon from "../../assets/kazuha.jpg";
import qiqiIcon from "../../assets/qiqi.jpg";
import kleeIcon from "../../assets/klee.jpg";

import "./CharBuildTab.css";

import { GenshinDevAPI } from "../../utils/utils";

const CharBuildTab = ({ setValue, watch }) => {
  const name = watch("name");

  const imageMap = {
    eula: eulaIcon,
    zhongli: zhongliIcon,
    xiao: xiaoIcon,
    kazuha: kazuhaIcon,
    qiqi: qiqiIcon,
    klee: kleeIcon,
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [charInfo, setCharInfo] = useState();
  const getCharData = async () => {
    console.log(name);
    if (name) {
      const result = await GenshinDevAPI.get(`/characters/${name}`);
      setCharInfo(result.data);
    }
  };

  useEffect(() => {
    setValue("na", 1);
    setValue("skill", 1);
    setValue("burst", 1);
  }, []);

  useEffect(() => {
    getCharData();
  }, [name]);

  // const handleCharChange = (event) => {
  //   const newChar = event.target.value;
  //   setValue("character", newChar);
  // };

  return (
    <>
      <Flex flexDir="column" justifyContent="center">
        <Card
          bgColor="whiteAlpha.100"
          borderWidth="1px"
          borderColor="black"
          color="white"
        >
          <Stack mt="6" spacing="3">
            <Heading textAlign="center">
              {charInfo ? charInfo.name : "Select character"}
            </Heading>
          </Stack>
          <CardBody display="flex" justifyContent="center">
            <Image
              src={
                name
                  ? `https://api.genshin.dev/characters/${name}/gacha-splash`
                  : "https://external-preview.redd.it/aEWIAOBzXq3bnzUrgRQqxp_XfcQsKYqGrq-zZXc9nqw.jpg?auto=webp&s=e53fff60ae6be78abb1bba4737c91a600dcc0021"
              }
              borderRadius="lg"
              onClick={onOpen}
              _hover={{
                cursor: "pointer",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add a subtle shadow on hover
                transform: "scale(1.05)", // Scale the image up slightly on hover
                transition: "transform 0.2s, box-shadow 0.2s", // Add smooth transitions
              }}
            />
          </CardBody>
        </Card>

        {charInfo && (
          <FormControl mt={5}>
            <Flex>
              <Image
                src={`https://api.genshin.dev/characters/${name}/icon`}
                boxSize="25px"
              />
              <FormLabel ml={2}>Level</FormLabel>
            </Flex>
            <NumberInput defaultValue={1} min={1} max={90} borderColor="black">
              <NumberInputField bgColor="whiteAlpha.100" />
              <NumberInputStepper borderColor="black">
                <NumberIncrementStepper borderColor="black" color="white" />
                <NumberDecrementStepper borderColor="black" color="white" />
              </NumberInputStepper>
            </NumberInput>
            <Flex mt={5}>
              <Image
                src={`https://api.genshin.dev/characters/${name}/talent-na`}
                boxSize="25px"
              />
              <FormLabel ml={2}>{charInfo.skillTalents[0].name}</FormLabel>
            </Flex>
            <Select
              borderColor="black"
              bgColor="whiteAlpha.100"
              onChange={(e) => setValue("na", parseInt(e.target.value, 10))}
            >
              <option value={1} className="dropdown">
                Level 1
              </option>
              <option value={2} className="dropdown">
                Level 2
              </option>
              <option value={3} className="dropdown">
                Level 3
              </option>
              <option value={4} className="dropdown">
                Level 4
              </option>
              <option value={5} className="dropdown">
                Level 5
              </option>
              <option value={6} className="dropdown">
                Level 6
              </option>
              <option value={7} className="dropdown">
                Level 7
              </option>
              <option value={8} className="dropdown">
                Level 8
              </option>
              <option value={9} className="dropdown">
                Level 9
              </option>
              <option value={10} className="dropdown">
                Level 10
              </option>
            </Select>
            <Flex mt={5}>
              <Image
                src={`https://api.genshin.dev/characters/${name}/talent-skill`}
                boxSize="25px"
              />
              <FormLabel ml={2}>{charInfo.skillTalents[1].name}</FormLabel>
            </Flex>
            <Select
              borderColor="black"
              bgColor="whiteAlpha.100"
              onChange={(e) => setValue("skill", parseInt(e.target.value, 10))}
            >
              <option value={1} className="dropdown">
                Level 1
              </option>
              <option value={2} className="dropdown">
                Level 2
              </option>
              <option value={3} className="dropdown">
                Level 3
              </option>
              <option value={4} className="dropdown">
                Level 4
              </option>
              <option value={5} className="dropdown">
                Level 5
              </option>
              <option value={6} className="dropdown">
                Level 6
              </option>
              <option value={7} className="dropdown">
                Level 7
              </option>
              <option value={8} className="dropdown">
                Level 8
              </option>
              <option value={9} className="dropdown">
                Level 9
              </option>
              <option value={10} className="dropdown">
                Level 10
              </option>
            </Select>
            <Flex mt={5}>
              <Image
                src={`https://api.genshin.dev/characters/${name}/talent-burst`}
                boxSize="25px"
              />
              <FormLabel ml={2}>{charInfo.skillTalents[2].name}</FormLabel>
            </Flex>
            <Select
              borderColor="black"
              bgColor="whiteAlpha.100"
              onChange={(e) => setValue("burst", parseInt(e.target.value, 10))}
            >
              <option value={1} className="dropdown">
                Level 1
              </option>
              <option value={2} className="dropdown">
                Level 2
              </option>
              <option value={3} className="dropdown">
                Level 3
              </option>
              <option value={4} className="dropdown">
                Level 4
              </option>
              <option value={5} className="dropdown">
                Level 5
              </option>
              <option value={6} className="dropdown">
                Level 6
              </option>
              <option value={7} className="dropdown">
                Level 7
              </option>
              <option value={8} className="dropdown">
                Level 8
              </option>
              <option value={9} className="dropdown">
                Level 9
              </option>
              <option value={10} className="dropdown">
                Level 10
              </option>
            </Select>
          </FormControl>
        )}
      </Flex>
      <SelectChar isOpen={isOpen} onClose={onClose} setValue={setValue} />
    </>
  );
};

export default CharBuildTab;
