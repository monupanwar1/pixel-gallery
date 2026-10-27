import { Heart } from 'lucide-react';

export interface Photo {
  id: string;
  author: string;
  download_url: string;
}

interface PhotoCardProps {
  photo: Photo;
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
}

export default function PhotoCard({
  photo,
  isFavourite,
  onToggleFavourite,
}: PhotoCardProps) {
  return (
    <article className='overflow-hidden rounded-xl border border-slate-200 bg-white hover:shadow-md'>
      <div className='relative aspect-4/3 bg-slate-100'>
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading='lazy'
          className='h-full w-full object-cover'
        />

        <button
          type='button'
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? 'Remove favourite' : 'Add favourite'}
          aria-pressed={isFavourite}
          className='absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm'
        >
          <Heart
            size={20}
            fill={isFavourite ? 'currentColor' : 'none'}
            className={isFavourite ? 'text-rose-500' : 'text-slate-600'}
            aria-hidden='true'
          />
        </button>
      </div>

      <div className='p-4'>
        <h2 className='truncate text-sm font-semibold text-slate-900'>
          {photo.author}
        </h2>
      </div>
    </article>
  );
}
