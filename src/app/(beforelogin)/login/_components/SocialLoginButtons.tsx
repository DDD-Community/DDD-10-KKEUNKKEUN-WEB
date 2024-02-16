'use client';
import styles from './SocialLoginButtons.module.scss';

const SocialLoginButtons = () => {
  const onClick = (socialType: 'google' | 'kakao' | 'naver') => {
    let url;
    if (socialType === 'kakao') {
      // url = window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_DEV}&response_type=code`;
      url = `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/oauth2/authorization/kakao`;
    }
    window.location.href = `${url}`;
  };
  return (
    <>
      <button className={styles.buttons} onClick={() => onClick('google')}>
        Google로 시작하기
      </button>

      <button className={styles.buttons} onClick={() => onClick('kakao')}>
        KAKAO로 시작하기
      </button>
      <button className={styles.buttons} onClick={() => onClick('naver')}>
        네이버로 시작하기
      </button>
    </>
  );
};

export default SocialLoginButtons;
