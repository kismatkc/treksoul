import { getPayload } from 'payload'
import config from '@/payload.config'
import BookNowSheet from './book-sheet'

export default async function BookNowServer() {
  const payload = await getPayload({ config })

  const bookData = await payload.findGlobal({
    slug: 'booking_sheet',
    depth: 1, // depth 1 is plenty; no deep relations here
  })

  return <BookNowSheet bookData={bookData} />
}
