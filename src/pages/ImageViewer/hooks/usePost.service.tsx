import { useState, useCallback, useEffect } from "react";
import { useDebounce } from 'use-debounce';

import request from '../../../utils/request';
import { API_KEY, BASE_URL } from '../../../utils/constants';

export type IPostDto = {
    id: string;
    created: string;
    user: { username: string; id: string };
    likes: number;
    mediaId: string;
    title: string;
    description: string;
}

type IqueryParams = { 
    offset : number;
    limit: number;
    query?: string;
    api_key: string;
}


export const usePostGet = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [debouncedSearchText] = useDebounce(searchText, 300);
    const [loading, setLoading] = useState<boolean>(false);
    const [content, setContent] = useState<IPostDto[]>([]);

    const [limit,setLimit] = useState<number>(20);
    const [offset, setOffset] = useState<number>(0);
    
    const [fetch, setFetch] = useState<number>(0);
    const refetch = () =>  setFetch((prev) => prev + 1);

    useEffect(() => { 
        setOffset(0);
        setContent([])
    }, [debouncedSearchText])
  
    const fetchPost = useCallback(async (searchValue : string, offset: number) => {
      setLoading(true);
      try {
        let queryParams: IqueryParams = {
          offset,
          limit,
          api_key: API_KEY,
        };
        searchValue && (queryParams['query'] = searchValue)

        const url =`${BASE_URL}/posts`;
        const { success, raw } = await request({url, method: 'GET', data: queryParams });
        if(raw.success && success) { 
            setContent(prev => [...prev, ...raw?.response?.posts]);
            setOffset((offset + 20));
        } else { 
            //Alert API Error.
        alert(raw?.response?.message ? raw?.response?.message  : 'Ooops! An error occuried');
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }, [limit]);

    useEffect(() => {
      fetchPost(debouncedSearchText, offset);
      // eslint-disable-next-line
    }, [fetchPost, fetch, debouncedSearchText]);
  
    const reset = () => {
      setSearchText('');
      setOffset(0);
      setLimit(20);
    };
  
    return {
      isLoadingPost: loading,
      postContent: content,
      searchText,
      setSearchText,
      reset,
      refetch,
    };
  };