import { z } from 'zod'

const baseSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 characters')
    .max(15, 'Phone number must be less than 15 characters'),
  clientType: z.enum(['student', 'professional', 'business_owner', 'researcher', 'startup', 'other'], {
    required_error: 'Please select your profession'
  }),
  projectTitle: z.string()
    .min(5, 'Project title must be at least 5 characters')
    .max(200, 'Project title must be less than 200 characters'),
  domain: z.string()
    .min(1, 'Please select a project domain'),
  projectDetails: z.string()
    .min(20, 'Project details must be at least 20 characters')
    .max(2000, 'Project details must be less than 2000 characters'),
  dataset: z.enum(['provided', 'need_help', 'public_source'], {
    required_error: 'Please select a data/requirements availability option'
  }),
  budgetMin: z.coerce.number({
    required_error: 'Please enter minimum budget',
    invalid_type_error: 'Budget must be a number'
  }).refine((val) => !isNaN(val) && val >= 1000, (val) => ({
    message: isNaN(val) ? 'Please enter minimum budget' : 'Minimum budget must be at least ₹1,000'
  })),
  budgetMax: z.coerce.number({
    required_error: 'Please enter maximum budget',
    invalid_type_error: 'Budget must be a number'
  }).refine((val) => !isNaN(val) && val >= 1000, (val) => ({
    message: isNaN(val) ? 'Please enter maximum budget' : 'Maximum budget must be at least ₹1,000'
  })),
  deadline: z.string({
    required_error: 'Please select a deadline'
  }).min(1, 'Please select a deadline'),
})

export const serviceInquirySchema = baseSchema.extend({
  studyYear: z.string().optional(),
}).refine((data) => {
  // If clientType is 'student', studyYear is required
  if (data.clientType === 'student') {
    return data.studyYear && typeof data.studyYear === 'string' && data.studyYear.trim().length > 0
  }
  return true
}, {
  message: 'Please select your study year',
  path: ['studyYear']
}).refine((data) => {
  // Ensure budgetMax is greater than budgetMin
  if (data.budgetMax && data.budgetMin) {
    return data.budgetMax >= data.budgetMin
  }
  return true
}, {
  message: 'Maximum budget must be greater than or equal to minimum budget',
  path: ['budgetMax']
})

export type ServiceInquiryFormData = z.infer<typeof serviceInquirySchema>

