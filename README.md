# Jyotish Paramarsha Sewa website

Website for ज्योतिष परामर्श सेवा (Jyotish Chetan Oli), Bhadrapur Road (bus stand), Birtamode.
The whole site is one file: `index.html`. Keep that exact name.

## What is on the site

Intro with his photo, floating contact options, stats (15+ years, 5000+ lives guided), About and vision, featured services, the nine-graha service board, consultation methods (online, office, house visit), booking with Nepali and English dates and eSewa payment, photo gallery, the poster, and a floating quick-action bar. All photos are built into `index.html`.

## Deploy on GitHub Pages (first time)

1. Create a new **public** repository, e.g. `jyotish-chetan-oli`.
2. Click **Add file → Upload files**, drag in all files from this folder, then **Commit changes**.
3. Go to **Settings → Pages**. Under Source choose **Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
4. Wait 1 to 2 minutes. The site is live at `https://<your-username>.github.io/jyotish-chetan-oli/`.

## Update details later

All settings are in one block called `CONFIG`, near the bottom of `index.html`.

1. Open the repository on GitHub and click `index.html`.
2. Click the **pencil icon** (Edit this file).
3. Press **Ctrl+F** (Cmd+F on Mac) and search for `const CONFIG`.
4. Change the value between the quotes, for example `ownerEmail: "name@gmail.com"`. Keep the quotes and the comma at the end of the line.
5. Click **Commit changes**. The live site updates in 1 to 2 minutes (refresh with Ctrl+Shift+R if you still see the old version).

| Setting | What it is | Now |
|---|---|---|
| `phone1` | Tap-to-call number, without +977 | 9814044138 |
| `phone2` | Optional second call number (leave `""` to hide) | Empty |
| `office`, `mapLink` | Office address and Google Maps link | Set |
| `facebook`, `instagram` | Profile links | Set |
| `feeNPR`, `durationMin` | Consultation fee (rupees, no quotes) and length in minutes | 799, 30 |
| `esewa` | eSewa ID, name and QR (QR is already built into the file) | 9814044138, Bhawani Pokharel |
| `bank` | `bankName`, `accountName`, `accountNo`, `branch`, `qr` | Coming soon |
| `appsScriptUrl` | Web app URL from the Google Apps Script (sends all emails) | Not set yet |
| `ownerEmail` | His email (used by the FormSubmit backup) | chetanoli7090@gmail.com |
| `formsubmitId` | Optional private FormSubmit ID (hides his email) | Empty |
| `closedWeekdays` | Days with no appointments; empty means all 7 days open | Empty |
| `slots` | Appointment times, Nepal time | 7 AM to 6 PM |

### Adding the bank QR code

1. The eSewa QR is already inside `index.html`. For the bank QR, save the image as `bank-qr.png`.
2. On GitHub: **Add file → Upload files**, upload it next to `index.html`, and commit.
| `esewa` | eSewa ID, name and QR (QR is already built into the file) | 9814044138, Bhawani Pokharel |

### Turning on emails (Google Apps Script, free, sends from his Gmail)

This makes every booking email Jyotish Chetan Oli the customer's details **with the payment screenshot attached**, and emails the customer their confirmation. Emails come from his own Gmail, so they rarely go to spam. It also keeps a Google Sheet called "Jyotish bookings" with every appointment. Takes about 10 minutes, once.

1. On a computer, sign in to Google as **chetanoli7090@gmail.com** and open https://script.google.com.
2. Click **New project**. Delete everything in the editor, then paste the whole contents of `booking-email-script.gs` from this folder. Click the 💾 save icon and name the project "Jyotish bookings".
3. In the function dropdown at the top, choose **testSetup** and click **Run**. Google asks for permission:
   **Review permissions → choose his account → Advanced → Go to Jyotish bookings (unsafe) → Allow.**
   ("Unsafe" only means Google hasn't reviewed his own private script.) He should receive a test email.
4. Click **Deploy → New deployment**. Click the ⚙️ gear and choose **Web app**. Set:
   - Execute as: **Me (chetanoli7090@gmail.com)**
   - Who has access: **Anyone**

   Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
5. In `index.html` on GitHub, find `appsScriptUrl: ""` in `CONFIG`, paste the URL between the quotes, and commit.
6. Wait for the green check, open the live site, and make a test booking. Both emails arrive within a minute.

If you edit the script later, use **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy** so the same URL keeps working.

Backup: if `appsScriptUrl` is empty, the site falls back to FormSubmit using `ownerEmail` (needs a one-time "Activate Form" click in the first email FormSubmit sends him).

## Good to know

- eSewa and bank payments are not checked automatically. He should check each payment screenshot against his eSewa or bank statement.
- The site has no database, so two people could pick the same time. The booking emails show every booking.
- The PDF download does not work inside Claude's preview or inside the Facebook/Messenger/Instagram in-app browser. There, customers press and hold the confirmation image to save it, and they also get it by email.
