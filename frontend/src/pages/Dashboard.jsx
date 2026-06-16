import { motion } from 'framer-motion'
import { PageContainer } from '../components/common/PageContainer'
import { useFetch } from '../hooks/useFetch'
import { fetchProfileRequest } from '../services/authService'
import { Loader } from '../components/ui/Loader'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { formatDate } from '../utils/formatDate'
import { useAuth } from '../hooks/useAuth'

const Dashboard = () => {
  const { setAuthUser } = useAuth()
  const { data, loading, error } = useFetch(async () => {
    const profile = await fetchProfileRequest()

    if (profile.user) {
      setAuthUser(profile.user)
    }

    return profile
  }, [])

  const user = data?.user

  return (
    <PageContainer title="Dashboard" description="Your protected account profile loaded from the JWT-secured API.">
      {loading && <Loader />}
      {error && <ErrorMessage message={error?.message ?? 'Unable to load profile data.'} />}
      {!loading && !error && user && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
            <p className="text-sm uppercase text-slate-400">Name</p>
            <p className="mt-3 text-2xl font-semibold text-slate-100">{user.name}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
            <p className="text-sm uppercase text-slate-400">Email</p>
            <p className="mt-3 text-2xl font-semibold text-slate-100">{user.email}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
            <p className="text-sm uppercase text-slate-400">Verified</p>
            <p className="mt-3 text-2xl font-semibold text-slate-100">{user.isEmailVerified ? 'Yes' : 'No'}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
            <p className="text-sm uppercase text-slate-400">Loaded</p>
            <p className="mt-3 text-2xl font-semibold text-slate-100">{formatDate(new Date())}</p>
          </div>
        </motion.div>
      )}
    </PageContainer>
  )
}

export default Dashboard
