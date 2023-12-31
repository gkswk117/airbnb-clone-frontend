import { Grid } from "@chakra-ui/react";
import Room from "../components/Room";
import { useEffect, useState } from "react";
import RoomSkeleton from "../components/RoomSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getAllRooms } from "../api";
import { IRoomList } from "../types";
import { convertTypeAcquisitionFromJson } from "typescript";

export default function Home() {
  /* noob
  const [isLoading, setIsLoading] = useState(true)
  const [rooms, setRooms] = useState([])
  async function fetchRooms(){
    const response = await fetch("http://127.0.0.1:8000/api/v1/rooms/")
    const json = await response.json()
    setRooms(json)
    setIsLoading(false)
  }
  useEffect(()=>{
    fetchRooms()
  }, [])
  useEffect(()=>{
    console.log("rooms is ")
    console.log(rooms)
  }, [rooms])
  */
  // pro - useQuery의 위력
  const { isLoading, data } = useQuery<IRoomList[]>(["rooms"], getAllRooms);
  //첫 번째 인자로 캐싱key를 받는다.
  //두 번째 인자로 Promise를 반환하는 함수를 받는다.

  //"repeat(6, 1fr)" === "1fr 1fr 1fr 1fr 1fr 1fr"
  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {isLoading ? (
        <>
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
        </>
      ) : (
        data?.map((room, index) => (
          <Room
            key={index}
            pk={room.pk}
            name={room.name}
            city={room.city}
            country={room.country}
            photo_set={room.photo_set}
            is_owner={room.is_owner}
            is_wishlist={room.is_wishlist}
            rating={room.rating === "리뷰 없음." ? 0 : room.rating}
            price={room.price}
          />
        ))
      )}
    </Grid>
  );
}
