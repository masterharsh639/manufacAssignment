import { useState, useEffect } from 'react';

type ApiResponse<T> = {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
};

function useFetch<T>(url: string): ApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData: T = await response.json();
                setData(jsonData);
                setIsLoading(false);
                setError(null);
            } catch (error: any) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading, error };
}

export default useFetch;
