export const customFetchWithAuth = async (url: string, options = {}) => {
  let response = await fetch(url, {
    ...options,
    cache: 'no-store',
    credentials: 'include',
  });

  if (response.status === 401) {
    // refreshToken을 사용하여 accessToken 재발급 요청
    const accessTokenResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_MOCK}/api/get/auth/slient`,
      {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
      },
    );
    if (accessTokenResponse.ok) {
      // 새 accessToken 발급 성공 후 원래 요청 다시 시도
      response = await fetch(url, {
        ...options,
        cache: 'no-store',
        credentials: 'include',
      });
    } else {
      // refreshToken 만료 등으로 인한 로그아웃 및 리다이렉션 처리
    }
  }

  return response;
};
