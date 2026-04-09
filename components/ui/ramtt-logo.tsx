import React from 'react'
import { cn } from '@/lib/utils'
import { RADIUS } from '@/lib/ui'

/**
 * RAMTT R Icon — SVG with currentColor, Tailwind compatible.
 */
export function RIcon({
  className = 'size-8',
  ...props
}: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="688 372 465 238"
      fill="currentColor"
      className={className}
      {...props}
    >
      <g transform="translate(0,1080) scale(0.1,-0.1)">
        <path d="M8725 7050 l-319 -5 -83 -130 c-104 -163 -104 -157 5 -185 48 -12 195 -52 327 -87 375 -102 450 -120 618 -153 l157 -31 440 3 c242 2 440 0 440 -3 0 -18 -76 -129 -109 -159 -86 -79 -22 -74 -1076 -81 -517 -4 -967 -11 -1000 -16 -148 -20 -405 -211 -483 -360 -7 -12 -18 -27 -25 -35 -13 -13 -59 -81 -470 -706 -241 -365 -230 -347 -214 -359 13 -10 828 -17 857 -8 10 3 46 51 81 106 35 55 94 146 130 202 36 56 93 147 127 202 176 287 324 386 624 419 l56 6 28 -48 c15 -26 75 -120 133 -209 58 -90 167 -258 241 -374 74 -116 147 -228 163 -250 l27 -39 521 0 c466 0 521 2 515 15 -3 9 -115 179 -248 378 -309 461 -352 526 -346 532 3 3 56 12 119 21 588 80 843 242 1161 734 314 485 388 604 380 612 -9 9 -2298 15 -2777 8z" />
      </g>
    </svg>
  )
}
RIcon.displayName = 'RIcon'

/**
 * RAMTT Wordmark — SVG with currentColor, Tailwind compatible.
 */
export function RamttWordmark({
  className = 'h-8 w-auto',
  ...props
}: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="655 498 477 84"
      fill="currentColor"
      className={className}
      {...props}
    >
      <g transform="translate(0,1080) scale(0.1,-0.1)">
        <path d="M8213 5703 c-22 -43 -78 -150 -123 -238 -45 -88 -118 -229 -162 -312 l-79 -153 141 0 141 0 30 65 29 66 113 -3 112 -3 3 -62 3 -63 138 0 138 0 -5 58 c-3 31 -19 206 -36 387 l-31 330 -186 3 -185 2 -41 -77z m194 -253 l2 -150 -64 0 c-78 0 -78 -8 -14 138 28 64 54 127 59 140 15 34 15 32 17 -128z" />
        <path d="M8907 5648 c-16 -73 -53 -248 -83 -387 -30 -140 -54 -256 -54 -258 0 -2 54 -3 119 -3 l119 0 17 73 c9 39 32 146 50 236 19 90 36 165 38 167 2 2 14 -72 26 -164 33 -239 19 -213 115 -210 l81 3 104 188 c113 204 119 211 97 116 -17 -68 -86 -395 -86 -404 0 -3 54 -5 119 -5 l119 0 6 26 c4 14 31 142 61 285 30 142 64 299 75 349 30 133 44 121 -137 118 l-156 -3 -88 -165 c-125 -235 -140 -262 -146 -257 -3 4 -52 392 -53 425 0 1 -71 2 -158 2 l-157 0 -28 -132z" />
        <path d="M9926 5763 c-6 -18 -36 -161 -36 -169 0 -2 43 -4 95 -4 60 0 95 -4 95 -11 0 -9 -100 -490 -115 -556 -5 -23 -5 -23 127 -23 l133 0 49 228 c26 125 55 257 63 295 l15 67 98 0 98 0 17 78 c9 42 19 85 21 95 5 16 -15 17 -325 17 -305 0 -330 -1 -335 -17z" />
        <path d="M10626 5709 c-28 -124 -31 -119 74 -119 110 0 106 35 31 -315 l-58 -270 130 -3 c71 -1 131 -1 133 1 3 3 44 193 111 510 l16 77 99 0 c93 0 98 1 103 23 26 112 35 153 35 160 0 4 -148 7 -329 7 l-329 0 -16 -71z" />
        <path d="M7033 5705 c-33 -51 -36 -48 135 -96 152 -42 163 -43 329 -47 l173 -4 -17 -28 c-31 -52 -43 -54 -395 -60 l-326 -5 -44 -30 c-40 -28 -309 -407 -297 -419 6 -6 74 -9 176 -7 l91 1 59 92 c95 151 141 192 228 199 l39 4 95 -147 94 -148 164 0 c129 0 163 3 157 13 -4 6 -48 72 -97 145 -49 73 -88 134 -86 136 2 1 39 10 83 19 190 40 299 139 435 395 l12 22 -493 0 -493 0 -22 -35z" />
      </g>
    </svg>
  )
}
RamttWordmark.displayName = 'RamttWordmark'

/**
 * RAMTT Full Logo (Icon + Wordmark) — matches ramtt.com style.
 */
export function RamttLogo({
  className = 'h-10',
  iconOnly = false,
  ...props
}: { className?: string; iconOnly?: boolean } & React.HTMLProps<HTMLDivElement>) {
  if (iconOnly) {
    return <RIcon className={className} />
  }

  return (
    <div className={cn('flex items-center gap-3', className)} {...props}>
      <RIcon className="h-full w-auto shrink-0" />
      <RamttWordmark className="h-[60%] w-auto shrink-0" />
    </div>
  )
}
RamttLogo.displayName = 'RamttLogo'

export default RamttLogo
