// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3' // ✅ named export

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import HeaderConfig from './globals/Header'
import LandingPageConfig from './globals/Landing-page'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


  
export default buildConfig({
  serverURL: process.env.SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: process.env.SERVER_URL,
      globals: ['header', 'landing_page'],
    },
  },
  collections: [Users, Media],
  globals: [HeaderConfig, LandingPageConfig],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    s3Storage({
      collections: { media: true },
      bucket: process.env.S3_BUCKET as string,
      config: {
        endpoint: process.env.S3_ENDPOINT,
         region: 'ap-south-1', // any string works; Filebase ignores it
        forcePathStyle: true, // mandatory for non‑AWS hosts
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.S3_SECRET as string,
        },
      },
    }),
  ],
})
