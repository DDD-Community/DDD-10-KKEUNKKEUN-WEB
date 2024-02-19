'use client';
import classNames from 'classnames/bind';
import styles from './SocialLoginButtons.module.scss';
import SocialLogoIcon from '../_svgs/SocialLogoIcon';

const cx = classNames.bind(styles);

const SocialLoginButtons = () => {
  const onClick = (socialType: 'google' | 'kakao' | 'naver') => {
    let url;
    if (socialType === 'kakao') {
      // url = window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_DEV}&response_type=code`;
      // url = `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/oauth2/authorization/kakao`;
      url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_ROUTE_HANDLER}/accounts/login/process`;
    }

    window.location.href = `${url}`;
  };
  return (
    <>
      <button className={cx(['buttons', 'google'])} onClick={() => onClick('google')}>
        <svg />
        Google로 시작하기
        <div />
      </button>
      <button className={cx(['buttons', 'kakao'])} onClick={() => onClick('kakao')}>
        <SocialLogoIcon>
          <SocialLogoIcon.Kakao />
        </SocialLogoIcon>
        KAKAO로 시작하기
        <div />
      </button>
      <button className={cx(['buttons', 'naver'])} onClick={() => onClick('naver')}>
        <svg />
        네이버로 시작하기
        <div />
      </button>
    </>
  );
};

export default SocialLoginButtons;
