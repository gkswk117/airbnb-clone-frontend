import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOneRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Image,
  HStack,
  VStack,
  Avatar,
  Text,
  Container,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import type { Value } from "react-calendar/dist/cjs/shared/types";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms:${roomPk}`, roomPk], getOneRoom);
  // fetch 함수는 반드시 프로미스를 리턴해야 하고,
  // 프로미스 함수의 The last successfully resolved data for the query 값을 data에 담는다.
  // query key를 이용해서 컴포넌트의 변수값을 fetch 함수로 보낼 수 있다.
  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<IReview[]>(
    [`rooms`, roomPk, `reviews`],
    getRoomReviews
  );
  const [dates, setDates] = useState<Value>();
  console.log("dates is ");
  console.log(dates);
  // console.log(data);
  // 매번 콘솔로 query를 확인했는데, ReactQueryDevtools 덕분에 작업하는 웹페이지에서 바로 query를 확인할 수 있다.
  return (
    <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
      <Skeleton height={"43px"} width="50%" isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        gap={2}
        height="60vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              <Image
                objectFit={"cover"}
                w="100%"
                h="100%"
                src={data?.photo_set[index] ? data?.photo_set[index].file : ""}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid gap={20} templateColumns={"2fr 1fr"} maxW="container.lg">
        <Box>
          <HStack justifyContent={"space-between"} mt={10}>
            <VStack alignItems={"flex-start"}>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <Heading fontSize={"2xl"}>House hosted by {data?.owner.name}</Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <HStack justifyContent={"flex-start"} w="100%">
                  <Text>
                    {data?.toilets} toliet{data?.toilets === 1 ? "" : "s"}
                  </Text>
                  <Text>∙</Text>
                  <Text>
                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
            <Avatar name={data?.owner.name} size={"xl"} src={data?.owner.avatar} />
          </HStack>
          <Box mt={10}>
            <Heading mb={5} fontSize={"2xl"}>
              <HStack>
                <FaStar /> <Text>{data?.rating}</Text>
                <Text>∙</Text>
                <Text>
                  {reviewsData?.length} review
                  {reviewsData?.length === 1 ? "" : "s"}
                </Text>
              </HStack>
            </Heading>
            <Container mt={16} maxW="container.lg" marginX="none">
              <Grid gap={10} templateColumns={"1fr 1fr"}>
                {reviewsData?.map((review, index) => (
                  <VStack alignItems={"flex-start"} key={index}>
                    <HStack>
                      <Avatar name={review.user.name} src={review.user.avatar} size="md" />
                      <VStack spacing={0} alignItems={"flex-start"}>
                        <Heading fontSize={"md"}>{review.user.name}</Heading>
                        <HStack spacing={1}>
                          <FaStar size="12px" />
                          <Text>{review.rating}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text>{review.payload}</Text>
                  </VStack>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box pt={10}>
          <Calendar onChange={setDates} minDate={new Date()} selectRange />
        </Box>
      </Grid>
    </Box>
  );
}
