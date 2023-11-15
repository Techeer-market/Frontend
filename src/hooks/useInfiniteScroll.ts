import React, { useEffect, useState } from 'react';
import { throttle } from 'lodash';

interface InfiniteScrollProps {
  fetchCallback: () => Promise<void>;
}

const useInfiniteScroll = ({ fetchCallback }: InfiniteScrollProps) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // throttle: 0.3초에 한번씩만 실행되도록 설정
  const handleScroll = throttle(async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setIsFetching(true);

      try {
        await fetchCallback();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsFetching(false);
      }
    }
  }, 300);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return isFetching;
};

export default useInfiniteScroll;
