"use client";

import Lights from "@/components/Lights";
import NewThread from "@/components/NewThread";
import React, { Suspense } from "react";

const Topic = () => {
  return (
    <>
      <Lights position="fixed" />
      <Suspense fallback={<div>Loading...</div>}>
        <NewThread />
      </Suspense>
    </>
  );
};

export default Topic;
