import React from 'react';

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
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react'

import { Backend } from '../../utils/utils';

import eulaIcon from '../../assets/eula.jpg';
import xiaoIcon from '../../assets/xiao.jpg';
import zhongliIcon from '../../assets/zhongli.jpg';
import kazuhaIcon from '../../assets/kazuha.jpg';
import qiqiIcon from '../../assets/qiqi.jpg';
import kleeIcon from '../../assets/klee.jpg';

const CharCard = ({ id, name, level, weapon, uid, updateCharData }) => {
    const imageMap = {
        "Eula": eulaIcon,
        "Zhongli": zhongliIcon,
        "Xiao": xiaoIcon,
        "Kazuha": kazuhaIcon,
        "Qiqi": qiqiIcon,
        "Klee": kleeIcon,
    };

    const handleDelete = async () => {
        const result = await Backend.delete(`/api/v1/characters/${uid}/${id}`);
        console.log('Deleted');
        console.log(result);
        updateCharData();
    };

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
          <Card maxW='xs' maxH='md' bgColor='whiteAlpha.700'>
            <Flex direction="column" alignItems="center">
                <Stack mt='6' spacing='3'>
                <Heading size='lg'>{name}</Heading>
                </Stack>
                <CardBody>
                <Image
                    src={imageMap[name]}
                    alt={name}
                    borderRadius='lg'
                    boxSize='250px'
                />
                </CardBody>
            </Flex>
            <Divider />
            <CardFooter display="flex" justifyContent="end">
                <ButtonGroup spacing='2'>
                <Button variant='outline' colorScheme='red' onClick={onOpen}>
                    Delete
                </Button>
                <Button variant='ghost' colorScheme='blue'>
                    Edit Build
                </Button>
                <Button variant='solid' colorScheme='green'>
                    View
                </Button>
                </ButtonGroup>
            </CardFooter>
          </Card>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Delete Character</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text>Are you sure you want to delete this character?</Text>
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='green' mr={3} onClick={handleDelete}>
                  Confirm
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
    );
};

export default CharCard;