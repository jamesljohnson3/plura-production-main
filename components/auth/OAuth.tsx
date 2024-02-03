"use client"

import { useSignIn, useSignUp } from "@clerk/nextjs"
import { type OAuthStrategy } from "@clerk/nextjs/dist/types/server"
import { Icons } from "./Icons"

interface OAuthProps {
  className?: string
}

export function GithubLogIn({ className }: OAuthProps) {
  const { signIn, isLoaded } = useSignIn()

  if (!isLoaded) return null

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    })
  }

  return (
    <button
      
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={() => signInWith("oauth_github")}
    >
      <Icons.github className="h-4 w-4" />
      <span>Continue with Github</span>
    </button>
  )
}

export function GoogleLogIn({ className }: OAuthProps) {
  const { signIn, isLoaded } = useSignIn()

  if (!isLoaded) return null

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    })
  }

  return (
     <></>
  )
}

export function GithubSignup({ className }: OAuthProps) {
  const { signUp, isLoaded } = useSignUp()

  if (!isLoaded) return null

  const signUpWith = (strategy: OAuthStrategy) => {
    return signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    })
  }

  return (
    <button
   
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={() => signUpWith("oauth_github")}
    >
      <Icons.github className="h-4 w-4" />
      <span>Continue with Github</span>
    </button>
  )
}

export function GoogleSignup({ className }: OAuthProps) {
  const { signUp, isLoaded } = useSignUp()

  if (!isLoaded) return null

  const signUpWith = (strategy: OAuthStrategy) => {
    return signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    })
  }

  return (
   <></>
  )
}
