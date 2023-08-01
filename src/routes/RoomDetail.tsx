
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getOneRoom } from "../api"

export default function RoomDetail(){
  const {roomPk} = useParams()
  const {isLoading, data} = useQuery([`rooms:${roomPk}`], getOneRoom)
  console.log(roomPk)
  console.log(data)
  return (
    <>
      <h1>{`hello. It's room ${roomPk}`}</h1>
      {isLoading
      ? <h1>I'm Loading</h1>
      : <p>{data.name}</p>
    }
    </>
  )
}