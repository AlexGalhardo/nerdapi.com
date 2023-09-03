import React, { useState } from "react";

export default function useFetch() {
    const [data, setData] = useState<undefined | any>(undefined);
    const [error, setError] = useState<undefined | string>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const request = React.useCallback(async (url: any, options: any): Promise<{ response: any; json: any }> => {
        let response;
        let json;
        try {
            setError(undefined);
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
}
