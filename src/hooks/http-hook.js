import { useState, useCallback, useRef, useEffect } from 'react';
import axios from "axios"

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setIsLoading(true);

            const abortCtrl = new AbortController();
            activeHttpRequests.current.push(abortCtrl);

            if (body && !headers['Content-Type']) {
                headers['Content-Type'] = 'application/json';
            }

            const config = {
                method,
                url,
                data: body,
                headers,
                signal: abortCtrl.signal,
                withCredentials: true,
            };

            try {
                const response = await axios(config);
                
                activeHttpRequests.current = activeHttpRequests.current.filter(ctrl => ctrl !== abortCtrl);

                setIsLoading(false);
                return response.data;
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.warn("Request canceled:", err.message);
                } else {
                    console.error("Error:", err);
                    setError(err.response?.data?.message || err.message || "Something went wrong!");
                }

                setIsLoading(false);
                throw err;
            }
        },
        []
    );

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };
};
