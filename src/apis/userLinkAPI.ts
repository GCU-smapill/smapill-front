import { axiosInstance } from './axiosInstance';

// 보호자 연동 API
export const postUserLink = async (
    {userId ,  password } :
    {userId : string, password : string}
) => {
  const { data } = await axiosInstance.post('/userLink/', {userId, password});
  return data;
};

// 피보호자 삭제 API
export const deleteUserLink = async (
    {dependentId } :
    {dependentId : number}
) => {
  const { data } = await axiosInstance.post('/userLink/', { dependentId });
  return data;
};

// 피보호자 조회 API
export const getDependentInfo = async () => {
  const { data } = await axiosInstance.get('/userLink/dependent');
  return data;
};