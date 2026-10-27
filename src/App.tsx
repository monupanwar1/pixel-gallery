import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';

import PhotoCard from './components/PhotoCard';
import useFetchPhotos from './hooks/useFetchPhotos';
import { favouriteReducer } from './reducers/favouriteReducer';

const STORAGE_KEY = 'pixel-gallery-favourites';

function getInitialFavourites(): string[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [search, setSearch] = useState('');

  const [favourites, dispatch] = useReducer(
    favouriteReducer,
    undefined,
    getInitialFavourites,
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleToggleFavourite = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase();

    return photos.filter((photo) => photo.author.toLowerCase().includes(query));
  }, [photos, search]);

  const favouriteIds = useMemo(() => new Set(favourites), [favourites]);

  return (
    <main className='min-h-screen bg-slate-50 text-slate-900'>
      <div className='mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10'>
        <header className='flex items-center justify-between border-b border-slate-200 pb-5'>
          <h1 className='text-xl font-bold tracking-tight'>
            Pixel<span className='text-violet-600'>Gallery</span>
          </h1>
          <p className='text-sm text-slate-500'>{filteredPhotos.length} photos</p>
        </header>

        <section className='py-10 sm:py-14'>
          <p className='mb-3 text-sm font-semibold uppercase tracking-widest text-violet-600'>
            A little inspiration
          </p>
          <h2 className='text-3xl font-bold tracking-tight sm:text-5xl'>
            Discover beautiful photos.
          </h2>
          <p className='mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base'>
            Explore photography from creators around the world.
          </p>
        </section>

        <section>
          <label className='mb-7 block'>
            <span className='sr-only'>Search photos by author</span>
            <input
              type='search'
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder='Search by author name...'
              className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10'
            />
          </label>

          {loading && (
            <div
              className='flex min-h-64 flex-col items-center justify-center gap-4'
              role='status'
            >
              <div className='h-10 w-10 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600' />
              <p className='text-sm text-slate-500'>Loading photos...</p>
            </div>
          )}

          {!loading && error && (
            <p
              className='rounded-xl bg-rose-50 p-6 text-center text-sm text-rose-700'
              role='alert'
            >
              {error}
            </p>
          )}

          {!loading &&
            !error &&
            (filteredPhotos.length > 0 ? (
              <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
                {filteredPhotos.map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    isFavourite={favouriteIds.has(photo.id)}
                    onToggleFavourite={handleToggleFavourite}
                  />
                ))}
              </div>
            ) : (
              <p className='py-16 text-center text-sm text-slate-500'>
                No photos found. Try another author name.
              </p>
            ))}
        </section>

        <footer className='mt-14 border-t border-slate-200 py-6 text-center text-xs text-slate-400'>
          PixelGallery
        </footer>
      </div>
    </main>
  );
}
