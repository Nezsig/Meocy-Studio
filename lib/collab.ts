// Field schema for the /collaborate forms, shared by the page and /api/collaborate.
import { en } from '../data/locales/en';
import type { CollabTrack } from './emails';

export type { CollabTrack };
export const COLLAB_TRACKS: CollabTrack[] = ['models', 'agencies'];

type CollabDict = typeof en.collabPage;
export type CollabOptionsKey = 'experienceOptions' | 'agencyOptions' | 'needOptions' | 'agencyNeedOptions' | 'genderOptions' | 'availabilityOptions' | 'shootTypeOptions';
export type CollabLabelKey = {
  [K in keyof CollabDict]: CollabDict[K] extends string ? K : never;
}[keyof CollabDict];

export interface CollabField {
  key: string;
  label: CollabLabelKey;
  /** Label used in the notification email (always English). */
  emailLabel: string;
  kind: 'name' | 'email' | 'text' | 'message' | 'select' | 'check' | 'number' | 'url';
  required?: boolean;
  options?: CollabOptionsKey;
  autoComplete?: string;
  /** Only shown/accepted when another field has this (English) value. */
  showIf?: { field: string; equals: string };
}

export const LIMITS = { nameMin: 2, nameMax: 100, text: 300, message: 2000, email: 254, heightMin: 100, heightMax: 250, url: 2048 };
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Select values are exchanged as the English option label, whatever the page language.
export const englishOptions = (key: CollabOptionsKey): string[] => en.collabPage[key];

export const COLLAB_FIELDS: Record<CollabTrack, CollabField[]> = {
  models: [
    // Contact Details
    { key: 'name', label: 'name', emailLabel: 'Full Name', kind: 'name', required: true, autoComplete: 'name' },
    { key: 'email', label: 'email', emailLabel: 'Email Address', kind: 'email', required: true, autoComplete: 'email' },
    { key: 'phone', label: 'phone', emailLabel: 'Phone / WhatsApp Number', kind: 'text', required: true, autoComplete: 'tel' },
    { key: 'instagram', label: 'instagram', emailLabel: 'Instagram Username or Profile Link', kind: 'text', required: true, autoComplete: 'off' },
    // Personal / Model Information
    { key: 'age', label: 'age', emailLabel: 'Age', kind: 'text', required: true, autoComplete: 'off' },
    { key: 'height', label: 'height', emailLabel: 'Height (cm)', kind: 'number', required: true, autoComplete: 'off' },
    { key: 'gender', label: 'gender', emailLabel: 'Gender', kind: 'select', options: 'genderOptions', required: true },
    { key: 'location', label: 'location', emailLabel: 'Location / Area', kind: 'text', required: true, autoComplete: 'address-level2' },
    { key: 'experience', label: 'experience', emailLabel: 'Modeling Experience', kind: 'select', options: 'experienceOptions' },
    { key: 'portfolio', label: 'portfolio', emailLabel: 'Recent Photos / Portfolio Link', kind: 'url', required: true, autoComplete: 'url' },
    // Shoot Information
    { key: 'availability', label: 'availability', emailLabel: 'Availability', kind: 'select', options: 'availabilityOptions', required: true },
    { key: 'shootType', label: 'shootType', emailLabel: 'Type of Shoot Interested In', kind: 'select', options: 'shootTypeOptions' },
    { key: 'message', label: 'message', emailLabel: 'Message / Tell Us About Yourself', kind: 'message' },
    // Consent & Legal
    { key: 'over18', label: 'over18', emailLabel: 'Confirmed 18 or older', kind: 'check', required: true },
    { key: 'consent', label: 'consent', emailLabel: 'Privacy consent and collaboration acknowledgment', kind: 'check', required: true },
  ],
  agencies: [
    { key: 'agencyName', label: 'agencyName', emailLabel: 'Agency Name', kind: 'name', required: true, autoComplete: 'organization' },
    { key: 'contactPerson', label: 'contactPerson', emailLabel: 'Contact Person', kind: 'name', required: true, autoComplete: 'name' },
    { key: 'email', label: 'email', emailLabel: 'Email Address', kind: 'email', required: true, autoComplete: 'email' },
    { key: 'phone', label: 'phone', emailLabel: 'Phone / WhatsApp', kind: 'text', autoComplete: 'tel' },
    { key: 'website', label: 'website', emailLabel: 'Agency Website', kind: 'text', autoComplete: 'url' },
    { key: 'instagram', label: 'instagram', emailLabel: 'Agency Instagram', kind: 'text', autoComplete: 'off' },
    { key: 'need', label: 'need', emailLabel: 'What are you looking for?', kind: 'select', options: 'agencyNeedOptions', required: true },
    { key: 'modelsCount', label: 'modelsCount', emailLabel: 'Number of Models', kind: 'text', autoComplete: 'off' },
    { key: 'timeframe', label: 'timeframe', emailLabel: 'Preferred Date / Timeframe', kind: 'text', autoComplete: 'off' },
    { key: 'message', label: 'message', emailLabel: 'Project Details / Message', kind: 'message', required: true },
    { key: 'consent', label: 'consent', emailLabel: 'Privacy consent and project inquiry acknowledgment', kind: 'check', required: true },
  ],
};

/** Name used to greet the applicant (agencies are greeted by their contact person). */
export const greetingField = (track: CollabTrack) => (track === 'agencies' ? 'contactPerson' : 'name');
/** Name used in the notification subject. */
export const subjectField = (track: CollabTrack) => (track === 'agencies' ? 'agencyName' : 'name');

// Gender options for models
export const genderOptions = ['Female', 'Male', 'Prefer not to say'];

// Availability options for models
export const availabilityOptions = ['Weekdays', 'Weekends', 'Flexible'];

// Type of shoot interested in options for models
export const shootTypeOptions = ['Fashion', 'Portrait', 'Creative', 'Open to ideas'];

// What agencies are looking for options
export const agencyNeedOptions = ['Model Test Shoot', 'Portfolio / Book Update', 'Digitals', 'Fashion / Editorial Shoot', 'Photo + Video Content', 'Commercial Project', 'Other'];
