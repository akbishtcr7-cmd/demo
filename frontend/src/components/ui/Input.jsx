import PropTypes from 'prop-types'

export const Input = ({ label, error, className = '', ...props }) => (
  <label className="block text-sm font-medium text-slate-200">
    {label && <span className="mb-2 inline-block text-slate-300">{label}</span>}
    <input
      className={`mt-1 block w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-500/25 ${className}`}
      {...props}
    />
    {error && <span className="mt-2 block text-sm text-rose-400">{error}</span>}
  </label>
)

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
}
