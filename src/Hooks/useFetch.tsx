// import React from "react";

// function useFetch<T>(url: RequestInfo | URL, options?: RequestInit) {
// 	const [data, setData] = React.useState<T | null>(null);
// 	const [loading, setLoading] = React.useState(false);
// 	const [error, setError] = React.useState<string | null>(null);

// 	const optionsRef = React.useRef(options);
// 	optionsRef.current = options;

// 	React.useEffect(() => {
// 		const controller = new AbortController();
// 		const { signal } = controller;

// 		const fetchData = async () => {
// 			setLoading(true);
// 			setData(null);
// 			try {
// 				const response = await fetch(url, {
// 					signal,
// 					...optionsRef.current,
// 				});
// 				if (!response.ok) throw new Error(`Error: ${response.status}`);
// 				const json = (await response.json()) as T;
// 				if (!signal.aborted) setData(json);
// 			} catch (error) {
// 				if (!signal.aborted && error instanceof Error) setError(error.message);
// 			} finally {
// 				if (!signal.aborted) setLoading(false);
// 			}
// 		};
// 		fetchData();

// 		return () => {
// 			controller.abort();
// 		};
// 	}, [url]);

// 	return { data, loading, error };
// }

// export default useFetch;


import React from 'react';

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(async (url: any, options: any) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (response.ok === false) throw new Error(json.message);
    } catch (err: any) {
      json = null;
      setError(err.message);
    } finally {
      setData(json.data);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
