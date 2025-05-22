import { axiosInstance } from './axiosInstance';

// 복용 일정 생성 API
export const postDevice = async (
    { deviceType, deviceIp } :
    { deviceType : string, deviceIp : string}
) => {
  const { data } = await axiosInstance.post('/device/');
  return data;
};