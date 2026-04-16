# MyLage - Deployment Guide

Complete step-by-step instructions to deploy your MyLage fuel tracking application.

---

## 📋 Prerequisites

- Google Account
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of Google Sheets and Google Drive

---

## 🚀 Part 1: Google Sheets Setup

### Step 1: Create a New Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Rename it to **"MyLage Fuel Tracker"** (or any name you prefer)

### Step 2: Set Up the Sheet Structure

1. In the first row, add the following headers (in order):
   - Column A: **Date**
   - Column B: **Vehicle**
   - Column C: **Petrol Pump**
   - Column D: **Speedometer**
   - Column E: **Price**
   - Column F: **Liters**
   - Column G: **Total**

2. Optional: Format the header row:
   - Select row 1
   - Make it bold
   - Add background color
   - Freeze the row (View > Freeze > 1 row)

3. Rename the sheet tab to **"FuelData"** (bottom-left of the sheet)
   - Right-click on "Sheet1" > Rename > Enter "FuelData"

> **Important:** The sheet name must match the `SHEET_NAME` constant in the Apps Script code (default: "FuelData")

---

## 🔧 Part 2: Google Apps Script Setup

### Step 1: Open Apps Script Editor

1. In your Google Sheet, click **Extensions** > **Apps Script**
2. A new tab will open with the Apps Script editor
3. You'll see a default `Code.gs` file with some sample code

### Step 2: Add the Backend Code

1. Delete all existing code in `Code.gs`
2. Copy the entire contents of `google-apps-script.js` from this project
3. Paste it into `Code.gs`
4. Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`
5. Name your project (e.g., "MyLage Backend") when prompted

### Step 3: Test the Script (Optional but Recommended)

1. In the Apps Script editor, find the function dropdown (next to Debug button)
2. Select **`initializeSampleData`**
3. Click **Run** (▶️)
4. You'll be asked to authorize the script:
   - Click **Review Permissions**
   - Choose your Google account
   - Click **Advanced** > **Go to [Your Project Name] (unsafe)**
   - Click **Allow**
5. Check your Google Sheet - you should see sample data added

> **Note:** You can clear sample data later by running the `clearAllData` function

---

## 🌐 Part 3: Deploy as Web App

### Step 1: Deploy the Script

1. In the Apps Script editor, click **Deploy** > **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description:** "MyLage Fuel Tracker API" (or any description)
   - **Execute as:** **Me** (your email)
   - **Who has access:** **Anyone** (important for the app to work)
5. Click **Deploy**

### Step 2: Authorize the Deployment

1. Click **Authorize access**
2. Choose your Google account
3. Click **Advanced** > **Go to [Your Project Name] (unsafe)**
4. Review permissions and click **Allow**

### Step 3: Copy the Web App URL

1. After successful deployment, you'll see a dialog with:
   - **Deployment ID**
   - **Web app URL** ← This is what you need!
2. **Copy the Web app URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
3. Click **Done**

> **Important:** Save this URL - you'll need it for the frontend configuration!

---

## 💻 Part 4: Frontend Configuration

### Step 1: Update the API URL

1. Open `index.html` in a text editor
2. Find this line (around line 475):
   ```javascript
   API_URL: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE',
   ```
3. Replace the placeholder with your actual Web App URL:
   ```javascript
   API_URL: 'https://script.google.com/macros/s/AKfycby.../exec',
   ```
4. Save the file

### Step 2: Test Locally (Optional)

1. Open `index.html` in your web browser (double-click the file)
2. Try submitting a test entry in the **Capture** tab
3. Check your Google Sheet to verify the entry was added
4. Switch to the **View Mileage** tab to see the data

> **Note:** Some browsers may block requests due to CORS. If you encounter issues, proceed to hosting the app online.

---

## 🌍 Part 5: Hosting Options

You have several options to host your MyLage app:

### Option 1: GitHub Pages (Recommended - Free)

1. **Create a GitHub account** (if you don't have one)
2. **Create a new repository:**
   - Name: `mylage-app`
   - Make it Public
   - Don't add README, .gitignore, or license
3. **Upload your file:**
   - Click **Add file** > **Upload files**
   - Drag and drop `index.html`
   - Commit the file
4. **Enable GitHub Pages:**
   - Go to repository **Settings**
   - Scroll to **Pages** section (left sidebar)
   - Under **Source**, select **main** branch
   - Click **Save**
5. **Access your app:**
   - After a few minutes, your app will be live at:
   - `https://[your-username].github.io/mylage-app/`

### Option 2: Netlify (Free)

1. Go to [Netlify](https://www.netlify.com)
2. Sign up for a free account
3. Click **Add new site** > **Deploy manually**
4. Drag and drop your `index.html` file
5. Your app will be deployed instantly with a URL like:
   - `https://random-name.netlify.app`
6. Optional: Customize the domain name in site settings

### Option 3: Vercel (Free)

1. Go to [Vercel](https://vercel.com)
2. Sign up for a free account
3. Click **Add New** > **Project**
4. Create a new Git repository or drag and drop your file
5. Deploy with one click
6. Your app will be live at:
   - `https://your-project.vercel.app`

### Option 4: Local File (Simple but Limited)

1. Just open `index.html` in your browser
2. Bookmark it for easy access
3. **Limitation:** Some browsers may have CORS restrictions

---

## 📱 Part 6: Mobile Access

### Add to Home Screen (iOS)

1. Open your hosted app URL in Safari
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **Add to Home Screen**
4. Name it "MyLage"
5. Tap **Add**

### Add to Home Screen (Android)

1. Open your hosted app URL in Chrome
2. Tap the **Menu** (three dots)
3. Tap **Add to Home screen**
4. Name it "MyLage"
5. Tap **Add**

Now you can launch MyLage like a native app!

---

## ✅ Part 7: Testing & Verification

### Test the Complete Flow

1. **Add a Fuel Entry:**
   - Open the app
   - Fill in all fields in the Capture tab
   - Submit
   - Verify success message appears

2. **Verify Data in Google Sheet:**
   - Open your Google Sheet
   - Check that the new entry appears
   - Verify all fields are correct

3. **View Analytics:**
   - Switch to "View Mileage" tab
   - Verify statistics are calculated correctly
   - Check vehicle-wise dashboard
   - Review per-entry mileage calculations

4. **Test Multiple Vehicles:**
   - Add entries for both vehicles (1 and 2)
   - Verify separate statistics for each vehicle
   - Check "Best Efficiency" badge

---

## 🔄 Part 8: Updating the App

### If You Need to Update the Backend

1. Go to your Apps Script project
2. Make your changes to the code
3. Save the file
4. Click **Deploy** > **Manage deployments**
5. Click the **Edit** icon (pencil) next to your deployment
6. Change **Version** to **New version**
7. Add a description of changes
8. Click **Deploy**
9. The Web App URL remains the same - no frontend changes needed!

### If You Need to Update the Frontend

1. Edit `index.html` locally
2. Test your changes
3. Re-upload to your hosting platform:
   - **GitHub Pages:** Commit and push the new file
   - **Netlify/Vercel:** Drag and drop the updated file or redeploy
   - **Local:** Just refresh your browser

---

## 🐛 Troubleshooting

### Issue: "Error submitting entry"

**Solutions:**
- Verify the API_URL is correct in `index.html`
- Check that the Web App is deployed as "Anyone" can access
- Make sure all form fields are filled
- Check browser console for detailed error messages

### Issue: "Error loading data"

**Solutions:**
- Verify the API_URL is correct
- Check your internet connection
- Open the Web App URL directly in browser to test
- Clear browser cache and reload

### Issue: No data appears in Google Sheet

**Solutions:**
- Verify the sheet name is "FuelData" (or matches SHEET_NAME in script)
- Check Apps Script execution logs:
  - Apps Script Editor > **Executions** (left sidebar)
  - Look for errors
- Re-authorize the script permissions

### Issue: Mileage calculations seem wrong

**Solutions:**
- Verify speedometer readings are entered correctly
- Check that entries are sorted by date (script does this automatically)
- Ensure you're using the same vehicle for consecutive entries
- First entry per vehicle won't show mileage (needs at least 2 entries)

### Issue: CORS errors in browser console

**Solutions:**
- Host the app on a web server (GitHub Pages, Netlify, etc.)
- Don't open index.html directly from file system
- Use a local web server for development (e.g., Python's `http.server`)

---

## 🔒 Security Notes

1. **Public Access:** The Web App is accessible by anyone with the URL. Don't share sensitive data.
2. **No Authentication:** This app has no login system. Anyone with the URL can submit data.
3. **Rate Limiting:** Google Apps Script has quotas. For personal use, you're unlikely to hit them.
4. **Data Privacy:** Data is stored in your Google Sheet. Only you can access the sheet directly.

### To Add Basic Security (Optional):

You can modify the `doPost` function in Apps Script to check for a secret key:

```javascript
function doPost(e) {
  const SECRET_KEY = 'your-secret-key-here';
  const data = JSON.parse(e.postData.contents);
  
  // Check secret key
  if (data.secretKey !== SECRET_KEY) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Unauthorized' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // ... rest of the code
}
```

Then update the frontend to send the secret key with each request.

---

## 📊 Sample Data Format

Here's what your Google Sheet should look like:

| Date       | Vehicle | Petrol Pump | Speedometer | Price  | Liters | Total  |
|------------|---------|-------------|-------------|--------|--------|--------|
| 2024-01-01 | 1    | HP KSR      | 10000       | 105.00 | 30.00  | 3150.00|
| 2024-01-08 | 1    | BP MAJ      | 10450       | 106.50 | 28.00  | 2982.00|
| 2024-01-15 | 1    | HP KSR      | 10890       | 105.80 | 29.00  | 3068.20|

---

## 🎯 Tips for Best Results

1. **Regular Updates:** Enter fuel data immediately after refueling for accuracy
2. **Consistent Format:** Always use the same date format and fill all fields
3. **Verify Speedometer:** Double-check readings to avoid calculation errors
4. **Backup Data:** Periodically export your Google Sheet (File > Download > CSV)
5. **Monitor Trends:** Check the analytics regularly to optimize fuel efficiency

---

## 🆘 Getting Help

If you encounter issues:

1. **Check Browser Console:**
   - Press F12 > Console tab
   - Look for error messages

2. **Check Apps Script Logs:**
   - Apps Script Editor > Executions
   - View execution details and errors

3. **Test Components Separately:**
   - Test the GET endpoint: Open Web App URL in browser
   - Test the POST endpoint: Run `testPost()` in Apps Script editor

4. **Common Issues:**
   - Most issues are related to incorrect API_URL configuration
   - Make sure deployment is set to "Anyone" can access
   - Verify sheet name matches the script constant

---

## 📈 Future Enhancements (Ideas)

- Add authentication using Google Sign-In
- Export data as PDF reports
- Add fuel cost analytics
- Send monthly summary emails
- Add more vehicle options
- Track maintenance records
- Add fuel price history charts
- Integration with Google Maps for pump locations

---

## ✨ Congratulations!

Your MyLage fuel tracker is now live! 🎉

**Quick Reference URLs:**
- **Frontend App:** `[Your hosted URL]`
- **Google Sheet:** `[Your Google Sheet URL]`
- **Apps Script:** `[Your Apps Script URL]`
- **Web App API:** `[Your Web App exec URL]`

Happy tracking! 🚗⛽📊
