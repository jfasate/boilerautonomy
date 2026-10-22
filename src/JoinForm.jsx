import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { site, teams, joinForm } from './content'

const ease = [0.22, 1, 0.36, 1]
function toText(data) {
  return Object.entries(data)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
}

export default function JoinForm({ open, onClose }) {
  const dialog = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [sentTo, setSentTo] = useState({ name: '', email: '' })

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) {
      setStatus('idle')
      d.showModal()
    } else if (!open && d.open) {
      d.close()
    }
  }, [open])

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get('botcheck')) return

    const data = {
      Name: fd.get('name'),
      Email: fd.get('email'),
      Major: fd.get('major'),
      Year: fd.get('year'),
      'Sub-teams': fd.getAll('teams').join(', ') || 'Not sure yet',
      'Skills & experience': fd.get('skills') || '-',
      'Why join': fd.get('why'),
      Links: fd.get('links') || '-',
    }

    // No key yet: fall back to the visitor's email app so applications are never lost.
    if (!site.formAccessKey) {
      window.location.href = `mailto:${site.emails.join(',')}?subject=${encodeURIComponent(
        `Joining Boiler Autonomy: ${data.Name}`,
      )}&body=${encodeURIComponent(toText(data))}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: site.formAccessKey,
          subject: `New Boiler Autonomy application: ${data.Name}`,
          from_name: 'Boiler Autonomy website',
          replyto: data.Email,
          ...data,
        }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.message)
      setSentTo({ name: data.Name, email: data.Email })
      setStatus('done')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <dialog
      ref={dialog}
      className="apply"
      aria-labelledby="apply-title"
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
    >
      {open && (
        <motion.div
          className="apply-panel"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <button className="apply-close" onClick={onClose} aria-label="Close form">
            Close ✕
          </button>

          {status === 'done' ? (
            <div className="apply-done">
              <p className="label">Application sent</p>
              <h2 className="h2">Thanks, {sentTo.name.split(' ')[0]}.</h2>
              <p className="lede">
                We got your application and will email you at <strong>{sentTo.email}</strong> soon.
              </p>
              <button className="btn btn-gold" onClick={onClose}>Back to site</button>
            </div>
          ) : (
            <>
              <p className="label">Join Boiler Autonomy</p>
              <h2 className="h2" id="apply-title">Apply to the team.</h2>
              <p className="lede">{joinForm.intro}</p>

              <form className="apply-form" onSubmit={handleSubmit}>
                <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" />

                <div className="field">
                  <label htmlFor="f-name">Full name *</label>
                  <input id="f-name" name="name" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="f-email">Purdue email *</label>
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@purdue.edu"
                    pattern=".+@purdue\.edu$"
                    title="Please use your @purdue.edu email"
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-major">Major *</label>
                  <input id="f-major" name="major" required placeholder="e.g. ECE, ME, CS, AAE" />
                </div>
                <div className="field">
                  <label htmlFor="f-year">Year *</label>
                  <select id="f-year" name="year" required defaultValue="">
                    <option value="" disabled>Select</option>
                    {joinForm.years.map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <fieldset className="field field-wide">
                  <legend>Which sub-teams interest you?</legend>
                  <div className="chips">
                    {teams.map((t) => (
                      <label className="chip" key={t.title}>
                        <input type="checkbox" name="teams" value={t.title} />
                        <span>{t.title}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="field field-wide">
                  <label htmlFor="f-skills">Skills & experience</label>
                  <textarea
                    id="f-skills"
                    name="skills"
                    rows={3}
                    placeholder="e.g. Python, C++, ROS, PCB design, CAD, robotics clubs, past projects"
                  />
                </div>
                <div className="field field-wide">
                  <label htmlFor="f-why">Why do you want to join? *</label>
                  <textarea id="f-why" name="why" rows={3} required />
                </div>
                <div className="field field-wide">
                  <label htmlFor="f-links">LinkedIn, GitHub or portfolio</label>
                  <input id="f-links" name="links" placeholder="Optional" />
                </div>

                <div className="apply-actions field-wide">
                  <button className="btn btn-gold" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Submit application'}
                  </button>
                  {status === 'error' && (
                    <p className="apply-error" role="alert">
                      Something went wrong. Please try again, or email{' '}
                      <a href={`mailto:${site.emails[0]}`}>{site.emails[0]}</a>.
                    </p>
                  )}
                </div>
              </form>
            </>
          )}
        </motion.div>
      )}
    </dialog>
  )
}
