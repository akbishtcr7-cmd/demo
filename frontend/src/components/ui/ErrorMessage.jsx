import PropTypes from 'prop-types'

export const ErrorMessage = ({ message }) => (
  <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
    <p>{message}</p>
  </div>
)

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}
