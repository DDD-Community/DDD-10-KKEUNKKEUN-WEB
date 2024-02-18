import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('=========server=========');
  console.log(request.headers);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/accounts/reissue`;
  const response = await fetch(`${url}`, {
    method: 'GET',
    credentials: 'include',
  });

  const tokens = response.headers.get('set-cookie');

  if (tokens) {
    const newResponse = new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });
    newResponse.headers.set('Set-Cookie', tokens);
    return newResponse;
  }

  return new NextResponse('something wrong with token', { status: 500 });
}
