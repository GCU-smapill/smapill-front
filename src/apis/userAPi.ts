import { axiosInstance } from './axiosInstance';

// 회원가입 API
export const postSignup = async (
    {userId, name, email, password, phoneNumber} : 
    {userId : string, name : string, email : string, password : string, phoneNumber : string}
) => {
  const { data } = await axiosInstance.post('/user/signup',{userId, name, email, password, phoneNumber});
  return data;
};

// 로그인 API
export const postSignin = async (
    {userId, password} :
    {userId : string, password : string}

) => {
  const { data } = await axiosInstance.post('/user/login',{userId, password});
  return data;
};

// 로그아웃 API
export const postLogout = async (
    { Authorizaiton } : 
    { Authorizaiton : string}

) => {
  const { data } = await axiosInstance.post('/user/logout',{Authorizaiton});
  return data;
};

// 회원탈퇴 API
export const deleteUserInfo = async (
) => {
  const { data } = await axiosInstance.post('/user/delete');
  return data;
};

// 유저 정보 조회 API
export const getUserInfo = async () => {
  const { data } = await axiosInstance.get('/user/');
  return data;
};

// 유저 모드 수정 API
export const patchUserMode = async (
    { mode } :
    { mode : string}
) => {
  const { data } = await axiosInstance.patch('/user/mode',{ mode });
  return data;
};