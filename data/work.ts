export type WorkCategory = 'fashion' | 'portrait' | 'city' | 'commercial' | 'product' | 'food' | 'video';

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

export const workItems: WorkItem[] = [
  { id: "fashion-01", type: "photo", category: "fashion", src: "/work/fashion-01.jpg", width: 1129, height: 1600, alt: "MEOCY fashion photography" },
  { id: "portrait-01", type: "photo", category: "portrait", src: "/work/portrait-01.jpg", width: 935, height: 568, alt: "MEOCY portrait photography" },
  { id: "fashion-02", type: "photo", category: "fashion", src: "/work/fashion-02.jpg", width: 1137, height: 1600, alt: "MEOCY fashion photography" },
  { id: "portrait-02", type: "photo", category: "portrait", src: "/work/portrait-02.jpg", width: 933, height: 568, alt: "MEOCY portrait photography" },
  { id: "fashion-03", type: "photo", category: "fashion", src: "/work/fashion-03.jpg", width: 1131, height: 1600, alt: "MEOCY fashion photography" },
  { id: "portrait-03", type: "photo", category: "portrait", src: "/work/portrait-03.jpg", width: 573, height: 810, alt: "MEOCY portrait photography" },
  { id: "fashion-04", type: "photo", category: "fashion", src: "/work/fashion-04.jpg", width: 1130, height: 1600, alt: "MEOCY fashion photography" },
  { id: "portrait-04", type: "photo", category: "portrait", src: "/work/portrait-04.jpg", width: 934, height: 566, alt: "MEOCY portrait photography" },
  { id: "fashion-05", type: "photo", category: "fashion", src: "/work/fashion-05.jpg", width: 1130, height: 1600, alt: "MEOCY fashion photography" },
  { id: "portrait-05", type: "photo", category: "portrait", src: "/work/portrait-05.jpg", width: 1009, height: 853, alt: "MEOCY portrait photography" },
  { id: "fashion-06", type: "photo", category: "fashion", src: "/work/fashion-06.jpg", width: 1007, height: 857, alt: "MEOCY fashion photography" },
  { id: "portrait-06", type: "photo", category: "portrait", src: "/work/portrait-06.jpg", width: 1006, height: 851, alt: "MEOCY portrait photography" },
  { id: "fashion-07", type: "photo", category: "fashion", src: "/work/fashion-07.jpg", width: 1250, height: 1064, alt: "MEOCY fashion photography" },
  { id: "portrait-07", type: "photo", category: "portrait", src: "/work/portrait-07.jpg", width: 1346, height: 1145, alt: "MEOCY portrait photography" },
  { id: "city-01", type: "photo", category: "city", src: "/work/city-01.jpg", width: 1600, height: 597, alt: "MEOCY city night photography" },
  { id: "fashion-08", type: "photo", category: "fashion", src: "/work/fashion-08.jpg", width: 1358, height: 1147, alt: "MEOCY fashion photography" },
  { id: "portrait-08", type: "photo", category: "portrait", src: "/work/portrait-08.jpg", width: 1349, height: 1066, alt: "MEOCY portrait photography" },
  { id: "fashion-09", type: "photo", category: "fashion", src: "/work/fashion-09.jpg", width: 1009, height: 855, alt: "MEOCY fashion photography" },
  { id: "portrait-09", type: "photo", category: "portrait", src: "/work/portrait-09.jpg", width: 1356, height: 1060, alt: "MEOCY portrait photography" },
  { id: "fashion-10", type: "photo", category: "fashion", src: "/work/fashion-10.jpg", width: 998, height: 1496, alt: "MEOCY fashion photography" },
  { id: "portrait-10", type: "photo", category: "portrait", src: "/work/portrait-10.jpg", width: 1278, height: 1060, alt: "MEOCY portrait photography" },
  { id: "city-02", type: "photo", category: "city", src: "/work/city-02.jpg", width: 1600, height: 597, alt: "MEOCY city night photography" },
  { id: "fashion-11", type: "photo", category: "fashion", src: "/work/fashion-11.jpg", width: 1600, height: 914, alt: "MEOCY fashion photography" },
  { id: "portrait-11", type: "photo", category: "portrait", src: "/work/portrait-11.jpg", width: 1000, height: 1501, alt: "MEOCY portrait photography" },
  { id: "fashion-12", type: "photo", category: "fashion", src: "/work/fashion-12.jpg", width: 1600, height: 913, alt: "MEOCY fashion photography" },
  { id: "portrait-12", type: "photo", category: "portrait", src: "/work/portrait-12.jpg", width: 865, height: 1220, alt: "MEOCY portrait photography" },
  { id: "fashion-13", type: "photo", category: "fashion", src: "/work/fashion-13.jpg", width: 1600, height: 780, alt: "MEOCY fashion photography" },
  { id: "portrait-13", type: "photo", category: "portrait", src: "/work/portrait-13.jpg", width: 1059, height: 1600, alt: "MEOCY portrait photography" },
  { id: "city-03", type: "photo", category: "city", src: "/work/city-03.jpg", width: 1600, height: 597, alt: "MEOCY city night photography" },
  { id: "fashion-14", type: "photo", category: "fashion", src: "/work/fashion-14.jpg", width: 1296, height: 864, alt: "MEOCY fashion photography" },
  { id: "portrait-14", type: "photo", category: "portrait", src: "/work/portrait-14.jpg", width: 1060, height: 1600, alt: "MEOCY portrait photography" },
  { id: "fashion-15", type: "photo", category: "fashion", src: "/work/fashion-15.jpg", width: 1600, height: 1067, alt: "MEOCY fashion photography" },
  { id: "fashion-16", type: "photo", category: "fashion", src: "/work/fashion-16.jpg", width: 1600, height: 1067, alt: "MEOCY fashion photography" },
  { id: "fashion-17", type: "photo", category: "fashion", src: "/work/fashion-17.jpg", width: 1128, height: 1600, alt: "MEOCY fashion photography" },
  { id: "fashion-18", type: "photo", category: "fashion", src: "/work/fashion-18.jpg", width: 1129, height: 1600, alt: "MEOCY fashion photography" },
  { id: "city-04", type: "photo", category: "city", src: "/work/city-04.jpg", width: 1600, height: 597, alt: "MEOCY city night photography" },
  { id: "fashion-19", type: "photo", category: "fashion", src: "/work/fashion-19.jpg", width: 1127, height: 1600, alt: "MEOCY fashion photography" },
  { id: "fashion-20", type: "photo", category: "fashion", src: "/work/fashion-20.jpg", width: 1064, height: 1600, alt: "MEOCY fashion photography" },
];
