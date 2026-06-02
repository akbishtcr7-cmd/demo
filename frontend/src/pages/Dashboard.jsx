import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { PageContainer } from '../components/common/PageContainer'
import { useFetch } from '../hooks/useFetch'
import { fetchDashboardStats } from '../services/authService'
import { Loader } from '../components/ui/Loader'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { formatDate } from '../utils/formatDate'

const Dashboard = () => {
  const { data, loading, error } = useFetch(fetchDashboardStats, [])

  const stats = useMemo(
    () => data?.stats ?? [
      { label: 'Active users', value: '—' },
      { label: 'Monthly visits', value: '—' },
      { label: 'Tasks completed', value: '—' },
    ],
    [data],
  )

  return (
    <PageContainer title="Dashboard" description="Monitor your app metrics and account overview in one place.">
      {loading && <Loader />}
      {error && <ErrorMessage message={error?.message ?? 'Unable to load dashboard data.'} />}
      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
              <p className="mt-4 text-3xl font-semibold text-slate-100">{item.value}</p>
              {item.updatedAt ? <p className="mt-3 text-sm text-slate-500">Updated {formatDate(item.updatedAt)}</p> : null}
            </motion.div>
          ))}
        </div>
      )}
    </PageContainer>
  )
}

export default Dashboard
