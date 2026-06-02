import { format } from 'date-fns'

export const formatDate = (value) => {
  try {
    return format(new Date(value), 'PPP')
  } catch {
    return 'Unknown date'
  }
}
