import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IHostOnlyPageProps {
  children: React.ReactNode;
}
export default function HostOnlyPage({ children }: IHostOnlyPageProps) {
  const { isLoading: userLoading, data: user } = useQuery(["me"], getMe, { retry: false });
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!user?.is_host) {
        console.log("You are not host.");
        navigate("/");
      }
    }
  }, [userLoading, user, navigate]);
  return <>{children}</>;
}

// export default function useHostOnlyPage() {
//   const { isLoading: userLoading, data: user } = useQuery(["me"], getMe, { retry: false });
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!userLoading) {
//       if (!user?.is_host) {
//         console.log("You are not host.");
//         navigate("/");
//       }
//     }
//   }, [userLoading, user, navigate]);
//   return;
// }
