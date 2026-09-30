export type WorkCategory = 'fashion' | 'portrait' | 'commercial' | 'product' | 'food' | 'video';

export interface WorkItem {
  id: string;
  type: 'photo' | 'video';
  category: WorkCategory;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  videoUrl?: string;
}

// To add an item, put the image in /public/work/ and append an entry, e.g.:
//   { id: 'fashion-01', type: 'photo', category: 'fashion', src: '/work/fashion-01.jpg',
//     width: 1600, height: 2000, alt: 'Model in a linen suit, Milan street' },
// For type 'video', `src` is the poster image and `videoUrl` is the Instagram/YouTube link:
//   { id: 'reel-01', type: 'video', category: 'video', src: '/work/reel-01-poster.jpg',
//     width: 1080, height: 1920, alt: 'Restaurant reel', videoUrl: 'https://www.instagram.com/reel/...' },
export const workItems: WorkItem[] = [];
