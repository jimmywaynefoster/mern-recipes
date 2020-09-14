import React, { useState, useEffect } from "react";
import { isUserAuthenticated } from "./api-auth.js";

export default function useAuthentication(trigger) {
  const [user, setUser] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    isUserAuthenticated(signal).then((userData) => {
      setUser(userData);
      setFetched(true);
    });
    return () => {
      abortController.abort();
    };
  }, [trigger]);

  return [user, fetched];
}
