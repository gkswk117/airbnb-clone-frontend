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
// hacker: +useMutation 사용
export default function UsernameLogin(prop: kkk) {
  const { onLoginClose } = prop;
  const toast = useToast();
  const queryClient = useQueryClient();
  const loginForm = useForm();
  // nico는 useForm의 리턴 객체의 register, handleSubmit, errors, resets 프로퍼티를 사용했는데,
  // 나는 register, watch를 사용함. handleSubmit기능이 매력적이지 않아서 굳이 머리 아프게 배우고 싶지 않았음.
  // handleSubmit을 이용하면 user가 잘못된 데이터를 보냈을때,
  // html에서 뿐만 아니라 자바스크립트 코드에서도 검증할 수 있고, nice하게 에러 메세지를 사용자에게 띄워 줄 수 있다.

  // but, 만약 form에 들어있는 input의 10-20개, 개수가 많다면?
  // 그 모두를 fetch function에 일일이 담아줄래?
  // 그래서 UploadRoom에서는 handleSubmit을 사용한다.
  // 유튜브 클론 코딩에서의 form과 다른점 => 네이버 메모 "Form 태그 작동 방식" 참고
  // form에서는 html을 열고 있는 자신의 서버로 보내는 것. 그래서 form method=post로 바로 post 보냄.
  // 그러면 자바스크립트 코드에서는 data parameter 하나로 form 안에 든 데이터를 모두 받아 볼 수 있음.
  // 여기에서는 form이 api.ts에 있는 fetch function에 데이터를 보내고, fetch function이 django 서버로 post를 보냄.
  const mutation = useMutation(logIn, {
    // API나 DB에 post작업을 하는 함수(logIn)의 데이터 처리상태(query 진행상태)를 실시간으로 확인할 수 있는 hook.
    // 원래는 onSuccess에 담긴 콜백 함수(logIn) 내부 코드가 onSubmit 함수 내부에 있었고,
    // logIn 함수 처리가 끝날 때까지 무작정 기다렸다. => const response = await logIn(loginForm.watch().username, loginForm.watch().password)
    // 여기에서는 onSubmit 내부에는 useMutation의 mutate 메소드를 호출하는 코드 밖에 없고,
    // useMutation 내부에서 모든걸 처리한다.
    onMutate: () => {
      console.log("mutation starting!!!!!!!!!!!!!!!!!!!!");
    },
    onError: (error) => {
      console.log("error is ");
      console.log(error);
    },
    onSuccess: (response) => {
      // onSuccess에 등록된 콜백 함수의 argument로 logIn이 반환한 Promise의 resolved data가 들어간다.
      // useMutation가 자동으로 resolved data를 넣어준다. Docs 참고.
      if (response.status === 200) {
        queryClient.refetchQueries(["me"]);
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
          queryClient.refetchQueries(["products"]);
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
    },
  });
  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ username: loginForm.watch().username, password: loginForm.watch().password });
    // argument로 전달된 객체가 useMutation의 콜백 함수인 logIn의 argument로 들어간다.
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
      </VStack>
      <Button isLoading={mutation.isLoading} type="submit" mt={4} colorScheme={"red"} width="100%">
        Log in
      </Button>
    </form>
  );
}
