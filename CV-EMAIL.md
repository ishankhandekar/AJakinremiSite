# Emailing the CV

Clicking **Download CV** (in the header, or the Resume row in Contact) opens a small panel.
Its main button downloads the PDF straight away, as before. Underneath, visitors can enter
their email address to have the CV sent to them instead. The front end is done; this is the
contract the backend needs to meet.

## Connecting the backend

Set the endpoint's full URL at build time:

```
PUBLIC_CV_ENDPOINT=https://example.com/api/send-cv
```

(in a `.env` file, or as an environment variable when running `npm run build`; see
`.env.example`).

While `PUBLIC_CV_ENDPOINT` is unset, the panel doesn't send anything: it waits about a
second and then shows the success message, so the flow can be demonstrated before the
backend exists.

## Request

```
POST {PUBLIC_CV_ENDPOINT}
Content-Type: application/json

{ "email": "visitor@company.com", "website": "" }
```

- `email` has already been checked in the browser for a basic `name@domain.tld` shape.
  Validate it again on the server.
- `website` is a honeypot. The field is hidden from people, so if it's not empty the
  request came from a bot. Reply `200` and send nothing, so the bot learns nothing.

## Response

| Status | What the visitor sees |
| --- | --- |
| `2xx` | "✓ Sent to visitor@company.com. Check your inbox." |
| anything else | "Couldn't send it. Try again, or download it instead." |

To show your own error text, reply with JSON, for example
`{ "message": "Too many requests." }`. It replaces "Couldn't send it." in the line above.

The browser gives up after 15 seconds and shows the error.

## Things to handle on the server

- **Rate limiting** by IP and by email address. Without it, the endpoint can be used to
  flood someone else's inbox with CVs.
- **CORS**: if the API is on a different origin from the site, allow the site's origin for
  `POST` with a `Content-Type` header (the browser sends a preflight `OPTIONS` request first).
- **Spam**: if the honeypot isn't enough, Cloudflare Turnstile can be added to the form;
  the token would then be sent along with the email.
- **Privacy**: the panel tells visitors their address is "Only used to send you the CV."
  If the addresses will also be used for follow-ups, change that line in
  `src/components/CvPanel.astro` to say so.
