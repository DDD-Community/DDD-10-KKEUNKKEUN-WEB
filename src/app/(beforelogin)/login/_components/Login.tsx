'use client';
import styles from './Login.module.scss';

const Login = () => {
  const onClick = () => {
    // window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_DEV}&response_type=code`;
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/oauth2/authorization/kakao`;
  };
  return (
    <div className={styles.container}>
      <button onClick={onClick}>카카오 로그인</button>
    </div>
  );
};

export default Login;
