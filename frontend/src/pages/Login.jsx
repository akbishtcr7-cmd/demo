import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'
import { PageContainer } from '../components/common/PageContainer'
import { ROUTES } from '../constants/routes'
import { validateEmail } from '../utils/validateEmail'

const Login = () => {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || ROUTES.dashboard

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true })
    }
  }, [from, navigate, user])

  const onSubmit = async (formData) => {
    try {
      const data = await login(formData)
      navigate(ROUTES.verifyLoginOtp, {
        replace: true,
        state: { email: data.email || formData.email, from },
      })
    } catch (error) {
      toast.error(error?.message ?? 'Unable to login, please try again.')
    }
  }

  return (
    <PageContainer title="Login" description="Secure access to your dashboard and account settings.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          {...register('email', {
            required: 'Email is required',
            validate: (value) => validateEmail(value) || 'Please enter a valid email',
          })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register('password', { required: 'Password is required' })}
          error={errors.password?.message}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
          <Link to={ROUTES.register} className="text-sm text-slate-300 hover:text-slate-100">
            Create an account
          </Link>
        </div>
      </form>
      <p className="mt-8 text-sm text-slate-500">
        Use the sample API base URL in <code className="rounded bg-slate-800 px-1 py-0.5">.env</code> and customize it to connect to your backend.
      </p>
    </PageContainer>
  )
}

export default Login
