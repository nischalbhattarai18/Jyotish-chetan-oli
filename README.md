# Jyotish Paramarsha Sewa website

Website for ज्योतिष परामर्श सेवा (Jyotish Chetan Oli), Bhadrapur Road (bus stand), Birtamode.
The whole site is one file: `index.html`. Keep that exact name.

## What is on the site

Intro with his photo, floating contact options, stats (15+ years, 5000+ lives guided), About and vision, featured services, the nine-graha service board, consultation methods (online, office, house visit), booking with Nepali and English dates and eSewa payment, photo gallery, the poster, and a floating quick-action bar. All photos are built into `index.html`.

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
| `ownerEmail` | His email, receives bookings + payment screenshots | Coming soon |
| `formsubmitId` | Optional private FormSubmit ID (hides his email) | Empty |
| `closedWeekdays` | Days with no appointments; empty means all 7 days open | Empty |
| `slots` | Appointment times, Nepal time | 7 AM to 6 PM |

### Adding the bank QR code

1. The eSewa QR is already inside `index.html`. For the bank QR, save the image as `bank-qr.png`.
2. On GitHub: **Add file → Upload files**, upload it next to `index.html`, and commit.
| `esewa` | eSewa ID, name and QR (QR is already built into the file) | 9814044138, Bhawani Pokharel |

### Turning on emails (FormSubmit, free, no account needed)

When a customer clicks **Book appointment**, the site emails Jyotish Chetan Oli all the booking details with the **payment screenshot attached**, and emails the customer a confirmation.

1. In `CONFIG`, set `ownerEmail: "his@gmail.com"` and commit.
2. Open the live site and make one test booking with any screenshot.
3. He will receive an email from **FormSubmit** asking to activate the form. Click **Activate Form**. (Check spam if it doesn't show up.)
4. From then on, every booking arrives in his inbox with the screenshot attached.
5. Optional: the activation email also gives a random ID. Put it in `formsubmitId: "..."` so his email address isn't visible in the website code.

EmailJS (the `emailjs` settings) is optional. Only set it up if you want a nicer, custom-designed confirmation email for customers.

## Good to know

- eSewa and bank payments are not checked automatically. He should check each payment screenshot against his eSewa or bank statement.
- The site has no database, so two people could pick the same time. The booking emails show every booking.
- The PDF download does not work inside Claude's preview. It works on the live site.
