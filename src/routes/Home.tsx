import { Grid } from "@chakra-ui/react";
import Room from "../components/Room";
import { useEffect, useState } from "react";
import RoomSkeleton from "../components/RoomSkeleton"

export default function Home() {
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
  },[rooms])
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
      {isLoading ? <><RoomSkeleton/><RoomSkeleton/><RoomSkeleton/><RoomSkeleton/><RoomSkeleton/><RoomSkeleton/><RoomSkeleton/><RoomSkeleton/><RoomSkeleton/><RoomSkeleton/></>
      :rooms.map((room)=><Room name={room["name"]} city={room["city"]} country={room["country"]} rating={room["rating"]==="리뷰 없음."?0:room["rating"]} price={room["price"]}/>)}
      
    </Grid>
  );
}
