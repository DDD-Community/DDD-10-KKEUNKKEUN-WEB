'use client';
import classNames from 'classnames/bind';
import styles from './SocialLoginButtons.module.scss';

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <g clipPath="url(#clip0_2164_8823)">
            <path
              d="M14.0016 28.0032C21.7345 28.0032 28.0032 21.7345 28.0032 14.0016C28.0032 6.26873 21.7345 0 14.0016 0C6.26873 0 0 6.26873 0 14.0016C0 21.7345 6.26873 28.0032 14.0016 28.0032Z"
              fill="#F8E049"
            />
            <path
              d="M14.0047 5.75659C9.04676 5.75659 5.03125 8.93195 5.03125 12.8484C5.03125 15.4041 6.73074 17.6402 9.28636 18.8861C9.09788 19.5857 8.60593 21.4225 8.51009 21.8154C8.3855 22.3042 8.68578 22.2978 8.88384 22.1669C9.0819 22.0359 11.3436 20.4961 12.3371 19.8221C12.8892 19.9034 13.4466 19.9439 14.0047 19.9435C18.9594 19.9435 22.9781 16.7681 22.9781 12.8484C22.9781 8.92876 18.9594 5.75659 14.0047 5.75659Z"
              fill="#371C1D"
            />
            <path
              d="M7.74261 11.5417H8.66584C8.66584 11.5417 8.66584 14.0781 8.66584 14.6691C8.66584 15.1004 9.62419 15.1068 9.62419 14.6691V11.5673H10.5442C10.6575 11.5577 10.7631 11.506 10.8401 11.4223C10.9171 11.3385 10.9598 11.229 10.9598 11.1152C10.9598 11.0015 10.9171 10.8919 10.8401 10.8082C10.7631 10.7245 10.6575 10.6727 10.5442 10.6632C9.90531 10.6632 7.73303 10.644 7.73303 10.644C7.19316 10.644 7.19316 11.5321 7.73303 11.5321"
              fill="#F8E049"
            />
            <mask id="mask0_2164_8823" maskUnits="userSpaceOnUse" x="7" y="10" width="4" height="5">
              <path
                d="M7.74261 11.5417H8.66584C8.66584 11.5417 8.66584 14.0781 8.66584 14.6691C8.66584 15.1004 9.62419 15.1068 9.62419 14.6691V11.5673H10.5442C10.6575 11.5577 10.7631 11.506 10.8401 11.4223C10.9171 11.3385 10.9598 11.229 10.9598 11.1152C10.9598 11.0015 10.9171 10.8919 10.8401 10.8082C10.7631 10.7245 10.6575 10.6727 10.5442 10.6632C9.90531 10.6632 7.73303 10.644 7.73303 10.644C7.19316 10.644 7.19316 11.5321 7.73303 11.5321"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0_2164_8823)">
              <path d="M11.1292 10.6599H7.20312V15.1099H11.1292V10.6599Z" fill="#F8E049" />
            </g>
            <path
              d="M12.162 11.708L12.6763 13.3052H11.603L12.162 11.708ZM11.5838 10.954C11.357 11.4524 10.536 13.8291 10.2645 14.4457C10.0664 14.8993 10.9034 15.2667 11.1142 14.813L11.2995 14.1741H12.9894C12.9894 14.1741 12.9319 14.1997 13.1555 14.7939C13.3376 15.273 14.2161 14.9408 14.034 14.4744C13.772 13.7876 12.8744 11.3214 12.7115 10.9604C12.6421 10.8665 12.55 10.7918 12.4438 10.7432C12.3377 10.6946 12.2209 10.6737 12.1045 10.6825C12.0001 10.6733 11.8953 10.6947 11.8028 10.744C11.7103 10.7934 11.6342 10.8686 11.5838 10.9604"
              fill="#F8E049"
            />
            <mask
              id="mask1_2164_8823"
              maskUnits="userSpaceOnUse"
              x="10"
              y="10"
              width="5"
              height="6"
            >
              <path
                d="M12.162 11.708L12.6763 13.3052H11.603L12.162 11.708ZM11.5838 10.954C11.357 11.4524 10.536 13.8291 10.2645 14.4457C10.0664 14.8993 10.9034 15.2667 11.1142 14.813L11.2995 14.1741H12.9894C12.9894 14.1741 12.9319 14.1997 13.1555 14.7939C13.3376 15.273 14.2161 14.9408 14.034 14.4744C13.772 13.7876 12.8744 11.3214 12.7115 10.9604C12.6421 10.8665 12.55 10.7918 12.4438 10.7432C12.3377 10.6946 12.2209 10.6737 12.1045 10.6825C12.0001 10.6733 11.8953 10.6947 11.8028 10.744C11.7103 10.7934 11.6342 10.8686 11.5838 10.9604"
                fill="white"
              />
            </mask>
            <g mask="url(#mask1_2164_8823)">
              <path d="M14.209 10.676H10.0625V15.2666H14.209V10.676Z" fill="#F8E049" />
            </g>
            <path
              d="M14.3562 11.101C14.3562 11.906 14.3562 14.4936 14.3562 14.4936C14.3562 14.4936 14.2827 15.0079 14.7235 15.0079H16.5795C17.014 15.0079 17.0108 14.0847 16.5795 14.0847H15.3528C15.3528 14.0847 15.3528 11.6888 15.3528 11.1074C15.3318 10.9901 15.2702 10.884 15.1788 10.8075C15.0874 10.7311 14.9721 10.6892 14.8529 10.6892C14.7338 10.6892 14.6184 10.7311 14.527 10.8075C14.4356 10.884 14.374 10.9901 14.353 11.1074"
              fill="#F8E049"
            />
            <path
              d="M17.1328 10.9731C17.1328 11.3245 17.1328 14.5126 17.1328 14.7458C17.1328 15.1196 18.0912 15.1196 18.0912 14.7458V13.4935L18.3691 13.2699L19.5894 14.9311C19.8354 15.2505 20.6084 14.6691 20.3625 14.3433L19.0687 12.6406C19.0687 12.6406 19.9472 11.6823 20.2922 11.3628C20.4966 11.1616 19.8705 10.5322 19.6693 10.7239C19.468 10.9156 18.0976 12.2924 18.0976 12.2924C18.0976 12.2924 18.0976 11.4299 18.0976 10.9507C18.0976 10.7686 17.8707 10.6824 17.6439 10.6824C17.4171 10.6824 17.1488 10.7814 17.1552 10.9763"
              fill="#F8E049"
            />
            <mask
              id="mask2_2164_8823"
              maskUnits="userSpaceOnUse"
              x="17"
              y="10"
              width="4"
              height="6"
            >
              <path
                d="M17.1328 10.9731C17.1328 11.3245 17.1328 14.5126 17.1328 14.7458C17.1328 15.1196 18.0912 15.1196 18.0912 14.7458V13.4935L18.3691 13.2699L19.5894 14.9311C19.8354 15.2505 20.6084 14.6691 20.3625 14.3433L19.0687 12.6406C19.0687 12.6406 19.9472 11.6823 20.2922 11.3628C20.4966 11.1616 19.8705 10.5322 19.6693 10.7239C19.468 10.9156 18.0976 12.2924 18.0976 12.2924C18.0976 12.2924 18.0976 11.4299 18.0976 10.9507C18.0976 10.7686 17.8707 10.6824 17.6439 10.6824C17.4171 10.6824 17.1488 10.7814 17.1552 10.9763"
                fill="white"
              />
            </mask>
            <g mask="url(#mask2_2164_8823)">
              <path d="M20.5832 10.5195H17.1172V15.257H20.5832V10.5195Z" fill="#F8E049" />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_2164_8823">
              <rect width="28" height="28" fill="white" />
            </clipPath>
          </defs>
        </svg>
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
