import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { AxiosError } from "axios";

export default function useUser(){
  const {isLoading, data, isError, error} = useQuery(['me'], getMe, {retry: false,})
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !(data instanceof AxiosError),
  };
}