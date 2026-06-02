import PropTypes from 'prop-types'

export const PageContainer = ({ title, description, children }) => (
  <section className="mx-auto flex min-h-[calc(100vh-176px)] w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
    <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl sm:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-100 sm:text-4xl">{title}</h1>
        {description ? (
          <p className="max-w-3xl text-slate-400">{description}</p>
        ) : null}
      </div>
    </div>
    <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl sm:p-8">
      {children}
    </div>
  </section>
)

PageContainer.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
}
