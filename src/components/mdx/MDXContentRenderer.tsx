import React from 'react'
import Markdown from 'markdown-to-jsx'
import { MDXComponents } from './ProjectMDXComponents'

interface MDXContentRendererProps {
  content: string
}

// MDX content renderer using markdown-to-jsx for proper markdown parsing
export const MDXContentRenderer: React.FC<MDXContentRendererProps> = ({ content }) => {
  // Preprocess content to ensure bullet points are properly formatted
  const preprocessedContent = content
    .replace(/^- \*\*(.*?)\*\* (.*)$/gm, '- **$1** $2') // Ensure bullet points with bold text are properly formatted
    .replace(/^- (.*)$/gm, '- $1') // Ensure all bullet points are properly formatted

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert mdx-content">
      <Markdown
        options={{
          forceBlock: true,
          forceInline: false,
          overrides: {
            // Headers with auto-generated IDs for TOC
            h1: {
              component: ({ children, ...props }: any) => {
                const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                return (
                  <h1 id={id} className="text-3xl font-bold text-neutral-900 dark:text-white mt-16 mb-8" {...props}>
                    {children}
                  </h1>
                )
              }
            },
            h2: {
              component: ({ children, ...props }: any) => {
                const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                return (
                  <h2 id={id} className="text-2xl font-bold text-neutral-900 dark:text-white mt-4 mb-6" {...props}>
                    {children}
                  </h2>
                )
              }
            },
            h3: {
              component: ({ children, ...props }: any) => {
                const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                return (
                  <h3 id={id} className="text-xl font-semibold text-neutral-900 dark:text-white mt-8 mb-4" {...props}>
                    {children}
                  </h3>
                )
              }
            },
            h4: {
              component: ({ children, ...props }: any) => {
                const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                return (
                  <h4 id={id} className="text-lg font-semibold text-neutral-900 dark:text-white mt-6 mb-3" {...props}>
                    {children}
                  </h4>
                )
              }
            },
            // Paragraphs
            p: {
              component: 'p',
              props: {
                className: 'mb-4 leading-relaxed text-neutral-700 dark:text-neutral-300'
              }
            },
            // Lists
            ul: {
              component: ({ children, ...props }: any) => (
                <ul className="list-disc list-inside mb-6 space-y-2 text-neutral-700 dark:text-neutral-300" {...props}>
                  {children}
                </ul>
              )
            },
            ol: {
              component: ({ children, ...props }: any) => (
                <ol className="list-decimal list-inside mb-6 space-y-2 text-neutral-700 dark:text-neutral-300" {...props}>
                  {children}
                </ol>
              )
            },
            li: {
              component: ({ children, ...props }: any) => (
                <li className="mb-2" {...props}>
                  {children}
                </li>
              )
            },
            // Code blocks
            pre: {
              component: 'pre',
              props: {
                className: 'bg-neutral-900 dark:bg-neutral-800 text-neutral-50 rounded-lg p-4 overflow-x-auto text-sm my-6'
              }
            },
            // Links
            a: {
              component: 'a',
              props: {
                className: 'text-primary-600 dark:text-primary-400 hover:underline',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            },
            // Strong/Bold
            strong: {
              component: 'strong',
              props: {
                className: 'font-semibold text-neutral-900 dark:text-white'
              }
            },
            // Emphasis/Italic
            em: {
              component: 'em',
              props: {
                className: 'italic'
              }
            },
            // Blockquotes
            blockquote: {
              component: 'blockquote',
              props: {
                className: 'border-l-4 border-primary-500 pl-4 italic text-neutral-600 dark:text-neutral-400 my-6'
              }
            },
            // Tables
            table: {
              component: 'table',
              props: {
                className: 'w-full border-collapse border border-neutral-300 dark:border-neutral-600 my-6'
              }
            },
            th: {
              component: 'th',
              props: {
                className: 'border border-neutral-300 dark:border-neutral-600 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 font-semibold text-left'
              }
            },
            td: {
              component: 'td',
              props: {
                className: 'border border-neutral-300 dark:border-neutral-600 px-4 py-2'
              }
            }
          }
        }}
      >
        {preprocessedContent}
      </Markdown>
    </div>
  )
}
