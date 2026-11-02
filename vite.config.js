import { defineConfig, loadEnv } from 'vite';

// In dev, run api/contact.js locally so `npm run dev` works without the Vercel CLI.
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  return {
    plugins: [{
      name: 'local-api',
      configureServer(server) {
        server.middlewares.use('/api/contact', async (req, res) => {
          let raw = '';
          for await (const c of req) raw += c;
          try { req.body = raw ? JSON.parse(raw) : {}; } catch { req.body = {}; }
          res.status = (code) => { res.statusCode = code; return res; };
          res.json = (o) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(o)); };
          const mod = await server.ssrLoadModule('/api/contact.js');
          await mod.default(req, res);
        });
      },
    }],
  };
});
