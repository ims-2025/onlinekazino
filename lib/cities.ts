/**
 * Typed accessors for the land-based casino city hub data
 * (data/cities.json). Used by app/sauszemes-kazino/ pages.
 */

import citiesJson from '@/data/cities.json';

export interface CitySectionLink {
  href: string;
  label: string;
}

export interface CitySection {
  heading: string;
  body: string;
  links?: CitySectionLink[];
}

export interface CityFaq {
  q: string;
  a: string;
}

export interface CityVenueOverview {
  casinoCount: string;
  slotHallCount: string;
  dominantOperator: string;
  secondaryOperators: string[];
  districts: string[];
}

export interface City {
  slug: string;
  name: string;
  nameLocative: string;
  nameGenitive: string;
  population: number;
  region: string;
  regionLabel: string;
  tier: string;
  lede: string;
  intro: string[];
  venueOverview: CityVenueOverview;
  sections: CitySection[];
  faq: CityFaq[];
}

interface CitiesFile {
  _meta: { iauiSource: string; lastVerified: string; description: string };
  cities: City[];
}

const data = citiesJson as unknown as CitiesFile;

export function getCities(): City[] {
  return data.cities;
}

export function getCitySlugs(): string[] {
  return data.cities.map((c) => c.slug);
}

export function getCityBySlug(slug: string): City | undefined {
  return data.cities.find((c) => c.slug === slug);
}

export function getCitiesMeta(): CitiesFile['_meta'] {
  return data._meta;
}
