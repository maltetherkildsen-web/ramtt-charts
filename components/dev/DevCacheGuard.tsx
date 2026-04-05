'use client'

import { useEffect } from 'react'

const RELOAD_FLAG = '__ramtt_dev_cache_guard_reloaded__'

/**
 * Development-only cache guard.
 *
 * If an old service worker from previous localhost experiments controls this origin,
 * it can serve stale assets until a hard refresh. We clear SW + CacheStorage once
 * per tab session and trigger a single reload to get a clean runtime.
 */
export function DevCacheGuard() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    let cleanedSomething = false

    const clean = async () => {
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations()
        if (regs.length > 0) {
          await Promise.all(regs.map((r) => r.unregister()))
          cleanedSomething = true
        }
      }

      if ('caches' in window) {
        const keys = await caches.keys()
        if (keys.length > 0) {
          await Promise.all(keys.map((k) => caches.delete(k)))
          cleanedSomething = true
        }
      }

      if (cleanedSomething && !sessionStorage.getItem(RELOAD_FLAG)) {
        sessionStorage.setItem(RELOAD_FLAG, '1')
        window.location.reload()
      }
    }

    void clean()
  }, [])

  return null
}