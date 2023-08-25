/*
 * this is a custom hook
 * The convention of custom hook is the function name should always start with use
 */

import { useState, useEffect } from "react";
const useNetworkStatus = () => {
  const [status, setStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("online", () => {
      setStatus(true);
    });

    window.addEventListener("offline", () => {
      setStatus(false);
    });
  }, []);

  return status;
};

export default useNetworkStatus;
