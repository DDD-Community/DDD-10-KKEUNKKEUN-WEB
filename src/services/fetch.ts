/** 클라이언트 컴포넌트에서 사용하는 인증 기반 fetch */
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  // 1차 실행
  let response = await fetch(url, {
    ...options,
    cache: 'no-store',
    credentials: 'include',
  });

  // 토큰 만료
  if (response.status === 401) {
    // accessToken 재발급
    const clientUrl = `/api/auth/reissue`;
    const accessTokenResponse = await fetch(clientUrl, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
    });

    if (accessTokenResponse.ok) {
      response = await fetch(url, {
        ...options,
        cache: 'no-store',
        credentials: 'include',
      });
    } else {
      // refreshToken이 존재하지 않아서 재발급이 불가능한 경우
      window.location.href = '/login';
    }
  }

  return response;
};
