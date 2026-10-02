// Crew schema for /work-with-meocy form
import { en } from '../data/locales/en';

export type CrewRole = 'photographer' | 'videographer' | 'lighting_assistant' | 'production_assistant' | 'other';

export interface CrewField {
  key: string;
  label: string;
  emailLabel: string;
  kind: 'name' | 'email' | 'text' | 'message' | 'select' | 'check';
  required?: boolean;
  autoComplete?: string;
}

export const LIMITS = { nameMin: 2, nameMax: 100, text: 500, message: 2000, email: 254 };
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CREW_ROLES: CrewRole[] = ['photographer', 'videographer', 'lighting_assistant', 'production_assistant', 'other'];

export const crewRoleLabels: Record<CrewRole, string> = {
  photographer: 'Photographer',
  videographer: 'Videographer',
  lighting_assistant: 'Lighting Assistant',
  production_assistant: 'Production Assistant',
  other: 'Other Creative'
};

export const experienceOptions = ['Starting out', '1–2 years', '3–5 years', '5+ years'];

export const CREW_FIELDS: CrewField[] = [
  { key: 'name', label: 'Name', emailLabel: 'Name', kind: 'name', required: true, autoComplete: 'name' },
  { key: 'email', label: 'Email', emailLabel: 'Email', kind: 'email', required: true, autoComplete: 'email' },
  { key: 'role', label: 'Role', emailLabel: 'Role', kind: 'select', required: true },
  { key: 'city', label: 'City', emailLabel: 'City', kind: 'text', required: true, autoComplete: 'address-level2' },
  { key: 'portfolio', label: 'Portfolio / website / Instagram', emailLabel: 'Portfolio / website / Instagram', kind: 'text', required: true, autoComplete: 'url' },
  { key: 'phone', label: 'Phone / WhatsApp', emailLabel: 'Phone / WhatsApp', kind: 'text', autoComplete: 'tel' },
  { key: 'experience', label: 'Experience', emailLabel: 'Experience', kind: 'select' },
  { key: 'equipment', label: 'Equipment / relevant skills', emailLabel: 'Equipment / relevant skills', kind: 'text', autoComplete: 'off' },
  { key: 'availability', label: 'Availability', emailLabel: 'Availability', kind: 'text', autoComplete: 'off' },
  { key: 'languages', label: 'Languages spoken', emailLabel: 'Languages spoken', kind: 'text', autoComplete: 'off' },
  { key: 'message', label: 'Message', emailLabel: 'Message', kind: 'message' },
  { key: 'consent', label: 'Privacy consent', emailLabel: 'Privacy consent', kind: 'check', required: true },
];
