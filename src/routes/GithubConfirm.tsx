import { Heading, VStack, Text, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { githubLogIn } from "../api";

export default function GithubConfirm() {
  const location = useLocation();
  // useParams랑 useLocation에 대한 내용 => 네이버 메모
  const confirmLogin = async () => {
    console.log(location);
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    console.log(code);
    // Github에서 url의 query parameter에 넣어준 token이 "code"에 담긴다.
    if (code) {
      await githubLogIn(code);
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
