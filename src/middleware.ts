import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)'],
};

const protectedRoutes = ['/home', '/upload/new']; // 로그인이 필요한 페이지 목록
const publicRoutes = ['/login']; // 로그인이 되면 접근할 수 없는 페이지 목록

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const tokens = getTokenFromCookies(request);
  const accessToken = tokens?.get('accessToken');
  const refreshToken = tokens?.get('refreshToken');
  console.log('middleware');

  // if (!accessToken && refreshToken && protectedRoutes.includes(currentPath)) {
  // }

  // 로그아웃 처리
  if (!refreshToken && protectedRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 로그인 처리
  if (accessToken && refreshToken && publicRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = '/home';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

function getTokenFromCookies(request: NextRequest) {
  const cookiesHeader = request.headers.get('cookie');
  if (!cookiesHeader) return null;

  const cookiesArray: [string, string][] = cookiesHeader.split('; ').map((cookie) => {
    const [key, value] = cookie.split('=');
    return [key, value];
  });

  const cookies = new Map(cookiesArray);
  return cookies;
  // return cookies.get('accessToken');
}
