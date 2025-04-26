import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../assets/styles/Contact.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';

function Contact() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameValid = name.trim() !== '';
    const emailValid = email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
    const messageValid = message.trim() !== '';

    setNameError(!nameValid);
    setEmailError(!emailValid);
    setMessageError(!messageValid);

    if (nameValid && emailValid && messageValid) {
      const templateParams = { name, email, message };

      emailjs
        .send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID!,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
          templateParams,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY!
        )
        .then(
          () => {
            setName('');
            setEmail('');
            setMessage('');
            setIsSuccess(true);
            setFeedbackMessage('Tu mensaje fue enviado con éxito 🚀');
            setTimeout(() => setFeedbackMessage(null), 5000);
          },
          (error: any) => {
            console.error('Error al enviar:', error);
            setIsSuccess(false);
            setFeedbackMessage('Ocurrió un error al enviar tu mensaje. Intentalo más tarde.');
            setTimeout(() => setFeedbackMessage(null), 5000);
          }
        );
    }
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h2>Contacto</h2>
          <p>¿Tenés un proyecto en mente? ¡Hagámoslo realidad juntos!</p>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            className="contact-form"
            onSubmit={sendEmail}
          >
            <div className="form-flex">
              <TextField
                required
                label="Tu Nombre"
                placeholder="¿Cómo te llamás?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                helperText={nameError ? 'Por favor ingresá tu nombre' : ''}
              />
              <TextField
                required
                type="email"
                label="Email"
                placeholder="¿Cómo puedo contactarte?"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError ? 'Por favor ingresá un email correcto' : ''}
              />
            </div>

            <TextareaAutosize
              required
              id="mensaje"
              aria-label="Mensaje"
              placeholder="Contame en qué puedo ayudarte"
              minRows={10}
              className="body-form"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {messageError && (
              <span className="helper-text">Por favor ingresá tu mensaje</span>
            )}

            {feedbackMessage && (
              <div className={`feedback-message ${isSuccess ? 'success' : 'error'}`}>
                {feedbackMessage}
              </div>
            )}

            <Button variant="contained" endIcon={<SendIcon />} type="submit">
              Enviar
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;