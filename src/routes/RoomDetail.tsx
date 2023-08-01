import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getOneRoom } from "../api"

export default function RoomDetail(){
  const {roomPk} = useParams()
  const {isLoading, data} = useQuery([`rooms:${roomPk}`, roomPk], getOneRoom)
  // 변수의 값을 fetch 함수로 보내는 방법 => query key를 이용하면 된다.

  // console.log(data)
  // ReactQueryDevtools 덕분에 query를 확인할 때 매번 이렇게 귀찮게 안해도 된다.
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