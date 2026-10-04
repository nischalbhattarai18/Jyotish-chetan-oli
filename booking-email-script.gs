/**
 * Jyotish Paramarsha Sewa: booking emails
 * ----------------------------------------
 * Paste this whole file into a Google Apps Script project (script.google.com)
 * while logged in as chetanoli7090@gmail.com, then deploy it as a Web app.
 * Step-by-step instructions are in README.md.
 *
 * What it does for every booking made on the website:
 *   1. Emails Jyotish Chetan Oli all customer details + the payment screenshot.
 *   2. Emails the customer a confirmation (with the confirmation image attached).
 *   3. Adds a row to a Google Sheet called "Jyotish bookings" (a record of all bookings).
 */

const OWNER_EMAIL = 'chetanoli7090@gmail.com';
const SENDER_NAME = 'Jyotish Chetan Oli';
const SAVE_TO_SHEET = true;

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);

    const screenshot = d.screenshot
      ? Utilities.newBlob(Utilities.base64Decode(d.screenshot), d.screenshotType || 'image/jpeg',
          'payment-screenshot-' + d.booking_id + '.jpg')
      : null;
    const ticket = d.ticket
      ? Utilities.newBlob(Utilities.base64Decode(d.ticket), 'image/jpeg', 'appointment-' + d.booking_id + '.jpg')
      : null;

    const rows = [
      ['Booking ID', d.booking_id],
      ['First name', d.first_name],
      ['Last name', d.last_name],
      ['Phone (with country code)', d.customer_phone],
      ['Email', d.customer_email],
      ['Consultation type', d.consult_type],
      ['Call on (online)', d.app || '-'],
      ['Home address (house visit)', d.address || '-'],
      ['Nepali date (BS)', d.date_bs],
      ['English date (AD)', d.date_ad],
      ['Time (Nepal)', d.time_npt],
      ['Duration', d.duration],
      ['Topic', d.topic],
      ['Amount', d.amount],
      ['Paid via', d.method],
      ['Transaction ID', d.txn_id || '(not given)'],
      ['Payment screenshot', screenshot ? 'Attached to this email' : 'Missing']
    ];

    // 1. Email to Jyotish Chetan Oli
    MailApp.sendEmail({
      to: OWNER_EMAIL,
      subject: 'New booking ' + d.booking_id + ': ' + d.customer_name + ', ' + d.date_ad + ' ' + d.time_npt,
      htmlBody:
        '<h2 style="font-family:Arial;color:#1E1650">New appointment booked</h2>' +
        '<p style="font-family:Arial">Check the attached payment screenshot against your eSewa or bank statement.</p>' +
        table(rows) +
        '<p style="font-family:Arial;color:#666">Reply to this email to write to the customer.</p>',
      replyTo: d.customer_email,
      name: 'Website bookings',
      attachments: [screenshot, ticket].filter(Boolean)
    });

    // 2. Confirmation email to the customer
    if (d.customer_email) {
      MailApp.sendEmail({
        to: d.customer_email,
        subject: 'Appointment confirmed: ' + d.booking_id + ' | Jyotish Chetan Oli',
        htmlBody:
          '<div style="font-family:Arial;max-width:560px">' +
          '<h2 style="color:#1E1650">नमस्ते ' + esc(d.first_name) + ' 🙏</h2>' +
          '<p>Your appointment with <b>Jyotish Chetan Oli</b> is booked.</p>' +
          table([
            ['Booking ID', d.booking_id],
            ['नेपाली मिति', d.date_bs],
            ['English date', d.date_ad],
            ['Time', d.time_npt],
            ['Duration', d.duration],
            ['Consultation', d.consult_type],
            ['Paid', d.amount + ' via ' + d.method]
          ]) +
          '<p>Your payment will be checked before the meeting. If anything is wrong, you will get a call on ' + esc(d.customer_phone) + '.</p>' +
          '<p>Questions? Call <b>' + esc(d.astrologer_phone) + '</b> or reply to this email.</p>' +
          '<p style="color:#666">Your confirmation is attached. Please keep it.</p></div>',
        replyTo: OWNER_EMAIL,
        name: SENDER_NAME,
        attachments: ticket ? [ticket] : []
      });
    }

    // 3. Keep a record in Google Sheets
    if (SAVE_TO_SHEET) { try { saveRow(d); } catch (err) {} }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, message: 'Booking email service is running.' });
}

/** Run this once from the editor (select testSetup, click Run) to give permission and send a test email. */
function testSetup() {
  MailApp.sendEmail(OWNER_EMAIL, 'Website booking emails are working',
    'This is a test from your Jyotish Paramarsha Sewa website. Bookings will arrive like this, with the payment screenshot attached.');
  if (SAVE_TO_SHEET) saveRow({ booking_id: 'TEST', customer_name: 'Test', date_ad: new Date().toDateString() });
}

function saveRow(d) {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('SHEET_ID'), ss;
  if (id) {
    ss = SpreadsheetApp.openById(id);
  } else {
    ss = SpreadsheetApp.create('Jyotish bookings');
    props.setProperty('SHEET_ID', ss.getId());
    ss.getSheets()[0].appendRow(['Received', 'Booking ID', 'Name', 'Phone', 'Email', 'Nepali date', 'English date',
      'Time', 'Type', 'Address', 'Topic', 'Amount', 'Paid via', 'Transaction ID']);
  }
  ss.getSheets()[0].appendRow([new Date(), d.booking_id, d.customer_name, d.customer_phone, d.customer_email, d.date_bs,
    d.date_ad, d.time_npt, d.consult_type, d.address || '', d.topic, d.amount, d.method, d.txn_id || '']);
}

function table(rows) {
  return '<table style="border-collapse:collapse;font-family:Arial;font-size:14px">' +
    rows.map(function (r) {
      return '<tr><td style="padding:6px 12px;border:1px solid #ddd;background:#f6f1e7;color:#555">' + esc(r[0]) +
        '</td><td style="padding:6px 12px;border:1px solid #ddd"><b>' + esc(r[1]) + '</b></td></tr>';
    }).join('') + '</table>';
}

function esc(v) {
  return String(v == null ? '' : v).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
