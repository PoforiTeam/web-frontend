import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout } from "../services/authService";
import { useAuthContext } from "../../context/AuthContext";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthContext();

  return useMutation({
    mutationFn: ({ socialType, socialId }) => login(socialType, socialId),
    onSuccess: data => {
      setAuth(data); // 로그인 성공 시 인증 상태 업데이트
      queryClient.invalidateQueries(["auth"]); // 'auth' 쿼리 무효화하여 데이터 새로고침
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthContext();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAuth(null); // 로그아웃 성공 시 인증 상태 초기화
      queryClient.invalidateQueries(["auth"]); // 'auth' 쿼리 무효화하여 데이터 새로고침
    },
  });
};
