import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout } from "../services/authService";
import { useAuthContext } from "../../context/AuthContext";
import { googleLogout } from "@react-oauth/google";
import { resumeApi } from "../resumeApi";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthContext();
  const getAuth = async () => {
    try {
      const { data } = await resumeApi.auth();
      const authData = data?.response;
      setAuth(authData);
    } catch (e) {
      console.log(e);
    }
  };
  return useMutation({
    mutationFn: ({ socialType, socialId, name }) => login(socialType, socialId),
    onSuccess: (data, variables, context) => {
      getAuth();
      // const authData = {
      //   name: variables.name,
      //   socialType: variables.socialType,
      // };
      // setAuth(authData); // 로그인 성공 시 인증 상태 업데이트 및 name 추가
      // console.log("Auth data set:", authData); // 상태가 설정된 후 콘솔에 출력
      // setAuth({ ...data, name: variables.name }); // 로그인 성공 시 인증 상태 업데이트 및 name 추가

      if (context && context.onSuccess) {
        context.onSuccess(); // context에 있는 onSuccess 호출
      }
      queryClient.invalidateQueries(["auth"]); // 'auth' 쿼리 무효화하여 데이터 새로고침
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { auth, setAuth } = useAuthContext();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      if (auth?.socialType === "google") {
        googleLogout();
      }
      setAuth(null); // 로그아웃 성공 시 인증 상태 초기화
      queryClient.invalidateQueries(["auth"]); // 'auth' 쿼리 무효화하여 데이터 새로고침
    },
  });
};
