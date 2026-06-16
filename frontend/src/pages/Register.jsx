import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'
import { PageContainer } from '../components/common/PageContainer'
import { ROUTES } from '../constants/routes'
import { validateEmail } from '../utils/validateEmail'

const Register = () => {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (formData) => {
    try {
      const data = await registerUser(formData)
      navigate(ROUTES.verifyRegisterOtp, {
        replace: true,
        state: { email: data.email || formData.email },
      })
    } catch (error) {
      if (error?.status === 409) {
        setError('email', {
          type: 'server',
          message: error.message ?? 'An account already exists with this email',
        })
        return
      }

      toast.error(error?.message ?? 'Unable to register, please try again.')
    }
  }

  return (
    <PageContainer title="Register" description="Create your account and verify your email with a one-time password.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Full name"
          type="text"
          placeholder="Jane Doe"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
        />
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
          {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be 8 characters or more' } })}
          error={errors.password?.message}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
      <p className="mt-8 text-sm text-slate-500">
        Already have an account?{' '}
        <Link to={ROUTES.login} className="text-slate-100 hover:text-slate-50">
          Log in
        </Link>
        .
      </p>
    </PageContainer>
  )
}

export default Register
