import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const codeQuery = request.nextUrl.searchParams.get('code') as string;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/login/oauth2/code/kakao?code=${codeQuery}`;
  // console.log(url);
  const response = await fetch(`${url}`, {
    method: 'GET',
  });
  console.log(response.headers);
  // console.log(response);
  const data = await response.json();
  //console.log(data);
  return NextResponse.json({
    data,
  });
  // return NextResponse.rewrite(
  //   new URL(`http://124.49.161.33:8080/login/oauth2/code/kakao?code=${codeQuery}`, request.url),
  // );
}
