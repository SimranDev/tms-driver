import { LoginResponseDTO } from '../types/dto'
import { api } from './axios'

export const LoginAPI = {
  post: (email: string, password: string): Promise<LoginResponseDTO> => {
    return api.post('/driver-auth/login', { email, password })
  }
}

export const jobsAPI = {
  getJobs: () => api.get('/driver/my-jobs')
}
