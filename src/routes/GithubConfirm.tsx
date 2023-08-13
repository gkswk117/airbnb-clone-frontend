import { Heading, VStack, Text, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

export default function GithubConfirm() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  // useParams(path parameter)랑 useLocation(query parameter)에 대한 내용 => 네이버 메모
  // 현재 경로에 대한 정보 객체

  const confirmLogin = async () => {
    const params = new URLSearchParams(location.search);
    // URLSearchParams는 query string을 객체로 바꿔준다. 반대로도 가능하다.
    const code = params.get("code");
    // Github에서 url의 query parameter에 넣어준 token이 "code"에 담긴다.
    if (code) {
      const status = await githubLogIn(code);
      if (status === 200) {
        queryClient.refetchQueries(["me"]);
        // logOut() 실행 시 "me"이름을 가진 쿼리를 다시 fetch 시키기.
        const toastId = toast({
          title: "Welcome!",
          description: "Happy to have you back.",
          status: "success",
        });
        navigate("/");
      } else {
        const toastId = toast({
          title: "Failed.",
          description: "로그인을 할 수 없습니다.",
          status: "error",
        });
        console.log("status is not 200.");
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);

  return (
    <>
      <VStack justifyContent={"center"} minH="100vh">
        <Heading>Processing login...</Heading>
        <Text>Don't go anywhere.</Text>
        <Spinner size={"lg"} />
      </VStack>
    </>
  );
}
