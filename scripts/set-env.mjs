import fs from 'fs';
import path from 'path';

const backendUrl = (
  process.env.API_URL ||
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'https://finest-mattress-assists-takes.trycloudflare.com'
).replace(/\/$/, '');

console.log('[set-env] Target Backend URL:', backendUrl);

// 1. Write src/environments/environment.prod.ts
const envProdPath = path.resolve('src/environments/environment.prod.ts');
fs.mkdirSync(path.dirname(envProdPath), { recursive: true });
fs.writeFileSync(
  envProdPath,
  `export const environment = {
  production: true,
  apiUrl: '/api',
  backendUrl: '${backendUrl}',
};
`
);

// 2. Write src/environments/environment.ts
const envDevPath = path.resolve('src/environments/environment.ts');
if (!fs.existsSync(envDevPath)) {
  fs.writeFileSync(
    envDevPath,
    `export const environment = {
  production: false,
  apiUrl: '/api',
  backendUrl: 'http://localhost:8080',
};
`
  );
}

// 3. Update vercel.json rewrites dynamically if vercel.json exists
const vercelPath = path.resolve('vercel.json');
if (fs.existsSync(vercelPath)) {
  try {
    const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
    vercel.rewrites = [
      { source: '/api/(.*)', destination: `${backendUrl}/api/$1` },
      { source: '/ucp/(.*)', destination: `${backendUrl}/ucp/$1` },
      { source: '/acp/(.*)', destination: `${backendUrl}/acp/$1` },
      { source: '/(.*)', destination: '/index.html' }
    ];
    fs.writeFileSync(vercelPath, JSON.stringify(vercel, null, 2) + '\n');
    console.log('[set-env] Synchronized vercel.json rewrites to:', backendUrl);
  } catch (err) {
    console.warn('[set-env] Warning: could not parse vercel.json:', err);
  }
}
