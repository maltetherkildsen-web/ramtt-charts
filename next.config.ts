import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: '.',
  },
  async headers() {
    // Dev only: prevent browser from caching ANY response
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          source: '/:path*',
          headers: [
            { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, max-age=0' },
            { key: 'Pragma', value: 'no-cache' },
            { key: 'Expires', value: '0' },
          ],
        },
      ]
    }
    return []
  },
}

export default nextConfig
