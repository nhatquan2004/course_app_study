import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const token = request.cookies.get('loginToken')?.value;
    const userRole = request.cookies.get('userRole')?.value;
    const { pathname } = request.nextUrl;
    
    if (token && pathname.startsWith('/auth') && userRole === 'admin') {
        console.log('chạy ở 1')
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!token && pathname.startsWith('/admin')) {
        console.log('chạy ở 2');
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    
    console.log('chạy ở đây nè')
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/auth/:path*'],
}
