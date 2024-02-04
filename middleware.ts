
import { authMiddleware, clerkClient, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server'
import { Kafka } from "@upstash/kafka";

export default authMiddleware({
  // Specify routes that should be accessible without authentication
  publicRoutes: ["/", "/login"],

  // This function is called after the authentication middleware is executed
  async afterAuth(auth, req, evt) {
    // Allow all logged-in users to access every route
    const kafka = new Kafka({
      url: "https://liked-piglet-6365-us1-kafka.upstash.io",
      username: 'bGlrZWQtcGlnbGV0LTYzNjUk-XvB4Hm_oqPYfzTP1WXaU_js62T6XamEcINxA14',
      password: 'YzFmZTAxN2YtN2NjOS00MDA0LWI0ZGItMTdmNjQ2YzNmNDIx'
    });
   
    const message = {
      country: req.geo?.country,
      city: req.geo?.city,
      region: req.geo?.region,
      url: req.url,
      ip: req.headers.get("x-real-ip"),
      mobile: req.headers.get("sec-ch-ua-mobile"),
      platform: req.headers.get("sec-ch-ua-platform"),
      useragent: req.headers.get("user-agent"),
    };
    
     //rewrite for domains
     const url = req.nextUrl
     const searchParams = url.searchParams.toString()
     let hostname = req.headers
 
     const pathWithSearchParams = `${url.pathname}${
       searchParams.length > 0 ? `?${searchParams}` : ''
     }`
    //if subdomain exists
    const customSubDomain = hostname
      .get('host')
      ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
      .filter(Boolean)[0]

    if (customSubDomain) {
      return NextResponse.rewrite(
        new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
      )
    }
    if (auth.userId) {
      return NextResponse.next();
    }
    
    if (
      url.pathname.startsWith('/agency') ||
      url.pathname.startsWith('/subaccount')
    ) {
      return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url))
    }
    // Redirect non-logged-in users to the sign-in route for other routes
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)',"/((?!api|_next/static|_next/image|.png).*)", "/agency/((?!api|_next/static|_next/image|.png).*)", "/subaccount/((?!api|_next/static|_next/image|.png).*)" ]
}
