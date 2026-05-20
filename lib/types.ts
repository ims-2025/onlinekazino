/**
 * Domain types for the JSON data layer. The shapes match the output of
 * scripts/import-wp.mjs, with hand-edited records (real LV operators) sharing
 * the same shape so the templates don't care about provenance.
 */

export interface OperatorRatings {
  trust?: number;     // 0-5
  games?: number;
  bonus?: number;
  customer?: number;
  overall?: number;   // computed average, displayed prominently
}

export interface OperatorAffiliate {
  url: string;            // raw destination URL
  partner: string | null; // e.g. 'enlabs', 'direct', 'mercury-demo'
}

export interface OperatorBonus {
  shortDesc: string;
  termsDesc: string;
  detailedTc: string;
  buttonNotice: string;
}

export interface OperatorFacets {
  licences: string[];
  depositMethods: string[];
  withdrawalMethods: string[];
  currencies: string[];
  languages: string[];
  software: string[];
  devices: string[];
  restrictedCountries: string[];
  categories: string[];
  established: string | null;
  owner: string | null;
}

export interface Operator {
  wpId: number;
  slug: string;
  name: string;
  status: 'publish' | 'draft' | 'future' | 'private' | 'inherit';
  keep: boolean;
  isMercuryDemo: boolean;
  ratings: OperatorRatings;
  affiliate: OperatorAffiliate;
  bonus: OperatorBonus;
  facets: OperatorFacets;
  featuredImage: string | null;
  excerpt: string;
  content: string;
  publishedAt?: string;
  modifiedAt?: string;
}

export interface ArticleCategory {
  slug: string;
  label: string;
}

export interface Article {
  wpId: number;
  slug: string;
  title: string;
  status: 'publish' | 'draft' | 'future' | 'private' | 'inherit';
  isPublished: boolean;
  promoteDraft: boolean; // annab pillar draft → publish in new site
  author: string;
  excerpt: string;
  content: string;
  categories: ArticleCategory[];
  featuredImage: string | null;
  wordCount: number;
  publishedAt?: string;
  modifiedAt?: string;
  link?: string;
}

export interface Page {
  wpId: number;
  slug: string;
  title: string;
  status: string;
  content: string;
  excerpt: string;
  featuredImage: string | null;
  publishedAt?: string;
  modifiedAt?: string;
}

export interface Affiliate {
  operatorSlug: string;
  partner: string;
  sourceUrl: string;
  goPath: string;
}
