# Learning OS

A polished, local-first personal learning workspace for one person. Organize learning paths across any subject, complete lessons, save notes, try quizzes, set goals, log focused study sessions, and review progress—all without creating an account.

The starter library includes an advanced 12-lesson Low-Voltage Electrical Design curriculum, a practical Python course, a 10-lesson AI App Builder course, applied mathematics, and technical writing. Resource links favour Tamil-language searches where suitable, followed by high-quality English references.

## What works

- Responsive dashboard, course library, modules, lessons and guided learning paths
- Personal course builder for YouTube playlists, individual videos and AI-generated lesson lists
- Ordered custom lessons with a **Next lesson** action after completion
- Progress tracking, bookmarks, notes and knowledge checks
- Goals, study-session logging, streaks and seven-day analytics
- Light and dark themes
- Browser-local persistence using `localStorage`
- Complete JSON data export and import
- Smart revision scheduling for completed and difficult lessons
- Global Quick Find for courses, lessons and notes (`Ctrl+K` or `⌘K`)
- Installable web app with offline access to the core workspace
- Seeded external free learning resources; no video hosting
- Cloudflare Pages routing and security-header files
- No account, cookies, analytics, advertising or third-party data sync

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (normally `http://localhost:5173`).

Build and verify:

```bash
npm test
npm run build
npm run preview
```

The production output is written to `dist/`.

## Project layout

```text
src/
  App.tsx       UI and interactions
  data.ts       Seeded courses, paths and external resources
  review.ts      Local spaced-repetition scheduling helpers
  store.ts      Local persistence, backup and progress helpers
  styles.css    Responsive visual system
  types.ts      Application data model
public/
  _headers      Cloudflare security headers
  _redirects    Single-page app fallback
```

## Deploy to Cloudflare Pages

Nothing in this repository is pre-deployed. To publish your own copy:

1. Push this project to a GitHub repository.
2. In the Cloudflare dashboard, open **Workers & Pages → Create → Pages → Connect to Git**.
3. Select your repository and use these build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `20` or newer
4. Deploy. Cloudflare will provide a `*.pages.dev` address.

The included `_redirects` file enables client-side routing, and `_headers` adds a restrictive content security policy plus other basic browser protections.

### Optional DigitalPlat free subdomain

DigitalPlat is an independent service; availability and eligibility can change. This project does not register a domain for you.

After you have a working Cloudflare Pages deployment and a DigitalPlat-managed domain or subdomain:

1. Add the desired hostname in **Cloudflare Pages → your project → Custom domains**.
2. Follow Cloudflare's displayed DNS instructions. If DNS is hosted elsewhere, this usually means creating the exact CNAME record Cloudflare requests.
3. Confirm DNS validation and HTTPS are active before sharing the address.

Never assume a suggested name is available until the registrar confirms it.

## Privacy and security

Learning data is stored in the current browser profile under the key `learning-os:v1`. It is not sent to this project, its author or a database. Clearing site storage deletes it, so export backups periodically. Anyone with access to the unlocked browser profile may be able to read local data; do not store secrets, passwords, confidential client information or regulated personal data in notes.

External resources open in a new tab. Their privacy policies apply once opened. The app uses `noopener`/`noreferrer` behaviour for these links and deploys a restrictive Content Security Policy. Review and update the policy before adding analytics, embedded services, APIs or new origins.

The JSON import performs structural validation, but backups should still be imported only from a source you trust. The app treats imported note content as plain text rather than HTML.

## Personal backup with Google Drive

No Google API or application credential is required. Use **Settings & data → Export backup**, then upload the generated JSON file to a private Google Drive folder. To restore it, download the file from Drive and choose **Restore a backup**. The backup contains personal courses, revision schedules, progress, notes, goals, sessions, bookmarks and quiz scores.

## Future optional Supabase sync

Keep local-first operation as the default and make cloud sync an explicit opt-in. A safe migration path is:

1. Add Supabase Auth with magic-link or passkey sign-in.
2. Create user-owned tables for lesson progress, notes, goals, sessions and quiz attempts.
3. Enable Row Level Security on every table; policies must require `auth.uid() = user_id` for read and write.
4. Never ship the Supabase service-role key to the browser. Only the project URL and anonymous publishable key belong in client environment variables.
5. Store local changes in an outbox with stable record IDs and timestamps, then sync after sign-in.
6. Define conflict handling before release (for example, field-level latest-write with a visible conflict copy for notes).
7. Add account deletion, export and disconnect flows. Disconnecting should leave a usable local copy unless the user explicitly removes it.
8. Add automated policy tests using two separate user identities before enabling sync in production.

Suggested tables: `profiles`, `lesson_progress`, `notes`, `goals`, `study_sessions`, `quiz_attempts`, and `sync_devices`. Keep course seed content versioned in the repository unless you need collaborative course authoring.

## Add or edit a course

Courses are typed objects in `src/data.ts`. Each course contains modules, lessons, objectives, resources and optional quiz questions. Use stable IDs because progress is stored against lesson IDs. Do not reuse an old ID for new content.

When adding external resources, prefer legal, free and durable sources. Label the language accurately and avoid linking to pirated copies of standards or paid courses.

### Build a personal course inside the app

Open **Course builder** in the sidebar. Add a course name, then paste a URL for each lesson. You can add, remove and reorder lessons before saving. If an AI gives you a lesson plan, paste lines in this format into the import box:

```text
Lesson title | https://youtube.com/... | 30 min
```

Markdown links such as `[Lesson title](https://youtube.com/...)` are also accepted. Custom courses are stored locally, included in JSON backups, and appear in the course library and analytics. When you mark a lesson complete, the app reveals the next lesson in that course.

## Open-source release checklist

- Review the included MIT licence and update its copyright line if desired.
- Replace the placeholder initials in the profile card if desired.
- Review every seeded external link.
- Add screenshots and a contribution guide.
- Run `npm test` and `npm run build` before each release.
- Enable dependency updates and repository security scanning on GitHub.

## Licence

MIT. See `LICENSE`.
