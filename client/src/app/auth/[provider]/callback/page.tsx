"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { API_ROUTES } from "@/const/api";
import api from "@/libs/api/axios";
import axios from "axios";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { setUser, setTokens } = useAuthStore();

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       debugger;
  //       const { data } = await api.get(API_ROUTES.USER.PROFILE);

  //       // refreshToken이 응답에 포함되어 있다면 저장
  //       if (data.refreshToken) {
  //         localStorage.setItem("refresh_token", data.refreshToken);
  //         setTokens(data.refreshToken);
  //       }

  //       setUser(data.data);

  //       router.push(`/u/${data.data.id}`);
  //     } catch (error) {
  //       console.error("Failed to fetch user profile:", error);
  //       router.push("/signin");
  //     }
  //   };

  //   fetchUserProfile();
  // }, [router, setUser, setTokens]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-600 dark:text-gray-400">로그인 처리중...</div>
      <button
        onClick={() => {
          api.get("").then((res) => {
            console.log("reszz:::", res);
          });

          // axios.get("http://localhost:4000/api").then((res) => {
          //   console.log(res);
          // });
        }}
      >
        클릭
      </button>
    </div>
  );
}
