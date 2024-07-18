import React from 'react';

import Lottie from "lottie-react";

import LoadingJson from "../../json/loading.json";

export function LoadingScreen() {
  return (
    <>
      <div style={{ zIndex: 99999999999 }} className="absolute top-0 left-0 bg-black h-screen w-screen z-50 text-center text-white">
        <div className="h-screen w-screen flex items-center justify-center">
          <Lottie animationData={LoadingJson} />;
        </div>
      </div>
    </>
  );
}
