import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IRoomList } from "../types";
import { useState } from "react";

export default function Room(props: IRoomList) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <Link to={`/rooms/${props.pk}`}>
      <VStack alignItems={"flex-start"}>
        <Box width="100%" position="relative" overflow={"hidden"} mb={3} rounded="2xl">
          {props.photo_set.length > 0 ? (
            <Image minH="280" src={props.photo_set[0].file} />
          ) : (
            <Box minH="280px" h="100%" w="100%" p={10} bg="green.400" />
          )}
          {props.is_wishlist ? (
            <Button variant={"unstyled"} position="absolute" top={0} right={0}>
              <FaHeart color="red" size="20px" />
            </Button>
          ) : (
            <Button variant={"unstyled"} position="absolute" top={0} right={0} color="white">
              <FaRegHeart size="20px" />
            </Button>
          )}
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text display={"block"} as="b" noOfLines={1} fontSize="md">
              {props.name}
            </Text>
            <HStack spacing={1} alignItems="center">
              <FaStar size={12} />
              <Text fontSize={"sm"}>{props.rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={gray}>
            {props.city} {props.country}
          </Text>
        </Box>
        <Text fontSize={"sm"} color={gray}>
          <Text as="b">{props.price}</Text> / one night
        </Text>
      </VStack>
    </Link>
  );
}
