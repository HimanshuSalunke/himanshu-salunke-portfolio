import React from 'react'
import { motion } from 'framer-motion'
import { ImageWithShimmer } from '../ui/ImageWithShimmer'
import { Tag } from '../ui/Tag'
import { Button } from '../ui/Button'
import { ProjectGallery } from '../ui/ProjectGallery'

// Helper function to filter out conflicting props between HTML and Framer Motion
const filterMotionProps = (props: any) => {
  const { 
    onDrag, 
    onDragStart, 
    onDragEnd,
    onCopy,
    onCopyCapture,
    onCut,
    onCutCapture,
    onPaste,
    onPasteCapture,
    ...filteredProps 
  } = props
  return filteredProps
}

// Custom components for MDX rendering in project pages
export const MDXComponents = {
  // Enhanced heading components with animations
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <motion.h1
      className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.h1>
  ),
  
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <motion.h2
      className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6 mt-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.h2>
  ),
  
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <motion.h3
      className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white mb-4 mt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.h3>
  ),
  
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <motion.h4
      className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white mb-3 mt-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.h4>
  ),

  // Enhanced paragraph with better typography
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <motion.p
      className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.p>
  ),

  // Enhanced list components
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <motion.ul
      className="list-disc list-inside text-lg text-neutral-600 dark:text-neutral-400 mb-6 space-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.ul>
  ),

  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <motion.ol
      className="list-decimal list-inside text-lg text-neutral-600 dark:text-neutral-400 mb-6 space-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.ol>
  ),

  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),

  // Enhanced code blocks with syntax highlighting
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
    const isInline = !className?.includes('language-')
    
    if (isInline) {
      return (
        <code
          className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-2 py-1 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      )
    }

    const language = className?.replace('language-', '') || 'text'
    const [copied, setCopied] = React.useState(false)

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(children as string)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy code:', err)
      }
    }

    return (
      <motion.div
        className="bg-neutral-900 dark:bg-neutral-950 rounded-xl mb-6 overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Code header with language and copy button */}
        <div className="flex items-center justify-between px-4 py-2 bg-neutral-800 dark:bg-neutral-900 border-b border-neutral-700">
          <span className="text-xs text-neutral-400 font-mono uppercase tracking-wide">
            {language}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1 text-xs text-neutral-400 hover:text-white transition-colors rounded-md hover:bg-neutral-700"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
        <pre className="p-6 text-neutral-100 text-sm leading-relaxed overflow-x-auto">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </motion.div>
    )
  },

  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <div className="mb-6" {...filterMotionProps(props)}>
      {children}
    </div>
  ),

  // Enhanced blockquote
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <motion.blockquote
      className="border-l-4 border-primary-500 pl-6 py-4 bg-primary-50 dark:bg-primary-950/20 rounded-r-lg mb-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      <p className="text-lg text-neutral-700 dark:text-neutral-300 italic">
        {children}
      </p>
    </motion.blockquote>
  ),

  // Enhanced links
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline underline-offset-2 transition-colors duration-200"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),

  // Enhanced images
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <motion.div
      className="my-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <ImageWithShimmer
        src={src || ''}
        alt={alt || ''}
        className="w-full rounded-xl shadow-lg"
        width={typeof props.width === 'string' ? parseInt(props.width) : props.width}
        height={typeof props.height === 'string' ? parseInt(props.height) : props.height}
        {...(props as any)}
      />
    </motion.div>
  ),

  // Custom components for project-specific content
  ProjectImage: ({ src, alt, caption, ...props }: { src: string; alt: string; caption?: string } & React.ImgHTMLAttributes<HTMLImageElement>) => (
    <motion.figure
      className="my-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <ImageWithShimmer
        src={src}
        alt={alt}
        className="w-full rounded-xl shadow-lg"
        width={typeof props.width === 'string' ? parseInt(props.width) : props.width}
        height={typeof props.height === 'string' ? parseInt(props.height) : props.height}
        {...(props as any)}
      />
      {caption && (
        <figcaption className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-2">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  ),

  TechStack: ({ technologies }: { technologies: string[] }) => (
    <motion.div
      className="flex flex-wrap gap-2 my-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {technologies.map((tech) => (
        <Tag key={tech} variant="primary" size="sm">
          {tech}
        </Tag>
      ))}
    </motion.div>
  ),

  Metrics: ({ metrics }: { metrics: Array<{ label: string; value: string }> }) => (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white dark:bg-neutral-800 rounded-lg p-4 text-center shadow-sm border border-neutral-200 dark:border-neutral-700"
        >
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-500 mb-1">
            {metric.value}
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            {metric.label}
          </div>
        </div>
      ))}
    </motion.div>
  ),

  CallToAction: ({ githubUrl, liveUrl }: { githubUrl?: string; liveUrl?: string }) => (
    <motion.div
      className="flex flex-col sm:flex-row gap-4 my-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {githubUrl && (
        <Button
          as="a"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          className="flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View Code
        </Button>
      )}
      {liveUrl && (
        <Button
          as="a"
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          className="flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Live Demo
        </Button>
      )}
    </motion.div>
  ),

  // Enhanced table
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <motion.div
      className="overflow-x-auto my-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <table className="w-full border-collapse border border-neutral-200 dark:border-neutral-700 rounded-lg" {...props}>
        {children}
      </table>
    </motion.div>
  ),

  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2 text-left font-semibold text-neutral-900 dark:text-white" {...props}>
      {children}
    </th>
  ),

  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-neutral-600 dark:text-neutral-400" {...props}>
      {children}
    </td>
  ),

  // Horizontal rule
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <motion.hr
      className="my-12 border-neutral-200 dark:border-neutral-700"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    />
  ),

  // Enhanced project-specific components
  ProjectGallery: ({ images, title }: { images: string[]; title?: string }) => (
    <motion.div
      className="my-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <ImageWithShimmer
              src={image}
              alt={`${title || 'Project'} screenshot ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  ),

  FeatureList: ({ features }: { features: string[] }) => (
    <motion.div
      className="my-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-3 p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300">{feature}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  ),

  ChallengeSolution: ({ challenge, solution }: { challenge: string; solution: string }) => (
    <motion.div
      className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="p-6 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
        <h4 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          Challenge
        </h4>
        <p className="text-red-700 dark:text-red-300">{challenge}</p>
      </div>
      <div className="p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
        <h4 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Solution
        </h4>
        <p className="text-green-700 dark:text-green-300">{solution}</p>
      </div>
    </motion.div>
  ),

  Quote: ({ text, author }: { text: string; author?: string }) => (
    <motion.blockquote
      className="border-l-4 border-primary-500 pl-6 py-6 bg-primary-50 dark:bg-primary-950/20 rounded-r-lg my-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <p className="text-xl text-neutral-700 dark:text-neutral-300 italic mb-2">
        "{text}"
      </p>
      {author && (
        <cite className="text-sm text-neutral-500 dark:text-neutral-400">
          — {author}
        </cite>
      )}
    </motion.blockquote>
  ),
}
