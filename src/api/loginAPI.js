// app/api/index.js
export const loginAPI = async (email, password) => {
    // 예시용: 실제로는 fetch 또는 axios 사용
    if (email === 'jskim6335@naver.com' && password === '6335asdf') {
      return {
        token: 'abc123',
        user: {
          id: 1,
          name: '김진성',
          email: 'jskim6335@naver.com',
        },
      };
    } else {
      throw new Error('로그인 실패');
    }
  };
  