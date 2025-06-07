import type { GlobalConfig } from 'payload'

const HeaderConfig: GlobalConfig = {
  slug: 'header',
  label: 'Header settings',
  admin: {
    description: 'Configure the header settings for your site.',
  },

  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload your logo here. It will be displayed in the header.',
      },
    },
    {
      name: 'Book_now_button_text',
      label: 'Book Now Button Text',
      type: 'text',
      required: true,
      admin: {
        description: 'Text for the "Book Now" button in the header.',
      },
    },
    {
      name: 'Book_now_button_color',
      label: 'Book Now Button Color',
      type: 'text',
      required: true,
      admin: {
        description: 'Color for the "Book Now" button in the header.Hex code/rgb value/color name',
      },
    },
    {
      name: 'navigation_links',
      label: 'Navigation Links',
      type: 'array',
      fields: [
        {
          name: 'label',

          type: 'text',
          required: true,
          admin: {
            description: 'Text for the navigation link.',
          },
        },
        {
          name: 'section_id',
          label: 'Section id',
          type: 'select',
          required: true,
          options: [
            { label: 'Home', value: 'home' },
            { label: 'About Us', value: 'about' },
            { label: 'Contact Us', value: 'contact' },
            { label: 'Treks', value: 'treks' },
          ],
          admin: {
            description: 'URL for the navigation link. Use absolute URLs or relative paths.',
          },
        },
      ],
      admin: {
        description:
          'Add navigation links for the header. Each link should have a label and a URL.',
      },
    },

    {
      name: 'Navigation_links_hover_color',
      label: 'Navigation Links Hover Color',
      type: 'text',
      admin: {
        description:
          'Color for the navigation links when hovered over. Use hex code/rgb value/color name.',
      },
    },
  ],
}

export default HeaderConfig
