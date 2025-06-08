import type { GlobalConfig } from 'payload'

const TrekConfig: GlobalConfig = {
  slug: 'treks_page',
  label: 'Treks page settings',
  admin: {
    group: 'Treks content',
    description: 'Configure the Treks page settings for your site.',
  },

  fields: [
    {
      name: 'treks_page_heading',
      label: 'Treks page Heading',
      type: 'text',
      admin: {
        description: 'Heading for the Treks page.',
      },
    },
  ],
}

export default TrekConfig
