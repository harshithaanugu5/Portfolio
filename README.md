# Sri Harshitha Anugu — Portfolio

AI/Data-Scientist portfolio built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## Deploy to Vercel

Run these three commands from this folder (`C:\Users\Admin\portfolio`):

```bash
npx vercel login      # opens your browser — pick "Continue with GitHub"
npx vercel            # first deploy: accept every default (press Enter)
npx vercel --prod     # promote to your production URL
```

Next.js is auto-detected — no extra configuration needed.
Account: **harshithaanugu5s-projects**

### Prompts on the first `npx vercel`

| Prompt | Answer |
|---|---|
| Set up and deploy? | `y` |
| Which scope? | your account |
| Link to existing project? | `n` |
| Project name? | press Enter (`portfolio`) |
| In which directory is your code? | press Enter (`./`) |
| Modify build settings? | `n` |

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
```

## Editing content

**All copy lives in `lib/data.js`** — profile, summary, metrics, pipeline stages,
experience, skills clusters, education, certifications, publication. Edit that one
file to update the whole site.

- Resume PDF: `public/SriHarshitha_Anugu_Resume.pdf`
  (also reachable at `/resume` and `/cv` — see `next.config.mjs`)
- Headshot: `public/headshot.png`
- Colors, animations: `tailwind.config.js` + `app/globals.css`

### Replacing the resume

Drop the new PDF in `public/` with the **same filename**, then redeploy. If you
rename it, update `profile.resume` in `lib/data.js` and `RESUME` in `next.config.mjs`.

## Structure

| File | Purpose |
|---|---|
| `components/Hero.jsx` | Headline, typewriter titles, metrics counters, stack marquee |
| `components/NeuralField.jsx` | Canvas neural-network background |
| `components/PipelineFlow.jsx` | Animated architecture diagram (dotted arrows + feedback loop) |
| `components/ExperienceTimeline.jsx` | Scroll-drawn dotted timeline |
| `components/SkillsGraph.jsx` | Radial hub-and-spoke skills graph |
| `components/motion.jsx` | Reveal / Stagger / Counter / Typewriter primitives |
| `app/not-found.jsx` | Styled 404 page |
