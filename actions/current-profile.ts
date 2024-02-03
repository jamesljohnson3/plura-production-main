"use server";

import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface Images {
  data: {
    feed: {
      id: number;
      name: string;
      artist: string;
      cover: string;
    };
    id: number;
  }[];
}

class UserNotFoundErr extends Error {}

export async function getUserData(userId: string) {
  try {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      // Include any additional fields you want to retrieve
      include: {
        // Add necessary associations
        mylikes: true,
        // Include other related tables as needed
      },
    });

    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
      select: { email: true },
    });
    if (user) {
      return res.status(200).json({ exists: true });
    }
    return res.status(200).json({ exists: false });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}


export async function currentProfile(prismaUser: any) {
  // Make Xata API call to record activated token
  const response = await fetch(
    'https://unlimit-potential-lho3ne.us-east-1.xata.sh/db/now2:main/tables/VerificationToken/data?columns=id',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xau_AQ7SbTkHra2xDHXi0VXltyTsdneNyDhR',
      },
      body: JSON.stringify({
        api_key: 'test-upeta-2',
        domain_id: prismaUser.id,
      }),
    }
  );
  const data = await response.json();
  console.log('Xata API response:', data);
}


export async function freeTrial(session) {
  try {
    const user = session?.user;
    if (!user) {
      throw new UserNotFoundErr();
    }

    const apiUrl = "https://myapi.com";  // Replace with your actual API endpoint

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed, e.g., authorization header
        // Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        userId: user.id,
        // Add more properties as needed
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch store data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching store data:", error.message);
    throw error; // rethrow the error to handle it outside of this function
  }
}

export async function getmyImages(): Promise<Images | null> {
  try {
    const response = await fetch('https://main-bvxea6i-wgvcdjzemdvhw.uk-1.platformsh.site/items/dashtest3',{ cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Failed to fetch home data: ${response.statusText}`);
    }

    const data: Images = await response.json();
    console.log('madeForYouAlbums:', data);
    return data || null;

  } catch (error) {
    console.error('Error fetching home data:', error);
    return null;
  }
}
