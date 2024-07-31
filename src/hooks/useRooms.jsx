import { useState, useCallback } from "react";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const useRooms = (url) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRooms = useCallback(async (signal) => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(url, { signal });
        await delay(500);

        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        setRooms(data.rooms);
      } catch (error) {
        if(error.name === "AbortError") {
          return
        }
        setError(error.message);
      } finally {
        setLoading(false);
      }

  }, [url]);

  return { rooms, fetchRooms, loading, error };
};

export default useRooms;
