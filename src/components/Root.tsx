import { Box, Button, HStack, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import {FaAirbnb, FaMoon, FaUserNinja, FaLock} from "react-icons/fa";

export default function Root(){
  const {isOpen, onOpen, onClose} = useDisclosure()
  //useDisclosure: chakra UI Hook
  //onOpen 함수를 실행하면 isOpen의 값이 true, onClose 함수를 실행하면 isOpen의 값이 false로 바뀐다.
  return (
    <Box>
      <HStack justifyContent={"space-between"} py={10} px={5} borderBottomWidth={1}>
        <Box color={"red.500"}>
          <FaAirbnb size={"48px"}/>
        </Box>
        {/*Box로 감싼 이유: FaAirbnb는 Chakra UI가 아니다. 그래서 red.500값을 못쓰고, #E53E3E값을 직접 입력해줘야 한다.*/}
        <HStack spacing={2}>
          <IconButton variant={"ghost"} aria-label="Toggle dark mode" icon={<FaMoon/>}/>
          <Button onClick={onOpen}>Sign In</Button>
          <Button colorScheme={"red"}>Sign Up</Button>
          <Modal onClose={onClose} isOpen={isOpen}>
            {/*onClose: 모달을 닫을때(배경을 클릭할 때) 실행되는 함수, isOpen: isOpen이 true면 modal은 켜지고 false면 꺼진다.*/}
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Log in</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack>
                  <InputGroup>
                    <InputLeftElement children={<Box color="gray.500"><FaUserNinja/></Box>}/>
                    <Input variant={"filled"} placeholder="Username"/>
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement children={<Box color="gray.500"><FaLock/></Box>}/>
                    <Input variant={"filled"} placeholder="Password"/>
                  </InputGroup>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme={"red"} width="100%">Log in</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </HStack>
      </HStack>
      <Outlet/>
    </Box>
  )
}