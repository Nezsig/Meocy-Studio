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
  { id: "fashion-01", type: "photo", category: "fashion", src: "/work/fashion-01.jpg", width: 1129, height: 1600, alt: "Model in fashion editorial portrait, Milan studio lighting" },
  { id: "portrait-01", type: "photo", category: "portrait", src: "/work/portrait-01.jpg", width: 935, height: 568, alt: "Professional couple portrait in Milan, natural light" },
  { id: "fashion-02", type: "photo", category: "fashion", src: "/work/fashion-02.jpg", width: 1137, height: 1600, alt: "Fashion model photography in professional studio" },
  { id: "portrait-02", type: "photo", category: "portrait", src: "/work/portrait-02.jpg", width: 933, height: 568, alt: "Outdoor portrait photography in Milan" },
  { id: "fashion-03", type: "photo", category: "fashion", src: "/work/fashion-03.jpg", width: 1131, height: 1600, alt: "Editorial fashion photograph with professional styling" },
  { id: "portrait-03", type: "photo", category: "portrait", src: "/work/portrait-03.jpg", width: 573, height: 810, alt: "Personal brand portrait photography in Milan" },
  { id: "fashion-04", type: "photo", category: "fashion", src: "/work/fashion-04.jpg", width: 1130, height: 1600, alt: "Fashion editorial with directional lighting" },
  { id: "portrait-04", type: "photo", category: "portrait", src: "/work/portrait-04.jpg", width: 934, height: 566, alt: "Professional headshot photography for creatives" },
  { id: "fashion-05", type: "photo", category: "fashion", src: "/work/fashion-05.jpg", width: 1130, height: 1600, alt: "Fashion model in studio with softbox lighting" },
  { id: "portrait-05", type: "photo", category: "portrait", src: "/work/portrait-05.jpg", width: 1009, height: 853, alt: "Lifestyle couple photography in Milan setting" },
  { id: "fashion-06", type: "photo", category: "fashion", src: "/work/fashion-06.jpg", width: 1007, height: 857, alt: "Fashion editorial photograph with dramatic shadows" },
  { id: "portrait-06", type: "photo", category: "portrait", src: "/work/portrait-06.jpg", width: 1006, height: 851, alt: "Professional portrait with creative lighting setup" },
  { id: "fashion-07", type: "photo", category: "fashion", src: "/work/fashion-07.jpg", width: 1250, height: 1064, alt: "Widescreen fashion photograph of model in studio" },
  { id: "portrait-07", type: "photo", category: "portrait", src: "/work/portrait-07.jpg", width: 1346, height: 1145, alt: "Creative portrait photography with artistic composition" },
  { id: "city-01", type: "photo", category: "city", src: "/work/city-01.jpg", width: 1600, height: 597, alt: "Milan city night photography, urban streetscape" },
  { id: "fashion-08", type: "photo", category: "fashion", src: "/work/fashion-08.jpg", width: 1358, height: 1147, alt: "Fashion photography with professional color grading" },
  { id: "portrait-08", type: "photo", category: "portrait", src: "/work/portrait-08.jpg", width: 1349, height: 1066, alt: "Editorial portrait photography with styled hair and makeup" },
  { id: "fashion-09", type: "photo", category: "fashion", src: "/work/fashion-09.jpg", width: 1009, height: 855, alt: "Fashion model close-up with skin tone and texture detail" },
  { id: "portrait-09", type: "photo", category: "portrait", src: "/work/portrait-09.jpg", width: 1356, height: 1060, alt: "Professional headshot with polished studio lighting" },
  { id: "fashion-10", type: "photo", category: "fashion", src: "/work/fashion-10.jpg", width: 998, height: 1496, alt: "Full-length fashion editorial portrait" },
  { id: "portrait-10", type: "photo", category: "portrait", src: "/work/portrait-10.jpg", width: 1278, height: 1060, alt: "Group portrait photography for professional team" },
  { id: "city-02", type: "photo", category: "city", src: "/work/city-02.jpg", width: 1600, height: 597, alt: "Milan evening cityscape, architectural lighting" },
  { id: "fashion-11", type: "photo", category: "fashion", src: "/work/fashion-11.jpg", width: 1600, height: 914, alt: "Wide-angle fashion photograph with environmental context" },
  { id: "portrait-11", type: "photo", category: "portrait", src: "/work/portrait-11.jpg", width: 1000, height: 1501, alt: "Full-body portrait with natural posing and background" },
  { id: "fashion-12", type: "photo", category: "fashion", src: "/work/fashion-12.jpg", width: 1600, height: 913, alt: "Fashion campaign photograph with lifestyle elements" },
  { id: "portrait-12", type: "photo", category: "portrait", src: "/work/portrait-12.jpg", width: 865, height: 1220, alt: "Personal brand photography with authentic expression" },
  { id: "fashion-13", type: "photo", category: "fashion", src: "/work/fashion-13.jpg", width: 1600, height: 780, alt: "Widescreen fashion photography with minimal aesthetic" },
  { id: "portrait-13", type: "photo", category: "portrait", src: "/work/portrait-13.jpg", width: 1059, height: 1600, alt: "Fashion model portrait with editorial styling" },
  { id: "city-03", type: "photo", category: "city", src: "/work/city-03.jpg", width: 1600, height: 597, alt: "Milan street photography at night, urban landscape" },
  { id: "fashion-14", type: "photo", category: "fashion", src: "/work/fashion-14.jpg", width: 1296, height: 864, alt: "Fashion photograph with studio backdrop and professional lighting" },
  { id: "portrait-14", type: "photo", category: "portrait", src: "/work/portrait-14.jpg", width: 1060, height: 1600, alt: "Editorial portrait with fashion editorial treatment" },
  { id: "fashion-15", type: "photo", category: "fashion", src: "/work/fashion-15.jpg", width: 1600, height: 1067, alt: "Fashion editorial with refined color palette" },
  { id: "fashion-16", type: "photo", category: "fashion", src: "/work/fashion-16.jpg", width: 1600, height: 1067, alt: "Fashion photograph with professional post-processing" },
  { id: "fashion-17", type: "photo", category: "fashion", src: "/work/fashion-17.jpg", width: 1128, height: 1600, alt: "Model portrait with fashion styling and professional makeup" },
  { id: "fashion-18", type: "photo", category: "fashion", src: "/work/fashion-18.jpg", width: 1129, height: 1600, alt: "Fashion editorial with studio lighting and composition" },
  { id: "city-04", type: "photo", category: "city", src: "/work/city-04.jpg", width: 1600, height: 597, alt: "Milan cityscape photography, architectural details at night" },
  { id: "fashion-19", type: "photo", category: "fashion", src: "/work/fashion-19.jpg", width: 1127, height: 1600, alt: "Fashion model photograph with studio setup" },
  { id: "fashion-20", type: "photo", category: "fashion", src: "/work/fashion-20.jpg", width: 1064, height: 1600, alt: "Portrait-oriented fashion photography with professional retouching" },
];
