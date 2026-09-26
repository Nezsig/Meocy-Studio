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
{ id: 'camerasLenses', items: ['Sony FX30', 'Sony a6700', '33mm f/1.2', '85mm f/1.4', '50mm f/1.4'] },
{ id: 'lightingPhoto', items: ['Godox AD600Pro', 'Godox AD300Pro'] },
{ id: 'lightingVideo', items: ['GVM 300W LED', '150W LED light'] },
{ id: 'supportGrip', items: ['Tripods', 'Light stands', '120cm & 85cm softboxes'] }];


export const testimonialMeta: TestimonialMeta[] = [];

export const clients: string[] = [];