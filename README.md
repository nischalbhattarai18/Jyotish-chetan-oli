# Jyotish Paramarsha Sewa website

Website for ज्योतिष परामर्श सेवा (Jyotish Chetan Oli), Bhadrapur Road (bus stand), Birtamode.
The whole site is one file: `index.html`. Keep that exact name.

## Deploy on GitHub Pages (first time)

1. Create a new **public** repository, e.g. `jyotish-chetan-oli`.
2. Click **Add file → Upload files**, drag in `index.html` and `README.md`, then **Commit changes**.
3. Go to **Settings → Pages**. Under Source choose **Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
4. Wait 1 to 2 minutes. The site is live at `https://<your-username>.github.io/jyotish-chetan-oli/`.

## Update details later

All settings are in one block called `CONFIG`, near the bottom of `index.html`.

1. Open the repository on GitHub and click `index.html`.
2. Click the **pencil icon** (Edit this file).
3. Press **Ctrl+F** (Cmd+F on Mac) and search for `const CONFIG`.
4. Change the value between the quotes, for example `zoomLink: "https://zoom.us/j/..."`. Keep the quotes and the comma at the end of the line.
5. Click **Commit changes**. The live site updates in 1 to 2 minutes (refresh with Ctrl+Shift+R if you still see the old version).

| Setting | What it is | Now |
|---|---|---|
| `phone1` | Tap-to-call number, without +977 | 9814044138 |
| `phone2` | Optional second call number (leave `""` to hide) | Empty |
| `whatsapp` | WhatsApp-only number | 9824679233 |
| `office`, `mapLink` | Office address and Google Maps link | Set |
| `facebook`, `instagram` | Profile links | Set |
| `zoomLink` | His Zoom meeting link | Coming soon |
| `feeNPR` | Consultation fee in rupees, e.g. `1100` (no quotes) | Coming soon |
| `esewa` | `id`, `name`, and `qr` (QR image file name) | Coming soon |
| `bank` | `bankName`, `accountName`, `accountNo`, `branch`, `qr` | Coming soon |
| `emailjs`, `ownerEmail` | Email sending (see below) and his email | Coming soon |
| `closedWeekdays` | Days with no appointments; empty means all 7 days open | Empty |
| `slots` | Appointment times, Nepal time | 7 AM to 6 PM |

### Adding the QR codes

1. Save the QR images as `esewa-qr.png` and `bank-qr.png`.
2. On GitHub: **Add file → Upload files**, upload them next to `index.html`, and commit.
3. In `CONFIG`, set `qr: "esewa-qr.png"` inside `esewa`, and `qr: "bank-qr.png"` inside `bank`.

### Turning on confirmation emails (EmailJS, free up to 200 emails a month)

1. Sign up at https://www.emailjs.com and connect his Gmail under **Email Services**. Copy the **Service ID**.
2. Under **Email Templates**, create one for the customer. Set To email to `{{customer_email}}`, subject to `Appointment confirmed: {{booking_id}}`, and a body such as:
   ```
   नमस्ते {{first_name}},

   Your appointment with Jyotish Chetan Oli is confirmed.

   Booking ID: {{booking_id}}
   नेपाली मिति: {{date_bs}}
   English date: {{date_ad}}
   Time: {{time_npt}}
   Topic: {{topic}}
   Paid: {{amount}} via {{method}} (Txn {{txn_id}})

   Join on Zoom: {{zoom_link}}

   Questions? Call {{astrologer_phone}}
   ```
3. Create a second template for him with To email `{{owner_email}}`, including `{{customer_name}}` and `{{customer_phone}}`.
4. Put the Service ID, both template IDs, and your **Public Key** (Account → General) into `CONFIG.emailjs`, and his email into `ownerEmail`.

## Good to know

- eSewa and bank payments are not checked automatically. Match each booking's transaction ID against his eSewa or bank statement.
- The site has no database, so two people could pick the same time. The booking emails show every booking.
- A Zoom meeting starts when he opens the link as host, unless "Join before host" is turned on in his Zoom settings.
- The PDF download does not work inside Claude's preview. It works on the live site.
