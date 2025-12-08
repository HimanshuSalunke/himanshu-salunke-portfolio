import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Button } from '../ui/Button'
import { SiLinkedin, SiGithub } from 'react-icons/si'
import { HiMail, HiClock, HiGlobe } from 'react-icons/hi'
import { FaBookOpen } from 'react-icons/fa'

// Zod schema for form validation
const SUBJECT_MIN_WORDS = 10
const SUBJECT_MAX_LENGTH = 200
const MESSAGE_MIN_WORDS = 20
const MESSAGE_MAX_LENGTH = 2000

// Helper function to count words
const countWords = (text: string): number => {
  if (!text || text.trim().length === 0) return 0
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters') 
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  subject: z.string()
    .min(1, 'Subject is required')
    .max(SUBJECT_MAX_LENGTH, `Subject must be less than ${SUBJECT_MAX_LENGTH} characters`)
    .refine(
      (val) => countWords(val) >= SUBJECT_MIN_WORDS,
      `Subject must contain at least ${SUBJECT_MIN_WORDS} words`
    ),
  message: z.string()
    .min(1, 'Message is required')
    .max(MESSAGE_MAX_LENGTH, `Message must be less than ${MESSAGE_MAX_LENGTH} characters`)
    .refine(
      (val) => countWords(val) >= MESSAGE_MIN_WORDS,
      `Message must contain at least ${MESSAGE_MIN_WORDS} words`
    ),
  honeypot: z.string().optional(), // Anti-spam field
})

type ContactFormData = z.infer<typeof contactFormSchema>

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [subjectLength, setSubjectLength] = useState(0)
  const [subjectWordCount, setSubjectWordCount] = useState(0)
  const [messageLength, setMessageLength] = useState(0)
  const [messageWordCount, setMessageWordCount] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  // Watch fields for character counters
  const subjectValue = watch('subject', '')
  const messageValue = watch('message', '')
  
  useEffect(() => {
    setSubjectLength(subjectValue?.length || 0)
    setSubjectWordCount(countWords(subjectValue || ''))
  }, [subjectValue])
  
  useEffect(() => {
    setMessageLength(messageValue?.length || 0)
    setMessageWordCount(countWords(messageValue || ''))
  }, [messageValue])

  // Check if form is valid for submit button
  const isFormValid = subjectWordCount >= SUBJECT_MIN_WORDS && 
                      messageWordCount >= MESSAGE_MIN_WORDS &&
                      subjectLength <= SUBJECT_MAX_LENGTH &&
                      messageLength <= MESSAGE_MAX_LENGTH

  const onSubmit = async (data: ContactFormData) => {
    // Check honeypot field
    if (data.honeypot) {
      toast.error('Spam detected')
      return // Bot detected, silently ignore
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    // Show loading toast
    const loadingToast = toast.loading('Sending message...')

    try {
      // Use API endpoint directly to get proper error handling
      // In development, use the Express server; in production, use Vercel API route
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:5000/api/submit-form'
        : '/api/submit-form'
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          honeypot: data.honeypot || '',
        }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        // Handle validation errors from API
        if (response.status === 400 && responseData.details) {
          const errorDetails = Array.isArray(responseData.details) 
            ? responseData.details.join(', ')
            : responseData.error || 'Validation failed'
          setSubmitStatus('error')
          setErrorMessage(errorDetails)
          toast.error(errorDetails, {
            id: loadingToast,
            duration: 5000,
          })
          return
        }
        
        // Handle rate limiting
        if (response.status === 429) {
          setSubmitStatus('error')
          setErrorMessage(responseData.error || 'Too many requests. Please try again later.')
          toast.error(responseData.error || 'Too many requests. Please try again later.', {
            id: loadingToast,
            duration: 5000,
          })
          return
        }

        // Other errors
        setSubmitStatus('error')
        setErrorMessage(responseData.error || 'Failed to send message. Please try again.')
        toast.error(responseData.error || 'Failed to send message. Please try again.', {
          id: loadingToast,
          duration: 5000,
        })
        return
      }

      // Success - check if notifications were actually sent
      if (responseData.success) {
        const notifications = responseData.notifications || {}
        
        if (notifications.slack || notifications.email) {
          setSubmitStatus('success')
          toast.success('Message sent successfully! I\'ll get back to you soon.', {
            id: loadingToast,
            duration: 5000,
          })
          reset()
          setSubjectLength(0)
          setSubjectWordCount(0)
          setMessageLength(0)
          setMessageWordCount(0)
        } else {
          // Neither notification method worked
          setSubmitStatus('error')
          setErrorMessage('Failed to send message. Please try again or contact me directly via email.')
          toast.error('Failed to send message. Please try again or contact me directly via email.', {
            id: loadingToast,
            duration: 5000,
          })
        }
      } else {
        setSubmitStatus('error')
        setErrorMessage('Failed to send message. Please try again.')
        toast.error('Failed to send message. Please try again.', {
          id: loadingToast,
          duration: 5000,
        })
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
      toast.error('Network error. Please check your connection and try again.', {
        id: loadingToast,
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <motion.div
        className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <motion.div
            className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white mb-2">
            Message Sent Successfully! 🎉
          </h3>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-3 sm:mb-4">
            Thank you for reaching out! I've received your message and will get back to you within 24 hours.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="text-blue-600 dark:text-blue-400 text-base sm:text-lg">📧</div>
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1 text-sm sm:text-base">
                  What happens next?
                </h4>
                <ul className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• I'll review your message and project requirements</li>
                  <li>• You'll receive a detailed response within 24 hours</li>
                  <li>• We can schedule a free consultation call if needed</li>
                </ul>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setSubmitStatus('idle')}
            variant="outline"
            size="sm"
          >
            Send Another Message  
          </Button>
        </div>
      </motion.div>
    )
  } 

  return (
    <motion.div
      className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-3 sm:mb-4">
          Get In Touch
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          Always excited to connect with new people. Feel free to reach out about projects, new opportunities, or anything else.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Contact Form - Left Side */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          {...register('honeypot')}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 sm:mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            {...register('name')}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.name 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-neutral-300 dark:border-neutral-600'
            } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white dark:placeholder-neutral-400 text-sm sm:text-base`}
            placeholder="Your full name"
            autoComplete="name"
          />
          {errors.name && (
            <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 sm:mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            {...register('email')}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.email 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-neutral-300 dark:border-neutral-600'
            } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white dark:placeholder-neutral-400 text-sm sm:text-base`}
            placeholder="your.email@example.com"
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 sm:mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            {...register('subject')}
            maxLength={SUBJECT_MAX_LENGTH}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.subject 
                ? 'border-red-500 dark:border-red-400' 
                : subjectLength > SUBJECT_MAX_LENGTH
                ? 'border-red-500 dark:border-red-400'
                : subjectWordCount > 0 && subjectWordCount < SUBJECT_MIN_WORDS
                ? 'border-amber-500 dark:border-amber-400'
                : 'border-neutral-300 dark:border-neutral-600'
            } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white dark:placeholder-neutral-400 text-sm sm:text-base`}
            placeholder={`What's this about? (minimum ${SUBJECT_MIN_WORDS} words required)`}
            autoComplete="off"
          />
          {/* Character and Word Counter */}
          <div className="mt-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {errors.subject && (
                  <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">
                    {errors.subject.message}
                  </p>
                )}
                {subjectWordCount > 0 && subjectWordCount < SUBJECT_MIN_WORDS && !errors.subject && (
                  <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-400">
                    Please enter at least {SUBJECT_MIN_WORDS} words (currently: {subjectWordCount} words)
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-xs sm:text-sm ${
                  subjectWordCount < SUBJECT_MIN_WORDS 
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-green-600 dark:text-green-400'
                }`}>
                  {subjectWordCount} / {SUBJECT_MIN_WORDS} words
                  {subjectWordCount < SUBJECT_MIN_WORDS && (
                    <span className="ml-1">(min required)</span>
                  )}
                </span>
                <span className={`text-xs sm:text-sm ${
                  subjectLength > SUBJECT_MAX_LENGTH
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}>
                  {subjectLength} / {SUBJECT_MAX_LENGTH} characters
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 sm:mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            {...register('message')}
            maxLength={MESSAGE_MAX_LENGTH}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical ${
              errors.message 
                ? 'border-red-500 dark:border-red-400' 
                : messageLength > MESSAGE_MAX_LENGTH
                ? 'border-red-500 dark:border-red-400'
                : messageWordCount > 0 && messageWordCount < MESSAGE_MIN_WORDS
                ? 'border-amber-500 dark:border-amber-400'
                : 'border-neutral-300 dark:border-neutral-600'
            } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white dark:placeholder-neutral-400 text-sm sm:text-base`}
            placeholder={`Tell me about your project or how I can help... (minimum ${MESSAGE_MIN_WORDS} words required)`}
            autoComplete="off"
          />
          {/* Character and Word Counter */}
          <div className="mt-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {errors.message && (
                  <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">
                    {errors.message.message}
                  </p>
                )}
                {messageWordCount > 0 && messageWordCount < MESSAGE_MIN_WORDS && !errors.message && (
                  <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-400">
                    Please enter at least {MESSAGE_MIN_WORDS} words (currently: {messageWordCount} words)
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-xs sm:text-sm ${
                  messageWordCount < MESSAGE_MIN_WORDS 
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-green-600 dark:text-green-400'
                }`}>
                  {messageWordCount} / {MESSAGE_MIN_WORDS} words
                  {messageWordCount < MESSAGE_MIN_WORDS && (
                    <span className="ml-1">(min required)</span>
                  )}
                </span>
                <span className={`text-xs sm:text-sm ${
                  messageLength > MESSAGE_MAX_LENGTH
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}>
                  {messageLength} / {MESSAGE_MAX_LENGTH} characters
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {submitStatus === 'error' && (
          <motion.div
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 sm:p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">
                {errorMessage}
              </p>
            </div>
          </motion.div>
        )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting || !isFormValid}
              className="w-full"
              title={!isFormValid ? `Please ensure subject has at least ${SUBJECT_MIN_WORDS} words and message has at least ${MESSAGE_MIN_WORDS} words` : 'Send message'}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                'Send Message'
              )}
            </Button>
          </form>
        </div>

        {/* Contact Information - Right Side */}
        <div className="space-y-4 sm:space-y-6">
          {/* Contact & Response Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-600">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">Contact & Response</h3>
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
               {/* Contact Info */}
               <div className="space-y-2 sm:space-y-3">
                 <div className="flex items-center gap-2 sm:gap-3">
                   <HiMail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                   <div>
                     <span className="text-neutral-700 dark:text-neutral-200">Email:</span>
                     <a 
                       href="mailto:contact.himanshusalunke@gmail.com" 
                       className="block text-primary-600 dark:text-blue-300 hover:underline font-medium text-xs sm:text-sm break-all"
                     >
                       contact.himanshusalunke@gmail.com
                     </a>
                   </div>
                 </div>
                 <div className="flex items-center gap-2 sm:gap-3">
                   <SiLinkedin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                   <div>
                     <span className="text-neutral-700 dark:text-neutral-200">LinkedIn:</span>
                     <a 
                       href="https://www.linkedin.com/in/himanshuksalunke/" 
                       target="_blank"
                       rel="noopener noreferrer"
                       className="block text-primary-600 dark:text-blue-300 hover:underline font-medium text-xs sm:text-sm"
                     >
                       Connect with me
                     </a>
                   </div>
                 </div>
               </div>
              
               {/* Response Info */}
               <div className="pt-2 sm:pt-3 border-t border-blue-200 dark:border-blue-600">
                 <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                   <HiClock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                   <span className="text-neutral-700 dark:text-neutral-200">Response time: Within 24 hours</span>
                 </div>
                 <div className="flex items-center gap-2 sm:gap-3">
                   <HiGlobe className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                   <span className="text-neutral-700 dark:text-neutral-200">Timezone: IST (Indian Standard Time)</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-600">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">Quick Actions</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div>
                <a 
                  href="/articles" 
                  className="flex items-center gap-2 sm:gap-3 text-primary-600 dark:text-blue-300 hover:underline font-medium"
                >
                  <FaBookOpen className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  Read My Articles
                </a>
              </div>
              <div>
                <a 
                  href="https://github.com/HimanshuSalunke" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 text-primary-600 dark:text-blue-300 hover:underline font-medium"
                >
                  <SiGithub className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  View My GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  )
}
