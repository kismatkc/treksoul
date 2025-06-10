// src/globals/TrekConfig.ts
import type { GlobalConfig } from 'payload';

const TrekConfig: GlobalConfig = {
  slug: 'treks_page',
  label: 'Treks Page Settings',

  admin: {
    group: 'Treks Content',
    description: 'Configure headings and button copy for the Treks page.',
  },

  fields: [
    /* --------------------------------------------------------------
     * PAGE HEADING
     * ------------------------------------------------------------ */
    {
      name: 'treks_page_heading',
      label: 'Treks Page Heading',
      type: 'text',
      admin: {
        description: 'Main heading displayed at the top of the Treks page.',
      },
    },

    /* --------------------------------------------------------------
     * CARD BUTTON TEXT
     * ------------------------------------------------------------ */
    {
      name: 'treks_card_left_button_text',
      label: 'Left Button Text',
      type: 'text',
      admin: {
        description: 'Text displayed on the left button inside each trek card.',
      },
    },
    {
      name: 'treks_card_right_button_text',
      label: 'Right Button Text',
      type: 'text',
      admin: {
        description: 'Text displayed on the right button inside each trek card.',
      },
    },

    /* --------------------------------------------------------------
     * CARD BUTTON COLORS
     * ------------------------------------------------------------ */
    {
      name: 'treks_card_left_button_color',
      label: 'Left Button Color',
      type: 'text',
      admin: {
        description:
          'Background color for the left button (HEX code, RGB value, or valid CSS color name).',
      },
    },
    {
      name: 'treks_card_right_button_color',
      label: 'Right Button Color',
      type: 'text',
      admin: {
        description:
          'Background color for the right button (HEX code, RGB value, or valid CSS color name).',
      },
    },
  ],
};

export default TrekConfig;
