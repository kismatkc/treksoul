export interface Trek {
  id: string;               // slug e.g. "everest-base-camp-12-days"
  name: string;             // display title
  heroImage: string;        // main photo URL
  price: number;            // NPR only
  currency: 'NPR';          // fixed literal
  durationDays: number;     // total trek days
  summary: string;          // short teaser
  highlights: string[];     // include duration + length here
  included: string[];       // what’s covered
}
