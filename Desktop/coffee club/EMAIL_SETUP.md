# Email Form Setup Guide

The contact form uses **EmailJS** to send emails without needing a backend server or database. It's free and easy to set up!

## Quick Setup Steps:

### 1. Create a Free EmailJS Account
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account (100 emails/month free)

### 2. Create an Email Service
   - In EmailJS dashboard, go to **Email Services**
   - Click **Add New Service**
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - **Copy your Service ID** (looks like: `service_xxxxx`)

### 3. Create an Email Template
   - Go to **Email Templates** in EmailJS dashboard
   - Click **Create New Template**
   - Use this template:
     ```
     Subject: New Contact Form Message from {{from_name}}
     
     From: {{from_name}}
     Email: {{from_email}}
     
     Message:
     {{message}}
     ```
   - Set "To Email" to your email address
   - **Copy your Template ID** (looks like: `template_xxxxx`)

### 4. Get Your Public Key
   - Go to **Account** → **General**
   - **Copy your Public Key** (looks like: `xxxxxxxxxxxxx`)

### 5. Update the Code
   Open `script.js` and replace these placeholders:
   
   ```javascript
   // Line ~87: Replace with your Public Key
   emailjs.init("YOUR_PUBLIC_KEY");
   
   // Line ~103: Replace with your Service ID
   'YOUR_SERVICE_ID',
   
   // Line ~104: Replace with your Template ID
   'YOUR_TEMPLATE_ID',
   ```

### 6. Test It!
   - Open your website
   - Fill out the contact form
   - Submit it
   - Check your email!

## Alternative: Simple Form Services (Even Easier!)

If you want something even simpler, you can use:

### Option A: Formspree (Recommended for Simplicity)
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up (free plan available)
3. Get your form endpoint
4. Update the form in `index.html`:
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
5. Remove the JavaScript form handling (or keep it for validation)

### Option B: Web3Forms
1. Go to [https://web3forms.com/](https://web3forms.com/)
2. Get your access key
3. Update the form:
   ```html
   <form class="contact-form" action="https://api.web3forms.com/submit" method="POST">
       <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
   ```

## Current Status
Right now, the form shows a success message but doesn't actually send emails until you complete one of the setups above.

## Easiest Option (Recommended for Beginners): Formspree

**This is the simplest - just 2 steps!**

1. Go to [https://formspree.io/](https://formspree.io/) and sign up (free - 50 submissions/month)
2. Create a new form and copy your form endpoint (looks like: `https://formspree.io/f/xxxxx`)
3. Update `index.html` line 287, change:
   ```html
   <form class="contact-form">
   ```
   to:
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Replace `YOUR_FORM_ID` with your actual Formspree form ID
5. Done! The form will now send emails to your email address automatically.

**That's it!** No JavaScript changes needed. Formspree handles everything.

