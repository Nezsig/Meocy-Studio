// Field schema for the /collaborate forms, shared by the page and /api/collaborate.
import { en } from '../data/locales/en';
import type { CollabTrack } from './emails';

export type { CollabTrack };
export const COLLAB_TRACKS: CollabTrack[] = ['models', 'agencies'];

type CollabDict = typeof en.collabPage;
export type CollabOptionsKey = 'experienceOptions' | 'agencyOptions' | 'lookingForOptions' | 'needOptions';
export type CollabLabelKey = {
  [K in keyof CollabDict]: CollabDict[K] extends string ? K : never;
}[keyof CollabDict];

export interface CollabField {
  key: string;
  label: CollabLabelKey;
  /** Label used in the notification email (always English). */
  emailLabel: string;
  kind: 'name' | 'email' | 'text' | 'message' | 'select' | 'check';
  required?: boolean;
  options?: CollabOptionsKey;
  autoComplete?: string;
  /** Only shown/accepted when another field has this (English) value. */
  showIf?: { field: string; equals: string };
}

export const LIMITS = { nameMin: 2, nameMax: 100, text: 300, message: 2000, email: 254 };
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Select values are exchanged as the English option label, whatever the page language.
export const englishOptions = (key: CollabOptionsKey): string[] => en.collabPage[key];

export const COLLAB_FIELDS: Record<CollabTrack, CollabField[]> = {
  models: [
    { key: 'name', label: 'name', emailLabel: 'Name', kind: 'name', required: true, autoComplete: 'name' },
    { key: 'email', label: 'email', emailLabel: 'Email', kind: 'email', required: true, autoComplete: 'email' },
    { key: 'instagram', label: 'instagram', emailLabel: 'Instagram', kind: 'text', required: true, autoComplete: 'off' },
    { key: 'portfolio', label: 'portfolio', emailLabel: 'Portfolio / photos link', kind: 'text', autoComplete: 'url' },
    { key: 'city', label: 'city', emailLabel: 'City', kind: 'text', autoComplete: 'address-level2' },
    { key: 'experience', label: 'experience', emailLabel: 'Experience', kind: 'select', options: 'experienceOptions' },
    { key: 'represented', label: 'agencyQ', emailLabel: 'Represented by an agency', kind: 'select', options: 'agencyOptions' },
    { key: 'agencyName', label: 'agencyName', emailLabel: 'Agency name', kind: 'text', autoComplete: 'off', showIf: { field: 'represented', equals: 'Yes' } },
    { key: 'lookingFor', label: 'lookingFor', emailLabel: 'Looking for', kind: 'select', options: 'lookingForOptions' },
    { key: 'availability', label: 'availability', emailLabel: 'Availability', kind: 'text', autoComplete: 'off' },
    { key: 'message', label: 'message', emailLabel: 'Message', kind: 'message' },
    { key: 'over18', label: 'over18', emailLabel: 'Confirmed 18 or older', kind: 'check', required: true },
    { key: 'consent', label: 'consent', emailLabel: 'Privacy consent', kind: 'check', required: true },
  ],
  agencies: [
    { key: 'agencyName', label: 'agencyName', emailLabel: 'Agency name', kind: 'name', required: true, autoComplete: 'organization' },
    { key: 'contactPerson', label: 'contactPerson', emailLabel: 'Contact person', kind: 'name', required: true, autoComplete: 'name' },
    { key: 'role', label: 'role', emailLabel: 'Role', kind: 'text', autoComplete: 'organization-title' },
    { key: 'email', label: 'email', emailLabel: 'Email', kind: 'email', required: true, autoComplete: 'email' },
    { key: 'website', label: 'website', emailLabel: 'Website or Instagram', kind: 'text', required: true, autoComplete: 'url' },
    { key: 'city', label: 'city', emailLabel: 'City', kind: 'text', autoComplete: 'address-level2' },
    { key: 'modelsCount', label: 'modelsCount', emailLabel: 'Number of models / new faces', kind: 'text', autoComplete: 'off' },
    { key: 'need', label: 'need', emailLabel: 'Need', kind: 'select', options: 'needOptions' },
    { key: 'boardLink', label: 'boardLink', emailLabel: 'Model board link', kind: 'text', autoComplete: 'off' },
    { key: 'timeframe', label: 'timeframe', emailLabel: 'Timeframe / deadline', kind: 'text', autoComplete: 'off' },
    { key: 'message', label: 'message', emailLabel: 'Message', kind: 'message' },
    { key: 'consent', label: 'consent', emailLabel: 'Privacy consent', kind: 'check', required: true },
  ],
};

/** Name used to greet the applicant (agencies are greeted by their contact person). */
export const greetingField = (track: CollabTrack) => (track === 'agencies' ? 'contactPerson' : 'name');
/** Name used in the notification subject. */
export const subjectField = (track: CollabTrack) => (track === 'agencies' ? 'agencyName' : 'name');
