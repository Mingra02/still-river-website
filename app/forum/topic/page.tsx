"use client";

import Lights from "@/components/Lights";
import React, { Suspense } from "react";
import TopicPage from "@/components/TopicPage";

const Topic = () => {
  return (
    <>
      <Lights position="fixed" />
      <Suspense fallback={<div>Loading...</div>}>
        <TopicPage />
      </Suspense>
    </>
  );
};

export default Topic;
