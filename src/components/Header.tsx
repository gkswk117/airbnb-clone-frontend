import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import { getMe, logOut } from "../api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const toast = useToast();
  const queryClient = useQueryClient();

  //chakra UI Hook
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isSignUpOpen, onOpen: onSignUpOpen, onClose: onSignUpClose } = useDisclosure();
  //useDisclosure: onOpen 함수를 실행하면 isOpen의 값이 true, onClose 함수를 실행하면 isOpen의 값이 false로 바뀐다.
  const { colorMode, toggleColorMode } = useColorMode();
  //useColorMode: toggleColorMode함수를 실행하면 colorMode의 값을 light->dark, dark->light로 바꿔준다.
  //colorMode값은 브라우저의 localstorage에 저장된다.
  const logoColor = useColorModeValue("red.500", "red.300");
  //useColorModeValue: colorMode값이 light면 첫번째 인자를, dark면 두번째 인자를 return한다.
  const { isLoading: userLoading, data: user } = useQuery(["me"], getMe, { retry: false });
  // useQuery의 두 번째 인자는 프로미스를 리턴하는 콜백함수여야 한다.
  // query가 완료되면 함수 컴포넌트를 다시 실행(re-rendering)시킨다. (useState의 동작과 같음.)
  useEffect(() => {
    console.log("user is");
    console.log(user);
  }, [user]);

  const onLogOut = async () => {
    const toastId = toast({
      title: "Login out...",
      description: "Sad to see you go...",
      status: "loading",
      // position: "bottom-right",
    });
    const data = await logOut();
    console.log(data);
    queryClient.refetchQueries(["me"]);
    // useQuery로 보냈던 "me"이름을 가진 쿼리를 기억했다가 logOut() 실행 시 다시 fetch 시키기.
    toast.update(toastId, {
      status: "success",
      title: "Done!",
      description: "See you later!",
    });
    return;
  };

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
      <Box as="a" href="/" color={logoColor}>
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
        {!userLoading ? (
          !user ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <LightMode>
                <Button onClick={onSignUpOpen} colorScheme={"red"}>
                  Sign up
                </Button>
              </LightMode>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user?.name} src={user?.avatar} size={"md"} />
              </MenuButton>
              <MenuList>
                {user?.is_host ? (
                  <Link to="/rooms/upload">
                    <MenuItem>Upload room</MenuItem>
                  </Link>
                ) : null}
                <MenuItem onClick={onLogOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : (
          <h1>유저 로딩 중</h1>
        )}
        <LoginModal isLoginOpen={isLoginOpen} onLoginClose={onLoginClose} />
        <SignUpModal isSignOpen={isSignUpOpen} onSignClose={onSignUpClose} />
      </HStack>
    </Stack>
  );
}
