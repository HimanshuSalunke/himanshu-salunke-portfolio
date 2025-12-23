import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { serviceInquirySchema, type ServiceInquiryFormData } from '../../lib/validations/serviceInquirySchema'

const studyYears = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Masters',
  'PhD',
  'Working Professional'
]

export const ServiceInquiryForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<ServiceInquiryFormData>({
    resolver: zodResolver(serviceInquirySchema)
  })

  // Logic for conditional fields
  const clientType = watch('clientType')
  const isStudent = clientType === 'student'

  useEffect(() => {
    if (!isStudent) setValue('studyYear', '')
  }, [isStudent, setValue])

  const onSubmit = async (data: ServiceInquiryFormData) => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Inquiry submitted successfully!')
      reset()
      setSelectedFiles([])
    } catch (e) {
      toast.error('Failed to submit inquiry')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  return (
    <section id="inquiry-form" className="py-32 bg-neutral-50 dark:bg-[#050505] relative border-t border-neutral-200 dark:border-neutral-900 font-mono transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Start Your Project
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
            Fill out the details below so I can understand your requirements.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 md:p-12 shadow-2xl dark:shadow-none backdrop-blur-sm relative overflow-hidden"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-6">

            {/* Identity Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputGroup label="Full Name *" error={errors.name?.message}>
                <input {...register('name')} placeholder="John Doe" className="input-field" />
              </InputGroup>
              <InputGroup label="Email Address *" error={errors.email?.message}>
                <input {...register('email')} placeholder="john@example.com" className="input-field" />
              </InputGroup>
              <InputGroup label="Phone Number" error={errors.phone?.message}>
                <input {...register('phone')} placeholder="+1 (555) 000-0000" className="input-field" />
              </InputGroup>
              <InputGroup label="Profession *" error={errors.clientType?.message}>
                <select {...register('clientType')} className="input-field">
                  <option value="">Select profession</option>
                  <option value="student">Student / Researcher</option>
                  <option value="professional">Working Professional</option>
                  <option value="business">Business Owner</option>
                  <option value="startup">Startup Founder</option>
                  <option value="other">Other</option>
                </select>
              </InputGroup>
            </div>

            {/* Conditional Student Section */}
            {isStudent && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <InputGroup label="Academic Year *" error={errors.studyYear?.message}>
                  <select {...register('studyYear')} className="input-field">
                    <option value="">Select Year</option>
                    {studyYears.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </InputGroup>
              </motion.div>
            )}

            {/* Project Info */}
            <div className="space-y-6">
              <InputGroup label="Project Title *" error={errors.projectTitle?.message}>
                <input {...register('projectTitle')} placeholder="e.g. Finance Dashboard" className="input-field" />
              </InputGroup>

              <InputGroup label="Project Domain *" error={errors.domain?.message}>
                <div className="grid grid-cols-2 gap-3">
                  {['AI & Machine Learning', 'Data Science & Analytics', 'Computer Vision', 'Natural Language Processing', 'Deep Learning', 'Other'].map((d) => (
                    <label key={d} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" value={d} {...register('domain')} className="sr-only peer" />
                      <div className="w-4 h-4 rounded-full border border-neutral-300 dark:border-neutral-700 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400 peer-checked:text-neutral-900 dark:peer-checked:text-white">{d}</span>
                    </label>
                  ))}
                </div>
              </InputGroup>

              <InputGroup label="Project Details *" error={errors.projectDetails?.message}>
                <textarea {...register('projectDetails')} rows={5} placeholder="Describe what you want to build..." className="input-field resize-none rounded-xl" />
              </InputGroup>
            </div>

            {/* Data & Resources */}
            <InputGroup label="Data Availability *" error={errors.dataset?.message}>
              <div className="space-y-3">
                {[
                  { val: 'provided', txt: 'I have my own data/requirements' },
                  { val: 'need_help', txt: 'I need help with data/requirements' },
                  { val: 'public_source', txt: 'I want to use public data/sources' }
                ].map((opt) => (
                  <label key={opt.val} className="flex items-center gap-3 cursor-pointer group p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                    <input type="radio" value={opt.val} {...register('dataset')} className="sr-only peer" />
                    <div className="w-4 h-4 rounded-full border border-neutral-300 dark:border-neutral-700 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">{opt.txt}</span>
                  </label>
                ))}
              </div>
            </InputGroup>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputGroup label="Budget (Min)" error={errors.budgetMin?.message}>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium z-10 pointer-events-none">₹</span>
                  <input type="number" {...register('budgetMin')} className="input-field !pl-12" placeholder="0000" />
                </div>
              </InputGroup>
              <InputGroup label="Budget (Max)" error={errors.budgetMax?.message}>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium z-10 pointer-events-none">₹</span>
                  <input type="number" {...register('budgetMax')} className="input-field !pl-12" placeholder="9999" />
                </div>
              </InputGroup>
              <InputGroup label="Deadline" error={errors.deadline?.message}>
                <input type="date" {...register('deadline')} className="input-field dark:[color-scheme:dark]" />
              </InputGroup>
            </div>

            {/* Attachments */}
            <InputGroup label="Additional Files">
              <div className="relative border-2 border-dashed border-neutral-300 dark:border-neutral-800 hover:border-blue-500/50 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 rounded-xl p-8 transition-all text-center group cursor-pointer">
                <input type="file" multiple onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-500 mb-2 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">Click to upload files</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Max 5 files (50MB total)</p>
                </div>
              </div>
              {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {selectedFiles.map((f, i) => (
                    <div key={i} className="flex justify-between items-center text-sm p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg">
                      <span className="text-neutral-700 dark:text-neutral-300 truncate max-w-[200px]">{f.name}</span>
                      <span className="text-neutral-500 text-xs">{(f.size / 1024).toFixed(1)}KB</span>
                    </div>
                  ))}
                </div>
              )}
            </InputGroup>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99] mt-8 shadow-lg text-lg"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Inquiry</span>
              )}
            </button>

          </form>
        </motion.div>
      </div>

      <style>{`
            .input-field {
                width: 100%;
                background-color: transparent;
                border: 1px solid;
                border-color: #e5e5e5;
                border-radius: 0.75rem;
                padding: 1rem;
                color: #171717;
                font-size: 0.875rem;
                font-family: monospace;
                transition: all 0.2s;
            }
            .dark .input-field {
                background-color: #0a0a0a;
                border-color: #262626;
                color: white;
            }
            .input-field:focus {
                border-color: #3b82f6;
                outline: none;
                ring: 2px solid rgba(59, 130, 246, 0.1);
            }
            .dark .input-field:focus {
                border-color: #3b82f6;
            }
            .input-field::placeholder {
                color: #a3a3a3;
            }
            .dark .input-field::placeholder {
                color: #525252;
            }
        `}</style>
    </section>
  )
}

const InputGroup: React.FC<{ label: string, error?: string, children: React.ReactNode }> = ({ label, error, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</label>
    {children}
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
)
