import { z } from 'zod'

export const serviceInquirySchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z.string().optional(),
  studyYear: z.string().optional(),
  projectTitle: z.string()
    .min(5, 'Project title must be at least 5 characters')
    .max(200, 'Project title must be less than 200 characters'),
  domain: z.string().optional(),
  projectDetails: z.string()
    .min(20, 'Project details must be at least 20 characters')
    .max(2000, 'Project details must be less than 2000 characters'),
  dataset: z.enum(['provided', 'need_help', 'public_source']).optional(),
  budgetMin: z.number().min(1000, 'Minimum budget must be at least ₹1,000').optional(),
  budgetMax: z.number().min(1000, 'Maximum budget must be at least ₹1,000').optional(),
  deadline: z.string().optional(),
})

export type ServiceInquiryFormData = z.infer<typeof serviceInquirySchema>

