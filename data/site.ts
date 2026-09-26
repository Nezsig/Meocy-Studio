import type {
  EquipmentGroupMeta,
  PackageMeta,
  ProjectMeta,
  TestimonialMeta } from
'../types/site';

export const images = {
  studio: "/about-tripod.jpg"
};

export const studioContact = {
  email: 'hello@meocy.com',
  phone: '+39 379 105 1000',
  phoneHref: 'tel:+393791051000',
  instagram: '@chamila.eu',
  address: 'Viale Renato Serra 14, 20148 Milano'
};

export const projects: ProjectMeta[] = [
{
  id: 'marconi',
  client: 'Studio Marconi',
  year: '2024',
  category: 'fashion',
  featured: false
},
{
  id: 'nove',
  client: 'Trattoria Nove',
  year: '2024',
  category: 'restaurant',
  featured: false
}];


export const packageMeta: PackageMeta[] = [
{ id: 'silver', priceFrom: 500, best: false },
{ id: 'gold', priceFrom: 750, best: true },
{ id: 'platinum', priceFrom: 1000, best: false }];


export const equipmentGroups: EquipmentGroupMeta[] = [
{ id: 'camera', items: ['Sony A6700', 'Sony FX30'] },
{ id: 'lenses', items: ['85mm f/1.4', '50mm f/1.4', '33mm f/1.4'] },
{
  id: 'videoLight',
  items: [
  'GVM 300W',
  'GVM 150W']

},
{
  id: 'photographyLight',
  items: [
  'Godox AD600Pro',
  'Godox AD300Pro',
  '3× Speedlight',
  '120cm Octabox',
  '80cm Octabox']

},
{ id: 'support', items: ['Photo & video tripods', 'Ronin RS Mini Pro'] },
{ id: 'aerial', items: ['DJI Mini 3 Pro'] },
{ id: 'storage', items: ['128GB V90 SD', '128GB V60 SD', '256GB SD', '8TB backup'] },
{ id: 'power', items: ['3× spare batteries', '2× 20.000mAh', 'EcoFlow 60.000mAh'] },
{ id: 'post', items: ['Mac Studio', 'ASUS PA278QV calibrated'] }];


export const testimonialMeta: TestimonialMeta[] = [];

export const clients: string[] = [];