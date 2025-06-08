// components/MedicationList.js
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import MedicationReminderView from './MedicationReminderView';
import useScheduleStore from '../store/useScheduleStore';
import useUserStore from '../store/useUserStore'; // ✅ 추가
import { deleteSchedule, getSchedule, patchSchedule } from '../apis/scheduleAPI'; // ✅ 실제 경로에 맞게 수정
import { ActivityIndicator } from 'react-native'; // 추가

const MedicationList = ({ selectedDate }) => {
  const [isLoading, setIsLoading] = useState(true); // ✅ 로딩 상태 추가
  const currentUserId = useUserStore((state) => state.currentUserId); // ✅ 현재 유저 ID 사용
  const [data, setData] = useState();
  const [totalMeds, setTotalMeds] = useState(0)
  const [scheduleData, setScheduleData] = useState({
    selectedDate: {
      "MORNING": {
        "schedule": []
      },
      "AFTERNOON": {
        "schedule": []
      },
      "EVENING": {
        "schedule": []
      },
      "UPON_WAKING": {
        "schedule": []
      },
      "BEFORE_BED": {
        "schedule": []
      },
      "ANYTIME": {
        "schedule": []
      }
    }
  });

  const fetchSchedule = async () => {
    setIsLoading(true)

    if (!currentUserId || !selectedDate) return;

    try {
      console.log(
        currentUserId,
        selectedDate
      )

      const response = await getSchedule({
        scheduleDate: selectedDate,
        userId: currentUserId,
      });

      const formattedResponse = response.result
      const selectedDayData = formattedResponse[selectedDate] || {};
      
      setScheduleData(formattedResponse)
      setData(formattedResponse[selectedDate])

      // ✅ 복용약 개수 계산 및 저장
      const total = Object.values(selectedDayData).reduce((acc, value) => {
        return acc + (Array.isArray(value.schedule) ? value.schedule.length : 0);
      }, 0);
      
      setTotalMeds(total); // ✅ 상태 업데이트

      console.log('📅 복용 일정 가져옴:', formattedResponse);
    } catch (error) {
      console.error('❌ 복용 일정 불러오기 실패:', error);
    } finally {
      setIsLoading(false)
    }
  };

  // ✅ 날짜 변경 시 복용 일정 가져오기
  useEffect(() => {
    fetchSchedule();
  }, [selectedDate, currentUserId]);

  // ✅ 약 복용 여부 토글
  const handleToggleTaken = async (scheduleId ,currentUserId, isTaken) => {

    if (scheduleId) {
      Alert.alert(
        '복용 완료',
        `복용 완료로 체크할까요?`,
        [
          { text: '아니오', style: 'cancel' },
          {
            text: '예',
            style: 'destructive',
            onPress: async () => {
              try {
                // ✅ 서버에 복용 여부 토글 요청
                const data = await patchSchedule({scheduleId, userId : currentUserId, isTaken});
                await fetchSchedule();
              } catch (error) {
                console.error('❌ 복용 여부 변경 실패:', error);
                // TODO: 실패 시 사용자에게 롤백하거나 알림 표시할 수도 있어요.
              }
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  // ✅ 약 삭제
  const confirmDelete = async (scheduleId, currentUserId) => {
    Alert.alert('삭제 확인', '이 약을 삭제할까요?', [
      { text: '아니오', style: 'cancel' },
      {
        text: '예',
        style: 'destructive',
        onPress: async () => {

          try {
            // ✅ 서버에 삭제 요청
            const data = await deleteSchedule({scheduleId, userId : currentUserId})
            await fetchSchedule();
          } catch (error) {
            console.error('❌ 복약 일정 삭제 실패:', error);
            // TODO: 삭제 실패 처리 추가
          }
        },
      },
    ]);
  };


  if (isLoading) {
    return (
      <View style={styles.noDataContainer}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  if (totalMeds === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>이 날은 복용할 약이 없습니다.</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {Object.entries(data).map(([timeKey, value]) => {
        console.log("받아온 날짜 값",timeKey)
        console.log("value 값",value)
        const schedule = value.schedule;
        if (!schedule || schedule.length === 0) return null;

        return (
          <MedicationReminderView
            key={timeKey}
            time={timeKey}
            date={selectedDate}
            medications={schedule}
            onToggleTaken={handleToggleTaken}
            onDelete={confirmDelete}
          />
        );
      })}
    </ScrollView>
  );
};

export default MedicationList;


const styles = StyleSheet.create({
  scrollContainer: { 
    paddingVertical: 10, 
    alignItems: 'center',
  },
  noDataContainer: { marginTop: 100, alignItems: 'center' },
  noDataText: { fontSize: 20, color: '#555' },
});
