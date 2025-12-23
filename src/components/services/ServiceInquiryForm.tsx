import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Button } from '../ui/Button'
import { serviceInquirySchema, type ServiceInquiryFormData } from '../../lib/validations/serviceInquirySchema'

const domains = [
  'AI & Machine Learning',
  'Data Science & Analytics',
  'Computer Vision',
  'Natural Language Processing',
  'Deep Learning',
  'Other'
]

const clientTypes = [
  { value: 'student', label: 'Student' },
  { value: 'professional', label: 'Professional' },
  { value: 'business_owner', label: 'Business Owner' },
  { value: 'researcher', label: 'Researcher' },
  { value: 'startup', label: 'Startup' },
  { value: 'other', label: 'Other' }
]

const studyYears = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Masters',
  'PhD',
  'Working Professional'
]

const datasetOptions = [
  { value: 'provided', label: 'I have my own data/requirements' },
  { value: 'need_help', label: 'I need help with data/requirements' },
  { value: 'public_source', label: 'I want to use public data/sources' }
]

export const ServiceInquiryForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ServiceInquiryFormData>({
    resolver: zodResolver(serviceInquirySchema)
  })

  const selectedClientType = watch('clientType')
  const isStudent = selectedClientType === 'student'

  // Clear studyYear when clientType changes from student to something else
  useEffect(() => {
    if (!isStudent) {
      setValue('studyYear', '')
    }
  }, [isStudent, setValue])

  const validateFiles = (files: File[]) => {
    setFileError('')

    if (files.length > 5) {
      setFileError('Maximum 5 files allowed')
      return false
    }

    const totalSize = files.reduce((sum, file) => sum + file.size, 0)
    const maxSize = 50 * 1024 * 1024 // 50MB

    if (totalSize > maxSize) {
      setFileError('Total file size must be less than 50MB')
      return false
    }

    return true
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])

    const allFiles = [...selectedFiles, ...newFiles]

    if (validateFiles(allFiles)) {
      setSelectedFiles(allFiles)
    }

    e.target.value = ''
  }

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ServiceInquiryFormData) => {
    setIsSubmitting(true)

    try {
      const formData = new FormData()

      Object.keys(data).forEach(key => {
        const value = data[key as keyof ServiceInquiryFormData]
        if (value !== undefined && value !== null) {
          if (typeof value === 'number') {
            formData.append(key, value.toString())
          } else {
            formData.append(key, String(value))
          }
        }
      })

      selectedFiles.forEach((file) => {
        formData.append('files', file)
      })

      const apiUrl = import.meta.env.DEV
        ? 'http://localhost:5000/api/service-inquiry'
        : '/api/service-inquiry'

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      })

      const responseData = await response.json()

      if (!response.ok) {
        // Handle validation errors
        if (response.status === 400 && responseData.details) {
          const errorDetails = Array.isArray(responseData.details)
            ? responseData.details.join(', ')
            : responseData.error || 'Validation failed'
          toast.error(errorDetails, {
            duration: 5000,
          })
          return
        }

        throw new Error(responseData.error || 'Failed to submit inquiry')
      }

      toast.success('Thanks! I\'ll get back to you within 24 hours with a quote.', {
        duration: 5000,
      })

      reset()
      setSelectedFiles([])
    } catch (error) {
      console.error('Error submitting form:', error)
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again or contact me directly.'
      toast.error(errorMessage, {
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id="inquiry-form" className="relative">
      {/* Abstract Background Elements for Form Section */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side: Contact Info & Visuals */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative lg:sticky lg:top-24 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 sm:p-10 text-white overflow-hidden shadow-2xl h-fit"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl -ml-16 -mb-16" />

          <div className="relative z-10 flex flex-col justify-between gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-4">Ready to Build Something Amazing?</h3>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Whether you need a custom AI agent, a complex data pipeline, or a full-stack application, I'm here to help you turn your vision into reality.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Email Me</p>
                    <p className="text-white font-semibold">contact.himanshusalunke@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Response Time</p>
                    <p className="text-white font-semibold">Within 24 Hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-blue-100 italic">
                "Code is poetry written for machines."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: The Form */}
        <motion.div
          className="bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-neutral-200 dark:border-neutral-800"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white dark:bg-neutral-950/50 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white dark:bg-neutral-950/50 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white dark:bg-neutral-950/50 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="clientType" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Profession *
                </label>
                <select
                  id="clientType"
                  {...register('clientType')}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white dark:bg-neutral-950/50 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white ${errors.clientType ? 'border-red-500 focus:ring-red-500' : ''}`}
                >
                  <option value="">Select profession</option>
                  {clientTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                {errors.clientType && (
                  <p className="text-red-500 text-xs mt-1">{errors.clientType.message}</p>
                )}
              </div>
            </div>

            {isStudent && (
              <div>
                <label htmlFor="studyYear" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Study Year *
                </label>
                <select
                  id="studyYear"
                  {...register('studyYear', { required: isStudent ? 'Please select your study year' : false })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white dark:bg-neutral-950/50 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white ${errors.studyYear ? 'border-red-500 focus:ring-red-500' : ''}`}
                >
                  <option value="">Select year</option>
                  {studyYears.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.studyYear && (
                  <p className="text-red-500 text-xs mt-1">{errors.studyYear.message}</p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="projectTitle" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Project Title *
              </label>
              <input
                id="projectTitle"
                type="text"
                {...register('projectTitle')}
                placeholder="e.g. Finance Dashboard Dashboard"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white dark:bg-neutral-950/50 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 ${errors.projectTitle ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.projectTitle && (
                <p className="text-red-500 text-xs mt-1">{errors.projectTitle.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Project Domain *
              </label>
              <div className="flex flex-wrap gap-2">
                {domains.map((domain) => (
                  <label key={domain} className="cursor-pointer">
                    <input
                      type="radio"
                      value={domain}
                      {...register('domain')}
                      className="peer sr-only"
                    />
                    <span className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm text-neutral-600 dark:text-neutral-400 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 transition-all">
                      {domain}
                    </span>
                  </label>
                ))}
              </div>
              {errors.domain && (
                <p className="text-red-500 text-xs mt-1">{errors.domain.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="projectDetails" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Project Details *
              </label>
              <textarea
                id="projectDetails"
                rows={4}
                {...register('projectDetails')}
                placeholder="Describe what you want to build..."
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white dark:bg-neutral-950/50 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white resize-none placeholder-neutral-400 dark:placeholder-neutral-500 ${errors.projectDetails ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.projectDetails && (
                <p className="text-red-500 text-xs mt-1">{errors.projectDetails.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Data Availability *
              </label>
              <div className="space-y-2">
                {datasetOptions.map((option) => (
                  <label key={option.value} className="flex items-center p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      value={option.value}
                      {...register('dataset')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-neutral-700 dark:text-neutral-300">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.dataset && (
                <p className="text-red-500 text-xs mt-1">{errors.dataset.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Budget (Min)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-neutral-500">₹</span>
                  <input
                    type="number"
                    {...register('budgetMin')}
                    className={`w-full pl-8 pr-4 py-3 border rounded-xl bg-white dark:bg-neutral-950/50 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 ${errors.budgetMin ? 'border-red-500' : ''}`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Budget (Max)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-neutral-500">₹</span>
                  <input
                    type="number"
                    {...register('budgetMax')}
                    className={`w-full pl-8 pr-4 py-3 border rounded-xl bg-white dark:bg-neutral-950/50 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 ${errors.budgetMax ? 'border-red-500' : ''}`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Deadline</label>
              <input
                type="date"
                {...register('deadline')}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-neutral-950/50 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white dark:[color-scheme:dark] ${errors.deadline ? 'border-red-500' : ''}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Additional Files</label>
              <div className="relative border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl p-6 transition-colors bg-neutral-50 dark:bg-neutral-900/30 text-center">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.zip,.rar"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  </div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">Click to upload files</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Max 5 files (50MB total)</p>
                </div>
              </div>
              {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm p-2 bg-neutral-100 dark:bg-neutral-800 rounded">
                      <span className="truncate text-neutral-700 dark:text-neutral-300">{file.name}</span>
                      <button type="button" onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                    </div>
                  ))}
                </div>
              )}
              {fileError && <p className="text-red-500 text-xs mt-2">{fileError}</p>}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-lg font-bold shadow-lg shadow-blue-600/20"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
            </Button>

          </form>
        </motion.div>
      </div>
    </div>
  )
}

