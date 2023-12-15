import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";

export type RequestMethods = "GET" | "PUT" | "POST" | "DELETE";

export const useFetch = <T = unknown>(endpoint: string, query?: any) => {
  const [data, setData] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = `https://jsearch.p.rapidapi.com/${endpoint}`;

  const headers = {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  };

  const fetchData = async <T>() => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<T>(url, {
        params: { ...query },
        headers: { ...headers },
      });
      setData(data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error.message);
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData<T>();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData<T>();
  };

  return { data, isLoading, error, refetch };
};
