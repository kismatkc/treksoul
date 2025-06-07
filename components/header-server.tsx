import { getPayload } from 'payload'
import config from '@/payload.config'

import { MobileMenu } from './mobile-header'

export default async function HeaderServer() {
  const payload = await getPayload({ config })

  try {
    const headerData = await payload.findGlobal({
      slug: 'header',
    })

    return <MobileMenu headerData={headerData} />
  } catch (error) {
    console.error('Error fetching header data:', error)
    return null
  }
}
