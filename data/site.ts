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
  whatsappHref: 'https://wa.me/393791051000',
  instagramHref: 'https://www.instagram.com/meocystudio/'
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
  category: 'food',
  featured: false
}];


export const packageMeta: PackageMeta[] = [
{ id: 'silver', priceFrom: 500, best: false },
{ id: 'gold', priceFrom: 750, best: true },
{ id: 'platinum', priceFrom: 1000, best: false }];


export const equipmentGroups: EquipmentGroupMeta[] = [
{ id: 'camerasLenses', items: ['Sony Alpha 7 IV', '33mm f/1.2', '50mm f/1.4', '85mm f/1.4'] },
{ id: 'lightingPhoto', items: ['Godox AD600Pro', 'Godox AD300Pro'] },
{ id: 'lightingVideo', items: ['GVM 300W LED', '150W LED light'] },
{ id: 'supportGrip', items: ['Professional tripods', 'Light stands', '120cm softbox', '85cm softbox'] }];


export const testimonialMeta: TestimonialMeta[] = [];

export const clients: string[] = [];