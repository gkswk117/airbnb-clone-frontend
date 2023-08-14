import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IProtectedPageProps {
  children: React.ReactNode;
}
export default function ProtectedPage({ children }: IProtectedPageProps) {
  const { isLoading: userLoading, data: user } = useQuery(["me"], getMe, { retry: false });
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!user) {
        console.log("You are not logged in.");
        navigate("/");
      }
    }
  }, [userLoading, user, navigate]);
  return <>{children}</>;
}
