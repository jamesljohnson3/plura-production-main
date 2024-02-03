import { Database } from '@/types_db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { currentUser } from "@clerk/nextjs";

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies })
);
 

export async function getSession() {
  try {
    const user = await currentUser();
    return user;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getUserDetails(userId) {
  try {
    const { data: userDetails } = await createServerSupabaseClient()
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    return userDetails;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getSubscription(userId) {
  try {
    const { data: subscription } = await createServerSupabaseClient()
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .eq('user_id', userId)
      .in('status', ['trialing', 'active'])
      .maybeSingle()
      .throwOnError();

    return subscription;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}


export const getActiveProductsWithPrices = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    console.log(error.message);
  }
  return data ?? [];
};