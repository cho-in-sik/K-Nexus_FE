'use client';

import { useEffect, useState } from 'react';

export function useToken() {
  // const [token, setToken] = useState<string | null>(null);
  const storedToken = localStorage.getItem('token');
  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   setToken(storedToken);
  // }, []);

  return storedToken;
}
