"use client"
import React, { useEffect } from 'react';

function usePlugSDKInitializer() {
  useEffect(() => {
    const initializePlugSDK = () => {
      const plugSDK = (window as any).plugSDK;

      if (plugSDK) {
        plugSDK.init({
          app_id: 'don:core:dvrv-us-1:devo/pGh0cwwI:plug_setting/1',
        });
      } else {
        console.error('plugSDK is not defined. Make sure SDK is initialized.');
      }
    };

    initializePlugSDK();
  }, []);
}

export const DevProvider = ({ children }) => {
  // Call the custom hook for SDK initialization
  usePlugSDKInitializer();

  return (
    <div>
      {children}
    </div>
  );
};
