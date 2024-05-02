import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

type User = {
  username: string;
  expiredAt: number;
  accessToken: string;
  avatar?: string;
  id: string;
};

export const useLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = useCallback(() => {
    // No need to check for auth if access token is not present
    if (cookies.access_token) {
      const decodedToken: any = jwt.decode(cookies.access_token);

      const expires = new Date(decodedToken?.exp * 1000);

      if (expires > new Date()) {
        const token = cookies.access_token;
        axios
          .get(`/api/auth?token=${token}`)
          .then((response) => {
            if (response.data === null) {
              toast.error("Invalid Access Token");
              removeCookie("access_token", { path: "/" });
              localStorage.clear();
              sessionStorage.clear();
              router.push("/login");
              console.log("response null");
            } else {
              setIsAuthenticated(true);
              console.log("authenticated true");
            }
          })
          .catch((err: any) => {
            console.error(err);
            removeCookie("access_token", { path: "/" });
            localStorage.clear();
            sessionStorage.clear();
            router.push("/login");
          });
      } else {
        removeCookie("access_token", { path: "/" });
        localStorage.clear();
        sessionStorage.clear();
        router.push("/login");
        if (typeof window !== "undefined") window.location.reload();
      }
    }
  }, [cookies.access_token, removeCookie, router]);
  useEffect(() => {
    const token = cookies.access_token; // Assuming the token is stored in localStorage
    if (!token) {
      setLoading(false);
      return;
    }

    // const verifyToken = async () => {
    //   try {
    //     if (cookies.access_token) {
    //       const decodedToken: any = jwt.decode(cookies.access_token);

    //       const expires = new Date(decodedToken?.exp * 1000);
    //       // if token not expired then check for auth
    //       if (expires > new Date()) {
    //         const token = cookies.access_token;
    //         axios
    //           .get(`/api/auth?token=${token}`)
    //           .then((response) => {
    //             if (response.data === null) {
    //               toast.error("Invalid Access Token");
    //               removeCookie("access_token", { path: "/" });
    //               localStorage.clear();
    //               sessionStorage.clear();
    //               router.push("/login");
    //               console.log("response null");
    //             } else {
    //               setIsAuthenticated(true);
    //               console.log("authenticated true");
    //             }
    //           })
    //           .catch((err: any) => {
    //             console.error(err);
    //             removeCookie("access_token", { path: "/" });
    //             localStorage.clear();
    //             sessionStorage.clear();
    //             router.push("/login");
    //           });
    //       } else {
    //         removeCookie("access_token", { path: "/" });
    //         localStorage.clear();
    //         sessionStorage.clear();
    //         router.push("/login");
    //         if (typeof window !== "undefined") window.location.reload();
    //       }
    //     }
    //   } catch (error) {
    //     console.error("Failed to verify token:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    login();
  }, [cookies.access_token,login]);

 

  return { isAuthenticated, login, loading };
};
