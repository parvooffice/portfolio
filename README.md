# Prabhudatta Mishra - Portfolio

Structure:
- index.html            the website
- public/images/        your images (see README inside)
- public/resume/        downloadable resume PDF
- api/contact.js        Vercel function that saves messages to Supabase
- supabase/schema.sql   run once in Supabase SQL Editor
- vite.config.js        makes /api work under `npm run dev`

Setup:
1. Supabase: create a project, run supabase/schema.sql in the SQL Editor.
2. Copy .env.example to .env and fill SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
   (Project Settings -> API).
3. npm install, then npm run dev  (http://localhost:5173)
4. Deploy: push to GitHub, import the repo in Vercel, add the same two
   environment variables, deploy.
View messages: Supabase -> Table Editor -> messages.
