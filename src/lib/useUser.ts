import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IUser } from "../types";

export default function useUser(){
  const {isLoading, data, isError, error} = useQuery(['me'], getMe, {retry: false,})
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !(data?.response.status === 403),
  };
}