import { useState, useCallback, useEffect } from 'react';

import request from '../../../utils/request';
import { API_KEY, BASE_URL } from '../../../utils/constants';

export type IMediaDto = {
    id: string,
    type: string,
    statistics: {
      views: 0,
      downloads: 0,
      likes: 0,
      created: 0
    },
    urls: {
      raw: string,
      full: string,
      regular: string,
      small: string
    },
    owner: {
      id: string,
      username: string,
    }
};

export const useMediaGet = (mediaId?: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<IMediaDto | null>(null);
  const [error, setError ] = useState<boolean>(false);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    setError(false)
    try {
      const url = `${BASE_URL}/medias/${mediaId}`;
      const { raw, success } = await request({ url, method: 'GET', data: { api_key: API_KEY } });

      if (raw.success && success) {
        setContent(raw?.response?.media);
      } else {
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }, [mediaId]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  return {
    isLoadingMedia: loading,
    mediaContent: content,
    mediaError : error,
  };
};
