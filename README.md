# Jyotish Paramarsha Sewa website

Website for ज्योतिष परामर्श सेवा (Jyotish Chetan Oli), Birtamode. Everything the site needs is inside `index.html`.

Everything you need to change is in one place: open `index.html`, search for `CONFIG`, and fill in the blanks.

## 1. Links, fee and payment details

| Setting | What to put |
|---|---|
| `phone1`, `phone2`, `whatsapp` | Phone and WhatsApp numbers, without +977 |
| `office` | Office address shown on the page and in Google Maps |
| `facebook`, `instagram` | Already filled in |
| `zoomLink` | His personal Zoom meeting link (use a recurring or Personal Meeting ID link) |
| `feeNPR` | Consultation fee in rupees, e.g. `1100` |
| `esewa` | eSewa ID, account name, and the QR image file name |
| `bank` | Bank name, account name, account number, branch, and the QR image file name |
| `closedWeekdays` | Left empty: he takes appointments all 7 days |
| `slots` | Appointment times in Nepal time |

For the QR codes, save them as image files (for example `esewa-qr.png` and `bank-qr.png`) in the same folder as `index.html`, then write those names in `qr: ""`.

## 2. Emails (EmailJS, free plan: 200 emails a month)

1. Sign up at https://www.emailjs.com and connect his Gmail under **Email Services**. Copy the **Service ID**.
2. Under **Email Templates**, create a template for the customer:
   - To email: `{{customer_email}}`
   - Subject: `Appointment confirmed: {{booking_id}}`
   - Body (example):
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
3. Create a second template for him (optional but recommended), with To email `{{owner_email}}` and the same variables plus `{{customer_name}}` and `{{customer_phone}}`.
4. Copy the template IDs and your **Public Key** (Account → General) into `CONFIG.emailjs`, and put his email in `ownerEmail`.

Until this is set up, customers still see the confirmation pop-up and can download the PDF.

## 3. Put it online (GitHub Pages)

1. Create a new public repository, e.g. `jyotish-chetan-oli`.
2. Click **Add file → Upload files**, drag in everything from this folder, and click **Commit changes**.
3. Go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute or two the site is live at `https://<your-username>.github.io/jyotish-chetan-oli/`.

To change details later, open `index.html` on GitHub, click the pencil icon, edit `CONFIG`, and commit.

## Things to know

- **Payments are not checked automatically.** eSewa and bank QR payments go straight to his account, so he should match each booking email's transaction ID against his eSewa or bank statement.
- **Two people can pick the same time.** The site has no database, so check the booking emails and call if there's a clash.
- **Zoom:** the customer joins with the link, but the meeting only starts when he opens it as host (or enable "Join before host" in Zoom settings).
