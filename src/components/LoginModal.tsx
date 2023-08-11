import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import React, { useState } from "react";
import { logIn } from "../api";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface kk {
  isOpen: boolean;
  onClose(): void;
}
export default function LoginModal(prop: kk) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isOpen, onClose } = prop;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(username);
    console.log(password);
    const response = await logIn(username, password);
    if (response.status === 200) {
      queryClient.refetchQueries(["me"]);
      console.log(response);
      // logOut() 실행 시 "me"이름을 가진 쿼리를 다시 fetch 시키기.
      if (response.data.result === "DoesNotExist") {
        const toastId = toast({
          title: "Failed.",
          description: "해당 username이 존재하지 않습니다.",
          status: "error",
        });
      }
      if (response.data.result === "wrong password") {
        const toastId = toast({
          title: "Failed.",
          description: "비밀번호가 틀렸습니다.",
          status: "error",
        });
      }
      if (response.data.result === "success") {
        const toastId = toast({
          title: "Welcome!",
          description: "Happy to have you back.",
          status: "success",
        });
        onClose();
      }
    } else {
      const toastId = toast({
        title: "Failed.",
        description: "로그인을 할 수 없습니다.",
        status: "error",
      });
      console.log("status is not 200.");
    }
  };
  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen}>
        {/*onClose: 모달을 닫을때(배경을 클릭할 때) 실행되는 함수, isOpen: isOpen이 true면 modal은 켜지고 false면 꺼진다.*/}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log in</ModalHeader>
          <ModalCloseButton />
          <ModalBody as="form" onSubmit={onSubmit as any}>
            <VStack>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Box color="gray.500">
                      <FaUserNinja />
                    </Box>
                  }
                />
                <Input
                  required
                  name="username"
                  onChange={onChange}
                  value={username}
                  variant={"filled"}
                  placeholder="Username"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Box color="gray.500">
                      <FaLock />
                    </Box>
                  }
                />
                <Input
                  required
                  name="password"
                  onChange={onChange}
                  value={password}
                  type="password"
                  variant={"filled"}
                  placeholder="Password"
                />
              </InputGroup>
            </VStack>
            <Button type="submit" mt={4} colorScheme={"red"} width="100%">
              Log in
            </Button>
            <SocialLogin />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
