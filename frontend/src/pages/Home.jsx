import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { PageContainer } from '../components/common/PageContainer'
import { APP_DESCRIPTION, APP_TITLE } from '../constants/app'
import { ROUTES } from '../constants/routes'

const features = [
  'Reusable UI components',
  'Route-driven architecture',
  'Axios API service layer',
  'Tailwind CSS design system',
]

const Home = () => (
  <PageContainer title={APP_TITLE} description={APP_DESCRIPTION}>
    <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <p className="rounded-full bg-slate-800 px-4 py-2 text-sm uppercase tracking-[0.2em] text-slate-300">
          Modern frontend starter
        </p>
        <div className="space-y-4">
          <h2 className="text-4xl font-semibold text-slate-100 sm:text-5xl">
            Build fast, scalable React apps with clean structure.
          </h2>
          <p className="max-w-2xl text-slate-400">
            Deploy a production-ready user flow with login, registration, protected routes, and centralized API integration.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to={ROUTES.register}>
            <Button>Get Started</Button>
          </Link>
          <Link to={ROUTES.login}>
            <Button variant="secondary">Login</Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-glow"
      >
        <h3 className="mb-4 text-xl font-semibold text-slate-100">What this starter includes</h3>
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="rounded-2xl bg-slate-950/80 p-4 text-slate-200">
              {feature}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </PageContainer>
)

export default Home
