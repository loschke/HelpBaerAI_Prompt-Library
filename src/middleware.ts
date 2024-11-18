import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "./auth"

async function handleRequest(request: NextRequest) {
  // Check for ref parameter
  const { searchParams } = request.nextUrl
  const refCode = searchParams.get('ref')
  
  // If there's a referral code, handle it first
  if (refCode) {
    // Create URL without ref parameter for redirect
    const redirectUrl = new URL(request.url)
    redirectUrl.searchParams.delete('ref')
    
    // Create redirect response
    const response = NextResponse.redirect(redirectUrl)
    
    // Set the cookie
    response.cookies.set('referralCode', refCode, {
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
    
    return response
  }
  
  // If no ref parameter, proceed with auth
  const authResponse = await auth(request as any)
  
  // If auth returned a Response, use it
  if (authResponse instanceof Response) {
    return authResponse
  }
  
  // Otherwise allow the request
  return NextResponse.next()
}

export async function middleware(request: NextRequest) {
  return handleRequest(request)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
