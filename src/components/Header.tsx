import {
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
  //chakra UI Hook
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();
  //useDisclosure: onOpen 함수를 실행하면 isOpen의 값이 true, onClose 함수를 실행하면 isOpen의 값이 false로 바뀐다.
  const { colorMode, toggleColorMode } = useColorMode();
  //useColorMode: toggleColorMode함수를 실행하면 colorMode의 값을 light->dark, dark->light로 바꿔준다.
  //colorMode값은 브라우저의 localstorage에 저장된다.
  const logoColor = useColorModeValue("red.500", "red.300");
  //useColorModeValue: colorMode값이 light면 첫번째 인자를, dark면 두번째 인자를 return한다.
  return (
    <Stack
      justifyContent={"space-between"}
      alignItems="center"
      py={5}
      px={40}
      direction={{ sm: "column", md: "row" }}
      spacing={{ sm: 4, md: 0 }}
      borderBottomWidth={1}
    >
      {/*
        <Box color={colorMode==="light"?"red.500":"red.300"}>
        아래 useColorModeValue hook을 사용해 아래와 같이 간단히 바꿀 수 있다.
        IconButton의 icon도 hook을 이용해 바꿀 수 있다.
        */}
      <Box color={logoColor}>
        <FaAirbnb size={"48px"} />
      </Box>
      {/*Box로 감싼 이유: FaAirbnb는 Chakra UI가 아니다. 그래서 red.500값을 못쓰고, #E53E3E값을 직접 입력해줘야 한다.*/}
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        />
        <LightMode>
          <Button onClick={onLoginOpen}>Log In</Button>
          <Button onClick={onSignUpOpen} colorScheme={"red"}>
            Sign Up
          </Button>
        </LightMode>
        <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
        <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
      </HStack>
    </Stack>
  );
}
