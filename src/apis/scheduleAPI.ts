import { axiosInstance } from './axiosInstance';

// 복용 일정 생성 API
export const postSchedule = async (prescription_id : number) => {
    const { data } = await axiosInstance.post('/schedule',{
        prescription_id:prescription_id
    });
    
    return data;
};

// 복용 일정 삭제 API
export const deleteSchedule = async (scheduleId: string) => {
    const { data } = await axiosInstance.delete(`/schedule/${scheduleId}`);

    return data;
};

// 복용 상태 수정 API
export const patchSchedule = async (scheduleId: string) => {
    const { data } = await axiosInstance.patch(`/schedule/${scheduleId}`);

    return data;
};

// 복용 일정 조회 API
export const getSchedule = async (scheduleDate: string) => {
  const { data } = await axiosInstance.get('/schedule', {
    params: { scheduleDate },
  });

  return data;
}
