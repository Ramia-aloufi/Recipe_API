
import mongoose from 'mongoose'

import { dev } from './dev.configuration'

export const connectDB = async () => {
  try {
    await mongoose.connect(dev.db.url)
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection failed: ' + error)
  }
}