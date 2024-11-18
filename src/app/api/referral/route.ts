import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const refCode = url.searchParams.get('ref')
  
  // Remove ref parameter from URL
  url.searchParams.delete('ref')
  
  // Create response that redirects to the same URL without ref parameter
  const response = NextResponse.redirect(url)
  
  if (refCode) {
    // Set the cookie
    response.cookies.set('referralCode', refCode, {
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
  }
  
  return response
}
