import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface kk{
  isOpen:boolean,
  onClose():void,
}
export default function LoginModal(prop:kk){
  const {isOpen, onClose} = prop
  return(
    <Box>
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
            <Button mt={4} colorScheme={"red"} width="100%">Log in</Button>
            <SocialLogin/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}