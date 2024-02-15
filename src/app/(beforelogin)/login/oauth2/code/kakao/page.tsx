import GetToken from './_components/GetToken';

type Props = {
  searchParams: { code?: string };
};

const page = async ({ searchParams }: Props) => {
  //   const codeQuery = searchParams.code;
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/login/oauth2/code/kakao?code=${codeQuery}`,
  //     {
  //       method: 'GET',
  //     },
  //   );

  //   console.log('됨?');
  //   console.log(response);

  //   if (response.ok) {
  //     console.log('ㅇㅇ');
  //     const result = await response.json();
  //     console.log(result);
  //   }

  return (
    <div>
      hi
      {searchParams.code}
      <GetToken />
    </div>
  );
};

export default page;
