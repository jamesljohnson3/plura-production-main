
import { authMiddleware, clerkClient, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server'

export default authMiddleware({
  // Specify routes that should be accessible without authentication

});