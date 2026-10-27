import { useEffect, useState } from 'react';
import type { Photo } from '../components/PhotoCard';

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPhotos() {
      try {
        const response = await fetch('https://picsum.photos/v2/list?limit=30', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch photos.');
        }

        const data: Photo[] = await response.json();

        setPhotos(data);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        setError(err instanceof Error ? err.message : 'Something went wrong.');
      } finally {
        // Only set loading to false if the request wasn't aborted
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => controller.abort();
  }, []);

  return { photos, loading, error };
}
