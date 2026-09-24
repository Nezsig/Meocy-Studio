import type {
  EquipmentGroupMeta,
  PackageMeta,
  ProjectMeta,
  TestimonialMeta } from
'../types/site';

export const images = {
  studio: "/ba09e101-6a56-4900-8126-2f06336b2cb1.jpg",
  packshotBottle: "/d2da95f9-3086-41e2-bf51-fcb5a5b55a14.jpg",

  packshotObject: "/89d9f10f-8560-43f7-b7e1-be63bd471714.jpg"

};

export const studioContact = {
  email: 'studio@meocy.com',
  phone: '+39 02 1234 5678',
  phoneHref: 'tel:+390212345678',
  instagram: '@meocy.studio',
  address: 'Via Tortona 27, 20144 Milano',
  vat: 'P.IVA 09876543210'
};

export const projects: ProjectMeta[] = [
{
  id: 'ambra',
  client: 'Casa Ambra',
  year: '2025',
  category: 'product',
  featured: true,
  image: images.packshotBottle
},
{
  id: 'nord',
  client: 'Nord Audio',
  year: '2025',
  category: 'product',
  featured: false,
  image: images.packshotObject
},
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
{ id: 'essential', priceFrom: 690, best: false },
{ id: 'signature', priceFrom: 1480, best: true },
{ id: 'campaign', priceFrom: 3200, best: false }];


export const equipmentGroups: EquipmentGroupMeta[] = [
{ id: 'camera', items: ['Sony A6700', 'Sony FX30'] },
{ id: 'lenses', items: ['85mm f/1.4', '50mm f/1.4', '33mm f/1.4'] },
{
  id: 'lighting',
  items: [
  'Godox AD600Pro',
  'Godox AD300Pro',
  'GVM 300W',
  'GVM 150W',
  '3× Speedlight',
  '120cm Octabox',
  '80cm Octabox']

},
{ id: 'support', items: ['Photo & video tripods', 'Ronin RS Mini Pro'] },
{ id: 'aerial', items: ['DJI Mini 3 Pro'] },
{ id: 'storage', items: ['128GB V90 SD', '128GB V60 SD', '256GB SD', '8TB backup'] },
{ id: 'power', items: ['3× spare batteries', '2× 20.000mAh', 'EcoFlow 60.000mAh'] },
{ id: 'post', items: ['Mac Studio', 'ASUS PA278QV calibrated'] }];


export const testimonialMeta: TestimonialMeta[] = [
{ id: 't1', name: 'Giulia Ferrante', company: 'Casa Ambra' },
{ id: 't2', name: 'Marco Alberti', company: 'Studio Marconi' },
{ id: 't3', name: 'Elena Bassi', company: 'Trattoria Nove' }];


export const clients = [
'CASA AMBRA',
'NORD AUDIO',
'TRATTORIA NOVE',
'STUDIO MARCONI',
'VERDE MILANO',
'ATELIER SETTE'];