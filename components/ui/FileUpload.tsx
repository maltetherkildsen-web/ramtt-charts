// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useRef, useCallback } from 'react'
import { cn, FONT, WEIGHT, RADIUS, TRANSITION } from '@/lib/ui'

export interface FileUploadProps {
  accept?: string
  onUpload: (file: File) => void
  label?: string
  description?: string
  preview?: string
  maxSize?: number
  disabled?: boolean
  className?: string
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  ({ accept, onUpload, label, description, preview, maxSize = 10 * 1024 * 1024, disabled = false, className }, ref) => {
    const [dragOver, setDragOver] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFile = useCallback(
      (file: File) => {
        setError(null)
        if (file.size > maxSize) {
          setError(`File too large (${formatSize(file.size)}). Max ${formatSize(maxSize)}.`)
          return
        }
        setFileName(file.name)
        onUpload(file)
      },
      [maxSize, onUpload],
    )

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
      },
      [handleFile],
    )

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFile(file)
      },
      [handleFile],
    )

    return (
      <div
        ref={ref}
        className={cn(
          'relative',
          disabled && 'opacity-50 pointer-events-none',
          className,
        )}
      >
        <div
          onDragEnter={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={(e) => { e.preventDefault(); setDragOver(false) }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex flex-col items-center justify-center text-center',
            'border-[1.5px] border-dashed',
            RADIUS.lg,
            'py-8 px-6',
            TRANSITION.colors,
            dragOver
              ? 'border-[var(--n1150)] bg-[var(--n200)]'
              : 'border-[var(--n400)] bg-transparent',
          )}
        >
          {preview ? (
            <div className="relative group">
              <img
                src={preview}
                alt="Preview"
                className={cn('max-h-[120px] object-contain', RADIUS.md)}
              />
              <div className={cn(
                'absolute inset-0 flex items-center justify-center',
                'bg-[var(--n1150)]/40 opacity-0 group-hover:opacity-100',
                RADIUS.md,
                TRANSITION.opacity,
              )}>
                <span className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-white')}>
                  Change
                </span>
              </div>
            </div>
          ) : (
            <>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                className="text-[var(--n400)] mb-3"
              >
                <path
                  d="M20 6v20M12 14l8-8 8 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 26v6a2 2 0 002 2h24a2 2 0 002-2v-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {label && (
                <span className={cn(FONT.body, 'text-[14px]', WEIGHT.book, 'text-[var(--n1150)]')}>
                  {label}
                </span>
              )}
              {description && (
                <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)] mt-1')}>
                  {description}
                </span>
              )}
              <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)] mt-1')}>
                or click to browse
              </span>
            </>
          )}

          {fileName && !preview && (
            <span className={cn(FONT.body, 'text-[12px]', WEIGHT.book, 'text-[var(--n800)] mt-2')}>
              {fileName}
            </span>
          )}
        </div>

        {error && (
          <p className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--negative)] mt-2')}>
            {error}
          </p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="sr-only"
          tabIndex={-1}
        />
      </div>
    )
  },
)

FileUpload.displayName = 'FileUpload'
export { FileUpload }
