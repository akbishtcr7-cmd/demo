import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { PageContainer } from '../components/common/PageContainer'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'
import { validateEmail } from '../utils/validateEmail'

const VerifyRegisterOtp = () => {
  const { verifyRegisterOtp } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || ''

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email },
  })

  const onSubmit = async (formData) => {
    try {
      await verifyRegisterOtp(formData)
      navigate(ROUTES.dashboard, { replace: true })
    } catch (error) {
      toast.error(error?.message ?? 'Unable to verify OTP, please try again.')
    }
  }

  return (
    <PageContainer title="Verify Register OTP" description="Enter the OTP sent to your email to activate your account.">
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
          label="OTP"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="123456"
          {...register('otp', {
            required: 'OTP is required',
            minLength: { value: 6, message: 'OTP must be 6 digits' },
            maxLength: { value: 6, message: 'OTP must be 6 digits' },
          })}
          error={errors.otp?.message}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Verifying...' : 'Verify account'}
        </Button>
      </form>
      <p className="mt-8 text-sm text-slate-500">
        Need to start again?{' '}
        <Link to={ROUTES.register} className="text-slate-100 hover:text-slate-50">
          Register
        </Link>
        .
      </p>
    </PageContainer>
  )
}

export default VerifyRegisterOtp
