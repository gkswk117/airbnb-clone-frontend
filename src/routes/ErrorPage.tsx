import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <VStack bg="orange.500" justifyContent={"center"} minH="100vh">
      <Heading>Error</Heading>
      <Text>Please fix errors.</Text>
      <Link to="/">
        <Button colorScheme={"cyan"}>Go home &rarr;</Button>
      </Link>
    </VStack>
  );
}
