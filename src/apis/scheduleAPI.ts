import { axiosInstance } from './axiosInstance';

// 복용 일정 조회 API
export const getSchedule = async (
  { scheduleDate , userId } :
  { scheduleDate : string, userId : number}
) => {
  const { data } = await axiosInstance.get(`/schedule/users/${userId}`,
  {
    params : { scheduleDate, userId }
});

  return data;
}

// 복용 일정 생성 API
export const postSchedule = async (
  {
    userId,
    name,
    startDate,
    endDate,
    intakeTimes,
    dosage
  }: {
    userId: number;
    name: string;
    startDate: string; // ISO 형식 문자열
    endDate: string;
    intakeTimes: string[]; // 예: ["MORNING"]
    dosage: string;
  }
) => {
  const { data } = await axiosInstance.post(`/schedule/users/${userId}`, {
    params : { userId },
    name,
    startDate,
    endDate,
    intakeTimes,
    dosage,
  });

  return data;
};

// 복용 전체 일정 삭제 API
export const deleteAllSchedule = async (
  {userId} :
  {userId: number}) => {
    const { data } = await axiosInstance.delete(`/schedule/users/${userId}`,
    );

    return data;
};

// 복용 일정 삭제 API
export const deleteSchedule = async (
  {scheduleId, userId} :
  {scheduleId: number, userId : number}
) => {
    const { data } = await axiosInstance.delete(`/schedule/${scheduleId}/users/${userId}`
    );

    return data;
};

// 복용 상태 수정 API
export const patchSchedule = async (
  {scheduleId, userId, isTaken} :
  {scheduleId: number, userId : number, isTaken : boolean}
) => {
    const { data } = await axiosInstance.patch(`/schedule/${scheduleId}/users/${userId}`,
      { isTaken },
    );

    return data;
};
