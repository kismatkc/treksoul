// src/collections/Treks.ts
import type { CollectionConfig } from 'payload'

const Treks: CollectionConfig = {
  slug: 'treks',
  labels: { singular: 'Trek', plural: 'Treks' },

  admin: {
    group: 'Treks content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'durationDays', 'price.amount'],
  },

  fields: [
    /* BASIC --------------------------------------------------------- */
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
        description: 'URL slug (auto-filled from name if left blank).',
      },
      hooks: {
        // ✅ Return only the string value for this field
        beforeValidate: [
          ({ value, data }) => {
            const base = value || data?.name || ''
            return base
              .toLowerCase()
              .trim()
              .replace(/\s+/g, '-') // spaces → dashes
              .replace(/[^a-z0-9-]/g, '') // strip non‑URL chars
          },
        ],
      },
    },

    /* MEDIA --------------------------------------------------------- */
    {
      name: 'heroImage',
      label: 'Main Card Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'Primary cover photo (≥ 1 200 × 800 px). Appears in cards and as the hero banner.',
      },
    },
    {
      name: 'gallery',
      label: 'Extra Photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true, // select/upload multiple at once
      required: true,
      admin: {
        description: 'Select or drag-and-drop images at once. No per-image metadata.',
      },
    },

    /* PRICE --------------------------------------------------------- */
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
            description: 'Currency code for the price.',
            width: '30%',
          },
        },
      ],
    },

    /* NUMBERS ------------------------------------------------------- */
    {
      name: 'durationDays',
      label: 'Duration (days)',
      type: 'number',
      min: 1,
      required: true,
      admin: {
        description: 'Total trekking days (do not count arrival/departure buffer days).',
      },
    },

    /* COPY ---------------------------------------------------------- */
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'One‑paragraph teaser (≈ 150 characters). Used in search results and SEO meta description.',
      },
    },

    {
      name: 'highlights',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description:
          'Exactly three ultra‑short selling points (e.g. “12 d / 130 km”, “Sherpa culture”, “Hot springs”).',
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

    {
      name: 'included',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description:
          'Everything covered by the package price—one item per row (e.g. “Kathmandu–Lukla flights”).',
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
}

export default Treks
