import { Box, Button, HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { FaAirbnb, FaMoon } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header(){
  const {isOpen:isLoginOpen, onOpen:onLoginOpen, onClose:onLoginClose} = useDisclosure()
  const {isOpen:isSignUpOpen, onOpen:onSignUpOpen, onClose:onSignUpClose} = useDisclosure()
  //useDisclosure: chakra UI Hook
  //onOpen 함수를 실행하면 isOpen의 값이 true, onClose 함수를 실행하면 isOpen의 값이 false로 바뀐다.
  return(
    <HStack justifyContent={"space-between"} py={10} px={5} borderBottomWidth={1}>
        <Box color={"red.500"}>
          <FaAirbnb size={"48px"}/>
        </Box>
        {/*Box로 감싼 이유: FaAirbnb는 Chakra UI가 아니다. 그래서 red.500값을 못쓰고, #E53E3E값을 직접 입력해줘야 한다.*/}
        <HStack spacing={2}>
          <IconButton variant={"ghost"} aria-label="Toggle dark mode" icon={<FaMoon/>}/>
          <Button onClick={onLoginOpen}>Log In</Button>
          <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign Up</Button>
          <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
          <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </HStack>
      </HStack>
  )
}