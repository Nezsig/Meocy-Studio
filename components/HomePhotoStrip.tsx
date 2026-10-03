import Image from 'next/image';
import { workItems } from '../data/work';

/**
 * Homepage editorial strip: real MEOCY photographs, alternating Milan street work and studio/fashion work.
 * Lazy-loaded (below the first screen); fixed 3:4 frames so nothing shifts while loading.
 */
const STRIP_IDS = ['fashion-17', 'portrait-13', 'fashion-02', 'fashion-20'];
const photos = STRIP_IDS.map((id) => workItems.find((w) => w.id === id)!).filter(Boolean);

export function HomePhotoStrip() {
  return (
    <ul className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4 sm:gap-4">
      {photos.map((p) => (
        <li key={p.id} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-mist">
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes="(min-width: 1240px) 282px, (min-width: 640px) calc((100vw - 112px) / 4), calc((100vw - 52px) / 2)"
            className="object-cover object-[50%_25%]"
          />
        </li>
      ))}
    </ul>
  );
}
