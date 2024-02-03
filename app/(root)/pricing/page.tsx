import Pricing from '@/components/Pricing2';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server2';

export default async function PricingPage() {


  const userId= "user_2EYuQjGIJ0nDdVCGVFyVSoqvtfH";
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription({userId})
  ]);

  return (
    <Pricing
      session={session}
      user={userId}
      products={products}
      subscription={subscription}
    />
  );
}
