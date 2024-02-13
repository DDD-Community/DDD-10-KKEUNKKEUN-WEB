import { ReactChildrenProps } from '@/types/common';
import styles from './InputFormSvgs.module.scss';

const InputFormSvgs = ({ children }: ReactChildrenProps) => {
  return <>{children}</>;
};

const MemoDescriptionHover = () => {
  return (
    <div className={styles.memoDescriptionHover}>
      <svg
        width="313"
        height="55"
        viewBox="0 0 313 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="0.613281" width="313" height="40" rx="5" fill="#868686" />
        <path
          d="M22.6543 13.0781V15.3281H27.207V13.0781H28.5781V19.8809H21.3008V13.0781H22.6543ZM22.6543 18.7559H27.207V16.4004H22.6543V18.7559ZM32.8496 12.4102V15.8027H35.2051V16.9629H32.8496V20.4961H31.4785V12.4102H32.8496ZM32.8496 21.2344V25.0137H24.2715V26.7363H33.4297V27.8613H22.918V23.959H31.4785V22.3418H22.8828V21.2344H32.8496ZM50.318 24.9785V26.1211H36.0095V24.9785H39.9997V21.252H37.3102V20.1094H39.7536V15.0117H37.2751V13.8691H48.947V15.0117H46.4684V20.1094H48.9118V21.252H46.2223V24.9785H50.318ZM41.1247 20.1094H45.1149V15.0117H41.1247V20.1094ZM41.3884 24.9785H44.8512V21.252H41.3884V24.9785ZM68.6787 12.4277V23.9766H67.2901V19.7578H63.2471C62.5264 20.6807 61.3662 21.2344 60.0303 21.2344C57.6924 21.2344 55.9698 19.6172 55.9698 17.332C55.9698 15.0469 57.6924 13.4297 60.0303 13.4121C61.3575 13.4209 62.4912 13.9658 63.2295 14.8711H67.2901V12.4277H68.6787ZM69.1182 26.543V27.7031H58.6416V22.7637H60.0303V26.543H69.1182ZM60.0303 14.6426C58.4307 14.6602 57.2881 15.7676 57.2881 17.332C57.2881 18.8965 58.4307 20.0039 60.0303 20.0039C61.5596 20.0039 62.7373 18.8965 62.7373 17.332C62.7373 15.7676 61.5596 14.6602 60.0303 14.6426ZM63.8623 16.0137C63.9942 16.418 64.0733 16.8574 64.0733 17.332C64.0733 17.7891 63.9942 18.2197 63.8623 18.6152H67.2901V16.0137H63.8623ZM74.282 21.7969V23.625H82.0866V21.7969H83.4753V27.8262H72.9109V21.7969H74.282ZM74.282 26.7188H82.0866V24.7148H74.282V26.7188ZM85.3386 19.5469V20.6895H71.1003V19.5469H85.3386ZM78.9402 13.3242C78.9402 15.2578 81.7878 16.9805 84.53 17.332L84.0202 18.4395C81.5945 18.0791 79.2214 16.8398 78.237 15.082C77.2351 16.8486 74.8445 18.0791 72.4362 18.4395L71.9089 17.332C74.6862 16.9629 77.5163 15.3105 77.5163 13.3242V12.5859H78.9402V13.3242ZM105.053 19.7227V20.8652H98.6016V22.5352C101.555 22.6582 103.295 23.625 103.313 25.2773C103.295 27.0176 101.291 28.002 97.9337 28.002C94.5411 28.002 92.5372 27.0176 92.5372 25.2773C92.5372 23.625 94.2686 22.6582 97.2481 22.5352V20.8652H90.8145V19.7227H105.053ZM97.9337 23.5898C95.42 23.6074 93.9259 24.2227 93.9434 25.2773C93.9259 26.3145 95.42 26.9297 97.9337 26.9297C100.412 26.9297 101.924 26.3145 101.924 25.2773C101.924 24.2227 100.412 23.6074 97.9337 23.5898ZM103.787 13.1484V14.2734H98.8302C98.918 16.0312 101.502 17.3936 104.262 17.6836L103.752 18.7734C101.194 18.4658 98.795 17.3232 97.9337 15.5742C97.0811 17.3232 94.6905 18.4658 92.1153 18.7734L91.6231 17.6836C94.3302 17.3936 96.9317 16.0312 97.0372 14.2734H92.1153V13.1484H103.787ZM119.586 12.4102V28.0371H118.25V12.4102H119.586ZM116.439 12.7441V27.2461H115.121V19.6523H113.117C112.968 22.6934 111.676 24.5918 109.742 24.5918C107.703 24.5918 106.385 22.4824 106.385 19.1602C106.385 15.8379 107.703 13.7285 109.742 13.7285C111.64 13.7285 112.924 15.5654 113.099 18.5098H115.121V12.7441H116.439ZM109.742 15.0293C108.476 15.0293 107.668 16.6113 107.685 19.1602C107.668 21.6914 108.476 23.291 109.742 23.2734C111.008 23.291 111.816 21.6914 111.816 19.1602C111.816 16.6113 111.008 15.0293 109.742 15.0293ZM134.189 19.7402V20.8652H129.355V24.9082H135.876V26.0684H121.568V24.9082H128.001V20.8652H123.396V13.6934H134.031V14.8184H124.785V19.7402H134.189ZM147.839 14.2383V18.3164H150.212V12.7441H151.53V27.2461H150.212V19.459H147.839V23.8359H141.862V14.2383H147.839ZM143.163 15.3457V22.7285H146.538V15.3457H143.163ZM154.677 12.4102V28.0371H153.341V12.4102H154.677ZM170.967 24.873V26.0332H156.659V24.873H163.092V21.0586H158.346V13.7285H169.192V21.0586H164.446V24.873H170.967ZM159.7 14.8359V19.9512H167.856V14.8359H159.7ZM186.326 19.6699V20.7598H172.018V19.6699H186.326ZM184.533 22.0078V25.3301H175.147V26.8242H185.043V27.8262H173.758V24.3809H183.162V23.0449H173.74V22.0078H184.533ZM184.481 12.8848V16.1191H175.252V17.4902H184.762V18.4922H173.881V15.1699H183.092V13.8867H173.828V12.8848H184.481ZM203.966 12.4277V16.0137H206.339V17.1738H203.966V21.252H202.595V12.4277H203.966ZM203.966 22.1133V27.8262H194.07V22.1133H203.966ZM195.423 23.2031V26.7012H202.63V23.2031H195.423ZM193.894 13.2188V18.8965C196.118 18.8877 198.412 18.7119 200.943 18.1934L201.119 19.3535C198.464 19.8809 196.109 20.0566 193.753 20.0566H192.505V13.2188H193.894ZM220.029 12.4102V20.4082H218.657V12.4102H220.029ZM215.353 13.1836C215.353 17.1738 212.523 19.6699 207.9 20.7422L207.39 19.582C211.301 18.7119 213.595 16.8398 213.841 14.3262H208.181V13.1836H215.353ZM220.029 21.1465V24.9258H211.275V26.7891H220.591V27.8965H209.904V23.8711H218.657V22.2539H209.868V21.1465H220.029ZM234.68 13.8691C234.68 16.0664 237.563 17.9824 240.376 18.3691L239.813 19.4941C237.387 19.0898 234.988 17.7451 233.977 15.8203C232.975 17.7539 230.567 19.0898 228.141 19.4941L227.579 18.3691C230.391 17.9824 233.256 16.1016 233.256 13.8691V12.9727H234.68V13.8691ZM241.079 21.2168V22.377H234.61V28.0371H233.256V22.377H226.84V21.2168H241.079ZM251.846 22.9043C251.846 24.2842 252.584 25.752 254.078 26.5957C255.555 25.6729 256.346 24.1172 256.346 22.9043V22.043H257.699V22.9043C257.699 24.5039 258.877 26.1211 260.881 26.8066L260.195 27.8262C258.631 27.2725 257.532 26.1826 256.996 24.873C256.513 26.1387 255.555 27.334 254.113 27.9492C252.593 27.3691 251.626 26.2178 251.16 24.9082C250.606 26.1738 249.525 27.2637 248.031 27.8262L247.328 26.8066C249.297 26.0684 250.492 24.3984 250.51 22.9043V22.043H251.846V22.9043ZM259.457 12.4277V21.3574H258.086V12.4277H259.457ZM251.019 13.3418C253.393 13.3418 255.115 14.8184 255.115 16.998C255.115 19.1426 253.393 20.6191 251.019 20.6191C248.646 20.6191 246.924 19.1426 246.924 16.998C246.924 14.8184 248.646 13.3418 251.019 13.3418ZM251.019 14.5195C249.42 14.502 248.26 15.5391 248.277 16.998C248.26 18.4395 249.42 19.459 251.019 19.4766C252.601 19.459 253.762 18.4395 253.762 16.998C253.762 15.5391 252.601 14.502 251.019 14.5195ZM266.132 13.623C268.259 13.6406 269.789 15.46 270.017 18.3867H273.515V12.4102H274.886V28.0723H273.515V19.5293H270.035C269.868 22.5879 268.312 24.5039 266.132 24.5039C263.83 24.5039 262.212 22.3945 262.212 19.0723C262.212 15.75 263.83 13.6406 266.132 13.623ZM266.132 14.8535C264.586 14.8711 263.531 16.5234 263.531 19.0723C263.531 21.6211 264.586 23.2734 266.132 23.2734C267.662 23.2734 268.734 21.6211 268.734 19.0723C268.734 16.5234 267.662 14.8711 266.132 14.8535ZM291.616 24.873V26.0332H277.308V24.873H280.859V20.6543C279.523 19.96 278.714 18.835 278.714 17.4199C278.714 14.9941 281.087 13.4121 284.427 13.3945C287.767 13.4121 290.14 14.9941 290.14 17.4199C290.14 18.8086 289.358 19.9248 288.066 20.6191V24.873H291.616ZM284.427 14.5371C281.861 14.5195 280.05 15.6797 280.05 17.4199C280.05 19.1602 281.861 20.3379 284.427 20.3379C286.976 20.3379 288.804 19.1602 288.804 17.4199C288.804 15.6797 286.976 14.5195 284.427 14.5371ZM282.212 24.873H286.677V21.1465C286 21.3311 285.244 21.4277 284.427 21.4277C283.627 21.4277 282.88 21.3398 282.212 21.1641V24.873Z"
          fill="white"
        />
        <path
          d="M159.591 53.3134C158.434 55.2979 155.566 55.2979 154.409 53.3134L147 40.6128L167 40.6128L159.591 53.3134Z"
          fill="#868686"
        />
      </svg>
    </div>
  );
};

const MemoDescription = () => {
  return (
    <div className={styles.memoDescription}>
      <MemoDescriptionHover />
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8.0026" cy="8.88639" r="6.66667" fill="#9C9C9C" />
        <path
          d="M8.51782 5.14941L8.44946 10.2275H7.62914L7.56078 5.14941H8.51782ZM8.0393 12.2783C7.6975 12.2783 7.40453 11.9951 7.4143 11.6436C7.40453 11.3018 7.6975 11.0186 8.0393 11.0186C8.3811 11.0186 8.6643 11.3018 8.6643 11.6436C8.6643 11.9951 8.3811 12.2783 8.0393 12.2783Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

InputFormSvgs.MemoDescription = MemoDescription;

export default InputFormSvgs;
