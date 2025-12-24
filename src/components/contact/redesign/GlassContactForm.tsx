import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Button } from '../../ui/Button'

// Zod schema (Same as original for consistency)
const SUBJECT_MIN_WORDS = 2
const SUBJECT_MAX_LENGTH = 200
const MESSAGE_MIN_WORDS = 5
const MESSAGE_MAX_LENGTH = 2000

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
        // Relaxed validation for better UX on the cinematic form
        .refine(
            (val) => countWords(val) >= SUBJECT_MIN_WORDS,
            `Subject must be at least ${SUBJECT_MIN_WORDS} words`
        ),
    message: z.string()
        .min(1, 'Message is required')
        .max(MESSAGE_MAX_LENGTH, `Message must be less than ${MESSAGE_MAX_LENGTH} characters`)
        // Relaxed validation
        .refine(
            (val) => countWords(val) >= MESSAGE_MIN_WORDS,
            `Message must be at least ${MESSAGE_MIN_WORDS} words`
        ),
    honeypot: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export const GlassContactForm: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    })

    // Watch counters
    const subjectValue = watch('subject', '')
    const messageValue = watch('message', '')
    const subjectWordCount = countWords(subjectValue || '')
    const messageWordCount = countWords(messageValue || '')

    const isFormValid = subjectWordCount >= SUBJECT_MIN_WORDS &&
        messageWordCount >= MESSAGE_MIN_WORDS

    const onSubmit = async (data: ContactFormData) => {
        if (data.honeypot) return

        setIsSubmitting(true)
        setSubmitStatus('idle')
        setErrorMessage('')
        const loadingToast = toast.loading('Sending message...')

        try {
            const apiUrl = import.meta.env.DEV
                ? 'http://localhost:5000/api/submit-form'
                : '/api/submit-form'

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const responseData = await response.json()

            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to send message')
            }

            if (responseData.success) {
                setSubmitStatus('success')
                toast.success('Message sent successfully!', { id: loadingToast })
                reset()
            } else {
                throw new Error('Failed to send message')
            }
        } catch (error: any) {
            console.error('Contact error:', error)
            setSubmitStatus('error')
            setErrorMessage(error.message || 'Network error')
            toast.error(error.message || 'Failed to send message', { id: loadingToast })
        } finally {
            setIsSubmitting(false)
        }
    }

    // --- Cinematic Success View ---
    if (submitStatus === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10 rounded-3xl shadow-xl dark:shadow-none"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                >
                    <span className="text-4xl">✨</span>
                </motion.div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Message Sent!</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-sm">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                    onClick={() => setSubmitStatus('idle')}
                    className="px-6 py-2 rounded-full border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-900 dark:text-white transition-colors"
                >
                    Send Another
                </button>
            </motion.div>
        )
    }

    // --- Cinematic Form View ---
    return (
        <div className="bg-white/80 dark:bg-neutral-900/50 backdrop-blur-md border border-neutral-200 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl transition-colors duration-300">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">Send a Message</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <input type="text" {...register('honeypot')} className="hidden" />

                {/* Grid for Name/Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400 ml-1">Name</label>
                        <input
                            {...register('name')}
                            placeholder="John Doe"
                            className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-white/10 transition-all"
                        />
                        {errors.name && <p className="text-xs text-red-500 dark:text-red-400 ml-1">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400 ml-1">Email</label>
                        <input
                            {...register('email')}
                            placeholder="john@example.com"
                            className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-white/10 transition-all"
                        />
                        {errors.email && <p className="text-xs text-red-500 dark:text-red-400 ml-1">{errors.email.message}</p>}
                    </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400 ml-1">Subject</label>
                    <input
                        {...register('subject')}
                        placeholder={`What's this about? (min ${SUBJECT_MIN_WORDS} words)`}
                        className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-white/10 transition-all"
                    />
                    {errors.subject && <p className="text-xs text-red-500 dark:text-red-400 ml-1">{errors.subject.message}</p>}
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400 ml-1">Message</label>
                    <textarea
                        {...register('message')}
                        rows={5}
                        placeholder={`Tell me about your project... (min ${MESSAGE_MIN_WORDS} words)`}
                        className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-white/10 transition-all resize-none"
                    />
                    {errors.message && <p className="text-xs text-red-500 dark:text-red-400 ml-1">{errors.message.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${isFormValid
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                        }`}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    )
}
