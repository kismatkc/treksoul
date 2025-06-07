import type { GlobalConfig } from 'payload'

const HeaderConfig: GlobalConfig = {
  slug: 'landing_page',
  label: 'Landing page settings',
  admin: {
    description: 'Configure the Landing page settings for your site.',
  },

  fields: [
    {
      name: 'landing_page_background_image',
      type: 'upload',
      relationTo: 'media',
      required: true,

      admin: {
        description: 'Upload the background image for the landing page.',
      },
    },

    {
      name: 'Search_bar_heading',
      label: 'Search Bar Heading',
      type: 'text',
      admin: {
        description: 'Heading for the search bar in the header.',
      },
    },
    {
      name: 'Search_bar_placeholder',
      label: 'Search Bar Placeholder',
      type: 'text',
      admin: {
        description: 'Searchbar placeholder.',
      },
    },
  ],
}

export default HeaderConfig
