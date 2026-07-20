import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ImageWithShimmerProps {
  src: string
  alt: string
  className?: string
  width?: number | string
  height?: number | string
  priority?: boolean
  placeholder?: string
  sizes?: string
  quality?: number
  format?: 'webp' | 'avif' | 'auto'
}

export const ImageWithShimmer: React.FC<ImageWithShimmerProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Shimmer placeholder */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700"
          animate={{
            backgroundPosition: ['-200% 0', '200% 0'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 100%',
          }}
        />
      )}

      {/* Blurhash placeholder */}
      {placeholder && !isLoaded && (
        <div
          className="absolute inset-0 bg-neutral-200 dark:bg-neutral-700"
          style={{
            backgroundImage: `url(${placeholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
          }}
        />
      )}

      {/* Actual image - prefer WebP sibling when present (generated offline) */}
      {isInView && (
        <picture>
          {/\.(jpe?g|png)$/i.test(src) && (
            <source
              type="image/webp"
              srcSet={src.replace(/\.(jpe?g|png)$/i, '.webp')}
            />
          )}
          <motion.img
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-full transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : undefined}
          />
        </picture>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
          <div className="text-center text-neutral-500 dark:text-neutral-400">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
    </div>
  )
}

interface ResponsiveImageProps extends ImageWithShimmerProps {
  sizes?: string
  srcSet?: string
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  sizes = '100vw',
  srcSet,
  priority = false,
  placeholder,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Shimmer placeholder */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700"
          animate={{
            backgroundPosition: ['-200% 0', '200% 0'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 100%',
          }}
        />
      )}

      {/* Blurhash placeholder */}
      {placeholder && !isLoaded && (
        <div
          className="absolute inset-0 bg-neutral-200 dark:bg-neutral-700"
          style={{
            backgroundImage: `url(${placeholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
          }}
        />
      )}

      {/* Responsive image */}
      {isInView && (
        <picture>
          <source srcSet={srcSet} sizes={sizes} />
          <motion.img
            src={src}
            alt={alt}
            className={`w-full h-full transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            {...props}
          />
        </picture>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
          <div className="text-center text-neutral-500 dark:text-neutral-400">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
    </div>
  )
}
