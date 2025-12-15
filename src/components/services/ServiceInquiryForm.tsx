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
    <motion.div
      id="inquiry-form"
      className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              placeholder="Your full name"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
              placeholder="your.email@example.com"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="+91 98765 43210"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white ${
                errors.phone ? 'border-red-500' : ''
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="clientType" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Profession *
            </label>
            <select
              id="clientType"
              {...register('clientType')}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white ${
                errors.clientType ? 'border-red-500' : ''
              }`}
            >
              <option value="">Select your profession</option>
              {clientTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            {errors.clientType && (
              <p className="text-red-500 text-sm mt-1">{errors.clientType.message}</p>
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
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white ${
                errors.studyYear ? 'border-red-500' : ''
              }`}
            >
              <option value="">Select your year</option>
              {studyYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.studyYear && (
              <p className="text-red-500 text-sm mt-1">{errors.studyYear.message}</p>
            )}
          </div>
        )}

        {/* Project Information */}
        <div>
          <label htmlFor="projectTitle" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Project Title *
          </label>
          <input
            id="projectTitle"
            type="text"
            {...register('projectTitle')}
            placeholder="e.g., AI Chatbot with Document Retrieval"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white ${
              errors.projectTitle ? 'border-red-500' : ''
            }`}
          />
          {errors.projectTitle && (
            <p className="text-red-500 text-sm mt-1">{errors.projectTitle.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Project Domain *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {domains.map((domain) => (
              <label key={domain} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700">
                <input
                  type="radio"
                  value={domain}
                  {...register('domain')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">{domain}</span>
              </label>
            ))}
          </div>
          {errors.domain && (
            <p className="text-red-500 text-sm mt-1">{errors.domain.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="projectDetails" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Project Details *
          </label>
          <textarea
            id="projectDetails"
            rows={6}
            {...register('projectDetails')}
            placeholder="Describe your project requirements, features needed, and any specific technologies you'd like to use..."
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white resize-none ${
              errors.projectDetails ? 'border-red-500' : ''
            }`}
          />
          {errors.projectDetails && (
            <p className="text-red-500 text-sm mt-1">{errors.projectDetails.message}</p>
          )}
        </div>

        {/* Data/Requirements Information */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Data/Requirements Availability *
          </label>
          <div className="space-y-2">
            {datasetOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700">
                <input
                  type="radio"
                  value={option.value}
                  {...register('dataset')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.dataset && (
            <p className="text-red-500 text-sm mt-1">{errors.dataset.message}</p>
          )}
        </div>

        {/* Budget and Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="budgetMin" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Budget Range (Min) *
            </label>
            <input
              id="budgetMin"
              type="number"
              {...register('budgetMin', { valueAsNumber: true })}
              placeholder="3000"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white ${
                errors.budgetMin ? 'border-red-500' : ''
              }`}
            />
            {errors.budgetMin && (
              <p className="text-red-500 text-sm mt-1">{errors.budgetMin.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="budgetMax" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Budget Range (Max) *
            </label>
            <input
              id="budgetMax"
              type="number"
              {...register('budgetMax', { valueAsNumber: true })}
              placeholder="15000"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white ${
                errors.budgetMax ? 'border-red-500' : ''
              }`}
            />
            {errors.budgetMax && (
              <p className="text-red-500 text-sm mt-1">{errors.budgetMax.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Deadline *
            </label>
            <input
              id="deadline"
              type="date"
              {...register('deadline')}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white ${
                errors.deadline ? 'border-red-500' : ''
              }`}
            />
            {errors.deadline && (
              <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>
            )}
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label htmlFor="files" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Additional Files (Optional)
          </label>
          <div className="relative">
            <input
              id="files"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.zip,.rar"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-neutral-50 dark:bg-neutral-700/50">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {selectedFiles.length > 0
                      ? `${selectedFiles.length} file(s) selected`
                      : 'Click to upload or drag and drop'
                    }
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    PDF, DOC, DOCX, TXT, ZIP, RAR (Max 5 files, 50MB total)
                  </p>
                </div>
              </div>
            </div>
          </div>
          {fileError && (
            <p className="text-red-500 text-sm mt-2">{fileError}</p>
          )}
          {selectedFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Selected files:</p>
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-700 rounded">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">{file.name}</span>
                    <span className="text-xs text-neutral-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Project Inquiry'
          )}
        </Button>

        <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
          By submitting this form, you agree that I'll contact you about your project inquiry.
        </p>
      </form>
    </motion.div>
  )
}

