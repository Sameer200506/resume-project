# Mohammed Sameer — Engineering & AI Portfolio

A modern, premium, dark-futuristic portfolio website showcasing engineering projects, software development, CAD design, CFD simulation, and AI interest. This application features a highly responsive, custom-styled interface, smooth animations, and a secure client-side Admin Panel to edit all portfolio content dynamically in real-time.

---

## 🚀 Key Features

- **Dark-Futuristic Aesthetic** — Sleek dark theme featuring CFD-inspired fluid particle grid animations and HUD-themed technical card components.
- **Dynamic Admin Dashboard (`/admin`)** — Complete control panel to manage every aspect of the portfolio in real-time. Changes are stored locally in the browser (`localStorage`).
  - **Editable Sections:** Personal Info, Hero text, About info, Skills grids, Education timeline, Experience history, Projects list, Certifications, Research Interests, SWOT analysis, and 5-Year Vision.
  - **JSON Export/Import:** Easily backup and restore your entire portfolio data with a single click.
- **Dynamic Resume/CV System** — Allows you to upload a PDF directly via the Admin Panel (stored locally as a base64 string) or link to an external URL (e.g. Google Drive). The download button on the main portfolio dynamically fetches the configured resume.
- **Smooth Animations** — Staggered entry motions powered by Framer Motion.
- **SEO Optimized** — Structured JSON-LD metadata for crawlers, responsive design targeting Mobile/Tablet/Desktop viewports, and fast loading performance.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite 7](https://vite.dev/)
- **Styling:** [TailwindCSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/) (configured with SPA rewrites for secure direct routing)

---

## 📦 Project Structure

```
src/
├── App.tsx                  # Main portfolio compose view
├── main.tsx                 # Routing, global context, and entrypoint
├── index.css                # CSS Variables, fonts, and grid-particle animations
├── admin/                   # Client-side Admin Panel
│   ├── AdminContext.tsx     # Admin state and local data persistence
│   ├── AdminLogin.tsx       # Secure admin login form
│   └── AdminPanel.tsx       # Live CRUD editors for all sections
├── components/              # Sections components
│   ├── Hero.tsx             # Interactive header with canvas trails
│   ├── About.tsx            # Short bio, highlights, and basic stats
│   ├── Skills.tsx           # Category grids with hover glows
│   ├── Education.tsx        # Vertical timeline of institutions
│   ├── Experience.tsx       # Professional internships
│   ├── Projects.tsx         # Detailed feature cards with stack badges
│   ├── Certifications.tsx  # Interactive list of awards/certificates
│   ├── ResearchInterests.tsx# Hexagonal/technical research areas
│   ├── SWOT.tsx             # Interactive four-quadrant SWOT matrix
│   ├── Vision.tsx           # Interactive 5-Year milestone progress
│   ├── Contact.tsx          # Form inputs and social connectivity
│   └── Footer.tsx           # Basic attribution and scroll to top
└── data/
    └── portfolio-data.ts    # Portfolio schema structure and defaults
```

---

## ⚙️ Quick Start

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/Sameer200506/resume-project.git
cd resume-project

# Install dependencies
npm install
```

### 2. Run Locally

```bash
# Start the local Vite development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Log In to Admin Panel
1. Go to [http://localhost:5173/admin](http://localhost:5173/admin)
2. Enter the default password: **`admin123`**
3. Edit your content, upload a PDF resume, and click **Save Changes** in the top bar.

---

## 🏗️ Production Build

Create an optimized bundle for hosting (e.g. Vercel, Netlify):

```bash
npm run build
```

The static build output will be stored in the `/dist` directory.

---

## 📄 License

This project is licensed under the MIT License.
