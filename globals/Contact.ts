// src/globals/FooterConfig.ts
import type { GlobalConfig } from 'payload';

const FooterConfig: GlobalConfig = {
  slug: 'footer',
  label: 'Footer Settings',

  admin: {
    group: 'Site Content',
    description: 'Logo text, quick links, social URLs and colours for the footer.',
  },

  access: { read: () => true },

  fields: [
    /* LOGO ---------------------------------------------------- */
    {
      name: 'brand_name',
      label: 'Brand / Logo Text',
      type: 'text',
      required: true,
      defaultValue: 'TrekSoulNepal',
    },

    /* QUICK NAV ---------------------------------------------- */
    {
      name: 'quick_links',
      label: 'Quick Links',
      type: 'array',
      minRows: 1,
      defaultValue: [
        { label: 'About', section_id: '#about' },
        { label: 'Treks', section_id: '#treks' },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'section_id',
          label: 'Section ID or URL',
          type: 'text',
          required: true,
        },
      ],
    },

    /* SOCIAL URLS -------------------------------------------- */
    {
      name: 'social',
      label: 'Social URLs',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          label: 'Facebook URL',
          type: 'text',
          defaultValue: 'https://facebook.com/',
        },
        {
          name: 'instagram',
          label: 'Instagram URL',
          type: 'text',
          defaultValue: 'https://instagram.com/',
        },
        {
          name: 'whatsapp',
          label: 'WhatsApp URL',
          type: 'text',
          defaultValue: 'https://wa.me/0000000000',
        },
      ],
    },

    /* COLOURS ------------------------------------------------- */
    {
      name: 'accent_color',
      label: 'Accent Colour (Icons & Hover Text)',
      type: 'text',
      defaultValue: '#047857', // emerald‑700
    },
    {
      name: 'hover_bg_color',
      label: 'Icon Hover Background',
      type: 'text',
      defaultValue: '#d1fae5', // emerald‑100
    },

    /* COPYRIGHT ---------------------------------------------- */
    {
      name: 'copyright_name',
      label: 'Copyright Name',
      type: 'text',
      defaultValue: 'TrekSoulNepal',
    },
  ],
};

export default FooterConfig;
