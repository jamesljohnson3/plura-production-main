import { db } from '@/lib/db';
import React from 'react';

type Props = {
  params: { subaccountId: string };
  searchParams: {
    code: string;
  };
};

const SubaccountPageId = async ({ params, searchParams }: Props) => {
  const automation = await db.automation.findUnique({
    where: {
      id: params.subaccountId,
    },
  });

  return (
    <>
      {automation ? (
        <div key={automation.id}>
          <p>ID: {automation.id}</p>
          <p>Name: {automation.name}</p>
          {/* Add other fields as needed */}
        </div>
      ) : (
        <p>No automation found</p>
      )}
    </>
  );
};

export default SubaccountPageId;
