import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

type User = {
  username: string;
  expiredAt: number;
  accessToken: string;
  avatar?: string;
  id: string;
};

export const useLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { auth, userId } = router.query;

  const login = useCallback(() => {
    // No need to check for auth if access token is not present
    // if (localStorage.getItem('auth') || auth) {
    //   const decodedToken: any = jwt.decode(
    //     // @ts-ignore
    //     localStorage.getItem('auth') || auth
    //   );

    //   if (decodedToken.applicationId !== 'ef64c9b6-b9d6-4632-99ba-edbd34a0cbc3') {
    //     removeCookie('access_token', { path: '/' });
    //     localStorage.clear();
    //     sessionStorage.clear();
    //     router.push('/login');
    //     if (typeof window !== 'undefined') window.location.reload();
    //   } else {
    //     const expires = new Date(decodedToken?.exp * 1000);
    //     // if token not expired then check for auth
    //     if (expires > new Date()) {
    //       const token = localStorage.getItem('auth') || auth;
    //       axios
    //         .get(`/api/auth?token=${token}`)
    //         .then((response) => {
    //           if (response.data === null) {
    //             toast.error('Invalid Access Token');
    //             removeCookie('access_token', { path: '/' });
    //             localStorage.clear();
    //             sessionStorage.clear();
    //             router.push('/login');
    //             console.log('response null');
    //           } else {
    //             setIsAuthenticated(true);
    //             console.log('authenticated true');
    //           }
    //         })
    //         .catch((err: any) => {
    //           console.error(err);
    //           removeCookie('access_token', { path: '/' });
    //           localStorage.clear();
    //           sessionStorage.clear();
    //           router.push('/login');
    //         });
    //     } else {
    //       removeCookie('access_token', { path: '/' });
    //       localStorage.clear();
    //       sessionStorage.clear();
    //       router.push('/login');
    //       if (typeof window !== 'undefined') window.location.reload();
    //     }
    //   }
    // }
    console.log('loging things', localStorage.getItem('phoneNumber'));

    if (localStorage.getItem('phoneNumber') && localStorage.getItem('phoneNumber')?.length == 10) {
      setIsAuthenticated(true);
      console.log('loging succ');
    } else setIsAuthenticated(false);
  }, [removeCookie, router]);

  useEffect(() => {
    //   if (auth && userId) {
    //     // setCookie('access_token', auth, { path: '/' });
    //     localStorage.setItem('auth', auth as string);
    //     localStorage.setItem('userID', userId as string);
    //   }
    //   const token = auth;
    //   if (!token) {
    //     setLoading(false);
    //     return;
    //   }
    login();
  }, [login]);

  return { isAuthenticated, login, loading };
};
