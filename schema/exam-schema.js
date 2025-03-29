import { z } from 'zod';

const examSchema = z.object({
    university: z.string(),
    subject: z.string(),
    course: z.number().min(0),
    date: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) {
          return new Date(arg);
        }
      }, z.date()),
    professor: z.string(),
    locaiton: z.string(),
}) 