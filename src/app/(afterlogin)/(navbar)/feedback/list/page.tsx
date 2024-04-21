import { serverFeedbackApi } from '@/services/server/feedback';
import React from 'react';

const page = async () => {
  const res = await serverFeedbackApi.getFeedbackList({ pageParam: 0 });
  // console.log(await res.json());
  return <h1>hi</h1>;
};

export default page;
