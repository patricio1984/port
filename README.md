# Portfolio — Patricio

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

Portfolio personal construido con React 18, TypeScript y Vite. Diseño oscuro, animaciones de scroll, y tres modos de visualización para la sección de habilidades.

🔗 **[Ver en vivo →](https://patricio1984.github.io/port/)**

---

## Stack

| Categoría | Tecnologías |
|---|---|
| UI | React 18, TypeScript, SCSS/Sass |
| Build | Vite 8, gh-pages |
| Animaciones | GSAP 3 + ScrollTrigger, Lenis (smooth scroll) |
| Iconos | FontAwesome 6 |
| Email | EmailJS |
| Gráficos | Canvas 2D API |

---

## Secciones

- **Hero** — presentación con tipografía display variable (Fraunces)
- **Expertise** — tres modos de vista intercambiables:
  - *Editorial*: tarjetas con stack por área
  - *Constelación*: simulación de física en Canvas 2D
  - *Marquesina*: scroll infinito animado en CSS
- **Proyectos** — case studies con imagen, descripción técnica y decisiones de diseño; fade-in con IntersectionObserver
- **Carrera** — timeline horizontal scrubleable con GSAP + ScrollTrigger (3 roles: Zeetrex → Avature → Freelance)
- **Contacto** — formulario con EmailJS
- **Footer** — links a redes

---

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

---

## Deploy

El proyecto se despliega en GitHub Pages desde la carpeta `dist`.

```bash
npm run deploy
```

Esto ejecuta `vite build` y luego publica el resultado con `gh-pages`.

---

## Estructura

```
src/
├── assets/
│   ├── images/          # Imágenes de proyectos (.webp)
│   └── styles/          # SCSS por componente + design tokens
├── components/
│   ├── Main.tsx         # Hero / presentación
│   ├── Expertise.tsx    # Habilidades (Editorial / Constelación / Marquesina)
│   ├── Projects/
│   │   ├── Project.tsx      # Lista de proyectos con reveals
│   │   ├── ProjectCard.tsx  # Panel de case study
│   │   └── ProjectData.ts   # Datos de proyectos
│   ├── Timeline.tsx     # Carrera profesional
│   ├── Navigation.tsx   # Navbar con active state por scroll
│   ├── Contact.tsx      # Formulario de contacto
│   ├── Footer.tsx
│   └── FadeIn.tsx       # Wrapper de animación de entrada
└── index.scss           # Reset global + design tokens
```

## Contacto (Formspree)

El formulario de contacto ahora envía las entradas a Formspree usando el formulario con ID `maqlrzee`.

- ¿Llega a Gmail?: Sí — Formspree reenvía las sumisiones al correo que tengas verificado en tu cuenta. Asegurate de haber verificado tu email en el dashboard de Formspree y de tener activadas las notificaciones por email para el formulario.
- Prueba rápida desde terminal:

```bash
curl -X POST https://formspree.io/f/maqlrzee \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"name":"Prueba","email":"test@example.com","message":"hola"}'
```

- Nota: esta integración no requiere servidor (no expone keys). Si más adelante querés mayor control (plantillas, logs, protección avanzada), podés usar una función serverless con MailerSend o similar.