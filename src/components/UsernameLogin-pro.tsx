import { logIn } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import { useForm } from "react-hook-form";

interface kkk {
  onLoginClose(): void;
}
// pro: +useForm 사용
export default function UsernameLogin(prop: kkk) {
  const { onLoginClose } = prop;
  const toast = useToast();
  const queryClient = useQueryClient();

  const loginForm = useForm();
  console.log(loginForm.watch());
  const test = useForm();
  console.log(test.watch());
  const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await logIn({
      username: loginForm.watch().username,
      password: loginForm.watch().password,
    });
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
      if (response.data.result === "WrongPassword") {
        const toastId = toast({
          title: "Failed.",
          description: "비밀번호가 틀렸습니다.",
          status: "error",
        });
      }
      if (response.data.result === "Success") {
        const toastId = toast({
          title: "Welcome!",
          description: "Happy to have you back.",
          status: "success",
        });
        onLoginClose();
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
    <form onSubmit={onSubmit as any}>
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
            {...loginForm.register("username")}
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
            {...loginForm.register("password")}
            type="password"
            variant={"filled"}
            placeholder="Password"
          />
        </InputGroup>
        <InputGroup>
          <Input {...test.register("test")} variant={"filled"} placeholder="test" />
        </InputGroup>
      </VStack>
      <Button type="submit" mt={4} colorScheme={"red"} width="100%">
        Log in
      </Button>
    </form>
  );
}
