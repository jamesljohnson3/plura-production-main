import { db } from '@/lib/db';
import React from 'react';
import BlurPage from '@/components/global/blur-page'

type Props = {
  params: { subaccountId: string };
  searchParams: {
    code: string;
  };
};

const Myautomations = async ({ params, searchParams }: Props) => {
  const automation = await db.automation.findUnique({
    where: {
      id: params.subaccountId,
    },
  });

  return (
    <>    <BlurPage>
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
      {automation ? (
        <div key={automation.id}>
          <p>ID: {automation.id}</p>
          <p>Name: {automation.name}</p>
          {/* Add other fields as needed */}
        </div>
      ) : (
        <p>No automation found</p>
      )}
      </div>

  </div>
</BlurPage>
    </>
  );
};

export default Myautomations;
