import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { PageContainer } from '../components/common/PageContainer'
import { ROUTES } from '../constants/routes'

const NotFound = () => (
  <PageContainer title="Page Not Found" description="The page you are looking for does not exist.">
    <div className="space-y-8 text-center">
      <p className="text-6xl font-semibold text-slate-100">404</p>
      <p className="max-w-xl mx-auto text-slate-400">
        The route you requested is unavailable. Use the navigation above or return to the homepage.
      </p>
      <Link to={ROUTES.home}>
        <Button variant="secondary">Go home</Button>
      </Link>
    </div>
  </PageContainer>
)

export default NotFound
