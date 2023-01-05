import { useState, useCallback, useEffect } from 'react';

import request from '../../../utils/request';
import { API_KEY, BASE_URL } from '../../../utils/constants';

export type IUserDto = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_images: {
    small: string;
    medium: string;
    large: string;
  };
};

export const useUserGet = (username: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<IUserDto | null>(null);
  const [fetch, setFetch] = useState<number>(0);
  const refetch = () => setFetch((prev) => prev + 1);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const url = `${BASE_URL}/users/${username}`;
      const { success, raw } = await request({ url, method: 'GET', data: { api_key: API_KEY } });

      if (raw.success && success) {
        setContent(raw?.response?.user);
      } else {
        // Alert API Error.
        alert(raw?.response?.message ? raw?.response?.message  : 'Ooops! An error occuried');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // handleError(error);
    }
  }, [username]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser, fetch]);

  const reset = () => {
    refetch();
  };

  return {
    isLoadingUser: loading,
    userContent: content,
    refetch,
    reset
  };
};
