# Boiler Autonomy website

Website for **Boiler Autonomy**, the Purdue University student team building 1/10-scale autonomous race cars (F1TENTH).

Built with React, Vite and [Motion](https://motion.dev). Hosted free on GitHub Pages.

## Edit the content

Almost all text is in [`src/content.js`](src/content.js): the hero, mission, specs, car hotspots, autonomy stack, roadmap, sub-teams, email and social links. Change the text there and the page updates.

Before launch, check the items marked `TODO` in that file. Team members and contact emails are in `people` and `site.emails`.

Photos and videos are in [`public/media/`](public/media/). To swap one, keep the same file name, or update the path in `src/App.jsx`.

Keep media small: photos about 2000 px wide in WebP format (about 200 KB), and videos under about 15 MB.

## Join form (applications by email)

Every "Join the team" button opens an application form. You can also share it directly: `https://<site>/#apply`.

Submissions are emailed to you by [Web3Forms](https://web3forms.com) (free, 250 per month):

1. Go to https://web3forms.com, enter the email that should receive applications, and click **Create Access Key**.
2. Copy the key from the email they send you.
3. Paste it into `formAccessKey` in `src/content.js`, then commit and push.

Each application email has the applicant's details, and **Reply** goes straight to the applicant. The key is safe to keep in a public repo: it can only send form emails to you.

Until the key is set, the form opens the visitor's own email app with their answers filled in.

## Run it locally

Requires Node 18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:5173/.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the site and publishes it on every push to `main`.

One-time setup:

1. Create a new **public** repository on GitHub (for example, `boilerautonomy`).
2. Push this folder:
   ```bash
   git remote add origin https://github.com/<your-username>/boilerautonomy.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Open the **Actions** tab and wait for the "Deploy to GitHub Pages" run to finish. The site is then live at `https://<your-username>.github.io/boilerautonomy/`.

After that, every push to `main` updates the site in about a minute.

### Custom domain (optional)

Add the domain under **Settings → Pages → Custom domain**, and create the DNS record that GitHub shows you. The site uses relative paths, so it works on a custom domain with no code changes.

## Purdue branding

Use of Purdue logos and marks requires approval. See [Purdue Trademarks and Licensing](https://www.purdue.edu/trademarks-licensing/) and [Purdue Brand Studio](https://www.purdue.edu/brand-studio/brand/logos-usage/). When you have an approved file, put it in `public/media/` and set `universityLogo` in `src/content.js`.
