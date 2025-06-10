// src/collections/Treks.ts
import type { CollectionConfig } from 'payload';

const Treks: CollectionConfig = {
  slug: 'treks',
  labels: { singular: 'Trek', plural: 'Treks' },

  admin: {
    group: 'Treks Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'durationDays', 'price.amount'],
  },

  fields: [
    /* --------------------------------------------------------------
     * BASIC INFO
     * ------------------------------------------------------------ */
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full trek name shown on cards and detail pages.',
      },
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'URL‑friendly slug. If left blank, it will be auto‑generated from the trek name.',
      },
      hooks: {
        // ✅ Return only the string value for this field
        beforeValidate: [
          ({ value, data }) => {
            const base = value || data?.name || '';
            return base
              .toLowerCase()
              .trim()
              .replace(/\s+/g, '-') // spaces → dashes
              .replace(/[^a-z0-9-]/g, ''); // strip non‑URL chars
          },
        ],
      },
    },

    /* --------------------------------------------------------------
     * IMAGES
     * ------------------------------------------------------------ */
    {
      name: 'heroImage',
      label: 'Main Card Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'Primary cover photo (recommended ≥ 1 200 × 800 px). Displayed on the card and as the hero banner.',
      },
    },
    {
      name: 'gallery',
      label: 'Extra Photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
      admin: {
        description:
          'Drag‑and‑drop or select multiple images at once. No per‑image metadata.',
      },
    },

    /* --------------------------------------------------------------
     * PRICE
     * ------------------------------------------------------------ */
    {
      name: 'price',
      label: 'Price',
      type: 'group',
      required: true,
      admin: { description: 'Package cost in the selected currency.' },
      fields: [
        {
          name: 'amount',
          label: 'Amount',
          type: 'number',
          min: 0,
          required: true,
          admin: {
            placeholder: 'e.g. 185000',
            description: 'Numeric price without commas or separators.',
            width: '70%',
          },
        },
        {
          name: 'currency',
          label: 'Currency',
          type: 'select',
          defaultValue: 'NPR',
          options: ['NPR', 'USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD'],
          required: true,
          admin: {
            description: 'ISO currency code.',
            width: '30%',
          },
        },
      ],
    },

    /* --------------------------------------------------------------
     * NUMERIC DETAILS
     * ------------------------------------------------------------ */
    {
      name: 'durationDays',
      label: 'Duration (Days)',
      type: 'number',
      min: 1,
      required: true,
      admin: {
        description:
          'Total trekking days (do not include arrival or departure buffer days).',
      },
    },

    /* --------------------------------------------------------------
     * SUMMARY & HIGHLIGHTS
     * ------------------------------------------------------------ */
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'One‑paragraph teaser (≈ 150 characters). Shown in search results and used for SEO meta descriptions.',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description:
          'Add up to three ultra‑short selling points (e.g. “12 d / 130 km”, “Sherpa culture”, “Hot springs”).',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: { description: 'Single highlight phrase.' },
        },
      ],
    },

    /* --------------------------------------------------------------
     * WHAT’S INCLUDED
     * ------------------------------------------------------------ */
    {
      name: 'included',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description:
          'Everything covered by the package price—enter one item per row (e.g. “Kathmandu–Lukla flights”).',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          admin: { description: 'Inclusion detail.' },
        },
      ],
    },
  ],
};

export default Treks;
