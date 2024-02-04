import * as React from "react"
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";


interface LandingLayoutProps {
  children: React.ReactNode
}

export default async function LandingLayout({
  children,
}: LandingLayoutProps): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
if (!session) {
  return <>non logged in user</>
} else {   
  return    <div className="flex-grow flex h-screen relative flex-col md:flex-row ">


   <main className="flex p-8 w-full flex-1 flex-col ">
    {children}
  </main>
</div>
}}