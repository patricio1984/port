import React, { useId, useState } from 'react';
import '../assets/styles/Contact.scss';

// ─── Inline send arrow — no MUI dependency ────────────────────────────────────
function SendArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2"  x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function Contact() {
  const uid       = useId();
  const nameId    = `${uid}-name`;
  const emailId   = `${uid}-email`;
  const msgId     = `${uid}-message`;

  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');

  const [nameError,    setNameError]    = useState(false);
  const [emailError,   setEmailError]   = useState(false);
  const [messageError, setMessageError] = useState(false);

  const [feedback,  setFeedback]  = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameValid    = name.trim() !== '';
    const emailValid   = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
    const messageValid = message.trim() !== '';

    setNameError(!nameValid);
    setEmailError(!emailValid);
    setMessageError(!messageValid);

    if (!nameValid || !emailValid || !messageValid) return;

    // Envío directo a Formspree (sin backend)
    setIsSending(true);
    const endpoint = 'https://formspree.io/f/maqlrzee';

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          console.error('Formspree error:', res.status, data || await res.text().catch(() => ''));
          setIsSuccess(false);
          setFeedback('Ocurrió un error. Intentalo más tarde.');
          setTimeout(() => setFeedback(null), 5000);
          return;
        }
        setName(''); setEmail(''); setMessage('');
        setIsSuccess(true);
        setFeedback('Mensaje enviado con éxito.');
        setTimeout(() => setFeedback(null), 5000);
      })
      .catch((err: unknown) => {
        console.error('MailerSend error:', err);
        setIsSuccess(false);
        setFeedback('Ocurrió un error. Intentalo más tarde.');
        setTimeout(() => setFeedback(null), 5000);
      })
      .finally(() => setIsSending(false));
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contacto">
      <div className="contact-inner">

        {/* ── Left: editorial heading ── */}
        <div className="contact-heading">
          <p className="contact-eyebrow">Hablemos</p>
          <h2 className="contact-title">
            Trabajemos<br />
            <em>juntos.</em>
          </h2>
          <p className="contact-sub">
            ¿Tenés un proyecto en mente?<br />
            Escribime y lo hacemos realidad.
          </p>
        </div>

        {/* ── Right: form ── */}
        <form
          className="contact-form"
          noValidate
          autoComplete="off"
          onSubmit={sendEmail}
          aria-label="Formulario de contacto"
        >

          {/* Row: name + email */}
          <div className="contact-form__row">

            <div className={`contact-field${nameError ? ' contact-field--error' : ''}`}>
              <label className="contact-field__label" htmlFor={nameId}>Nombre</label>
              <input
                id={nameId}
                className="contact-field__input"
                type="text"
                placeholder="¿Cómo te llamás?"
                value={name}
                onChange={(e) => { setName(e.target.value); if (nameError) setNameError(false); }}
                aria-describedby={nameError ? `${nameId}-err` : undefined}
                aria-invalid={nameError}
              />
              {nameError && (
                <span id={`${nameId}-err`} className="contact-field__error" role="alert">
                  Ingresá tu nombre
                </span>
              )}
            </div>

            <div className={`contact-field${emailError ? ' contact-field--error' : ''}`}>
              <label className="contact-field__label" htmlFor={emailId}>Email</label>
              <input
                id={emailId}
                className="contact-field__input"
                type="email"
                placeholder="hola@ejemplo.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(false); }}
                aria-describedby={emailError ? `${emailId}-err` : undefined}
                aria-invalid={emailError}
              />
              {emailError && (
                <span id={`${emailId}-err`} className="contact-field__error" role="alert">
                  Email inválido
                </span>
              )}
            </div>

          </div>

          {/* Message */}
          <div className={`contact-field${messageError ? ' contact-field--error' : ''}`}>
            <label className="contact-field__label" htmlFor={msgId}>Mensaje</label>
            <textarea
              id={msgId}
              className="contact-field__input contact-field__textarea"
              placeholder="Contame en qué puedo ayudarte…"
              rows={6}
              value={message}
              onChange={(e) => { setMessage(e.target.value); if (messageError) setMessageError(false); }}
              aria-describedby={messageError ? `${msgId}-err` : undefined}
              aria-invalid={messageError}
            />
            {messageError && (
              <span id={`${msgId}-err`} className="contact-field__error" role="alert">
                Ingresá tu mensaje
              </span>
            )}
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`contact-feedback${isSuccess ? ' contact-feedback--ok' : ' contact-feedback--err'}`}
              role="status"
              aria-live="polite"
            >
              {feedback}
            </div>
          )}

          {/* Submit */}
          <div className="contact-form__footer">
            <button
              className="contact-submit"
              type="submit"
              disabled={isSending}
              aria-busy={isSending}
            >
              <span>{isSending ? 'Enviando…' : 'Enviar mensaje'}</span>
              {!isSending && <SendArrow />}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}

export default Contact;