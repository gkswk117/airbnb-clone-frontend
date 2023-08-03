import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOneRoom } from "../api";
import { IRoomDetail } from "../types";
import { Box, Grid, GridItem, Heading, Skeleton, Image } from "@chakra-ui/react";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms:${roomPk}`, roomPk], getOneRoom);
  // 변수의 값을 fetch 함수로 보내는 방법 => query key를 이용하면 된다.

  console.log(data);
  // 매번 콘솔로 query를 확인했는데, ReactQueryDevtools 덕분에 작업하는 웹페이지에서 바로 query를 확인할 수 있다.
  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Skeleton height={"43px"} width="25%" isLoaded={!isLoading}>
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
    </Box>
  );
}
