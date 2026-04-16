# 🚗 MyLage - Fuel Efficiency Tracker

A lightweight, mobile-first web application to track vehicle fuel efficiency and gain analytics insights.

![MyLage Banner](https://img.shields.io/badge/MyLage-Fuel%20Tracker-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-yellow?style=flat-square)

---

## ✨ Features

### 📝 Fuel Entry Capture
- Quick form to log fuel refills
- Auto-calculated totals
- Date picker with IST timezone support
- Vehicle and pump selection dropdowns
- Real-time validation

### 📊 Analytics Dashboard
- **Total Mileage:** Overall efficiency (km/l)
- **Average Mileage:** Last 5 entries with date range
- **Trend Indicators:** Track if efficiency is improving, declining, or stable
- **Vehicle-wise Stats:** Separate analytics for each vehicle
- **Per-Entry Breakdown:** Detailed mileage for each refill

### 🎯 Vehicle Comparison
- Side-by-side vehicle performance
- Best efficiency badge
- Total distance and fuel consumed
- Number of refills tracked

### ⚡ Performance
- Load time < 2 seconds
- Offline-capable with caching
- Smooth tab switching
- No heavy frameworks
- Mobile-optimized

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Google Apps Script |
| Database | Google Sheets |
| Hosting | GitHub Pages / Netlify / Vercel |

**Why this stack?**
- ✅ Zero cost
- ✅ No server maintenance
- ✅ Automatic backups
- ✅ Easy deployment
- ✅ Mobile-first design

---

## 🚀 Quick Start

### 1. Clone or Download
```bash
git clone https://github.com/yourusername/mylage.git
cd mylage
```

Or download the ZIP file and extract it.

### 2. Deploy Backend
Follow the instructions in [DEPLOYMENT.md](DEPLOYMENT.md) to:
- Set up Google Sheets
- Deploy Google Apps Script
- Get your Web App URL

### 3. Configure Frontend
Edit `index.html` and replace the API URL:
```javascript
API_URL: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE',
```

### 4. Deploy Frontend
Choose your hosting option:
- **GitHub Pages** (recommended)
- **Netlify**
- **Vercel**
- Or simply open `index.html` locally

### 5. Start Tracking! 🎉
Open your app and add your first fuel entry.

---

## 📱 Usage

### Adding a Fuel Entry

1. Open the app
2. Go to **Capture** tab (default)
3. Fill in the form:
   - Date (defaults to today)
   - Vehicle Number (6118 or 2751)
   - Petrol Pump (select from dropdown)
   - Speedometer Reading (in km)
   - Price Per Liter (in INR)
   - Liters filled
   - Total (auto-calculated)
4. Click **Submit Entry**
5. Success message confirms the entry

### Viewing Analytics

1. Switch to **View Mileage** tab
2. View global statistics at the top
3. Scroll down for vehicle-wise dashboard
4. See per-entry mileage breakdown
5. Click **🔄 Refresh Data** to reload

---

## 📐 Calculation Methods

### 1. Per-Entry Mileage
```
Distance = Current Speedometer - Previous Speedometer (same vehicle)
Mileage = Distance / Liters Filled
```

### 2. Total Mileage
```
Total Mileage = Latest Speedometer / Total Liters (all entries)
```

### 3. Average Mileage (Last 5)
```
Average = Sum of last 5 mileage entries / 5
```
If less than 5 entries exist, uses available entries.

### 4. Trend Indicator
Compares average of last 5 entries with previous 5 entries:
- **↑ Improving:** > 2% increase
- **↓ Declining:** > 2% decrease
- **➡️ Stable:** Within ±2%

---

## 🎨 UI/UX Highlights

- **Mobile-First:** Optimized for smartphones
- **Clean Design:** Minimal, fast-loading interface
- **Instant Feedback:** Real-time validation and calculations
- **Color-Coded Stats:** Visual indicators for trends
- **Smooth Animations:** Polished user experience
- **Responsive Layout:** Works on all screen sizes

---

## 📂 Project Structure

```
mylage/
├── index.html                 # Complete frontend (HTML + CSS + JS)
├── google-apps-script.js      # Backend code for Google Apps Script
├── DEPLOYMENT.md              # Step-by-step deployment guide
└── README.md                  # This file
```

---

## 🔧 Configuration

### Supported Vehicles
Default vehicles in the app:
- **1**
- **2**

To add more vehicles, edit the dropdown in `index.html`:
```html
<select id="vehicle" required>
    <option value="">Select Vehicle</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="YOUR_NEW_VEHICLE">YOUR_NEW_VEHICLE</option>
</select>
```

And update validation in `google-apps-script.js`:
```javascript
if (!['6118', '2751', 'YOUR_NEW_VEHICLE'].includes(data.vehicle)) {
    return false;
}
```

### Supported Petrol Pumps
Default pumps:
- HP KSR
- BP MAJ
- IOL MNP
- BP ADH
- HP MNP
- IOL BYP
- OTHERS

Add more by editing the dropdown in `index.html`.

### Cache Duration
Default: 5 minutes. Change in `index.html`:
```javascript
CACHE_DURATION: 5 * 60 * 1000 // milliseconds
```

---

## 🧪 Testing

### Manual Testing Checklist

#### Capture Tab
- [ ] Form loads with today's date
- [ ] All dropdowns populated
- [ ] Total auto-calculates correctly
- [ ] Validation works (empty fields rejected)
- [ ] Success message appears after submit
- [ ] Form clears after successful submit
- [ ] Warning shows if speedometer < previous entry

#### View Mileage Tab
- [ ] Loading spinner appears
- [ ] Global stats display correctly
- [ ] Best vehicle badge shows
- [ ] Vehicle cards render properly
- [ ] Trend indicators are accurate
- [ ] Per-entry mileage list populates
- [ ] Refresh button works
- [ ] Empty state shows when no data

#### Backend
- [ ] Data saves to Google Sheet
- [ ] Entries sort by date automatically
- [ ] GET endpoint returns valid JSON
- [ ] POST endpoint accepts data
- [ ] Sheet creates if doesn't exist

### Sample Test Data

Run `initializeSampleData()` in Apps Script to add test entries:
```
Vehicle 1:
- 2024-01-01: 10000 km, 30L
- 2024-01-08: 10450 km, 28L (15 km/l)
- 2024-01-15: 10890 km, 29L (15.17 km/l)

Vehicle 2:
- 2024-01-03: 25000 km, 32L
- 2024-01-10: 25480 km, 30L (16 km/l)
- 2024-01-17: 25920 km, 31L (14.19 km/l)
```

---

## 🐛 Known Issues & Limitations

1. **No Authentication:** Anyone with the URL can submit data
2. **Browser Compatibility:** Requires modern browser (Chrome, Firefox, Safari, Edge)
3. **CORS Issues:** Some browsers block local file access (use hosted version)
4. **No Offline Submit:** Requires internet to save entries
5. **Google Quotas:** Apps Script has daily execution limits (rarely hit for personal use)

---

## 🔒 Security Considerations

### Current Setup
- No authentication required
- Public access via Web App URL
- Data stored in your private Google Sheet
- Only you can access the sheet directly

### Recommendations
1. **Don't share your Web App URL publicly**
2. **Don't track sensitive vehicle data**
3. **Enable 2FA on your Google Account**
4. **Regularly backup your Google Sheet**

### Optional: Add Secret Key
See DEPLOYMENT.md for instructions on adding basic API key authentication.

---

## 🔄 Data Export & Backup

### Export from Google Sheets
1. Open your Google Sheet
2. **File** > **Download** > **Comma Separated Values (.csv)**
3. Save to your computer

### Automated Backup (Advanced)
Use Google Apps Script triggers:
1. Apps Script Editor > **Triggers** (clock icon)
2. Add trigger to run weekly backup function
3. Email CSV or save to Google Drive

---

## 📊 Data Schema

### Google Sheet Columns

| Column | Type | Description |
|--------|------|-------------|
| Date | Date | Refill date (YYYY-MM-DD) |
| Vehicle | Text | Vehicle number (6118, 2751) |
| Petrol Pump | Text | Pump name |
| Speedometer | Number | Odometer reading (km) |
| Price | Number | Price per liter (INR) |
| Liters | Number | Fuel quantity filled |
| Total | Number | Total cost (Price × Liters) |

---

## 🎯 Roadmap

### Version 1.1 (Planned)
- [ ] PWA support (install as native app)
- [ ] Dark mode toggle
- [ ] Export reports as PDF
- [ ] Multi-currency support
- [ ] Fuel cost analytics

### Version 2.0 (Future)
- [ ] Google Sign-In authentication
- [ ] Multiple user support
- [ ] Maintenance tracking
- [ ] Reminder notifications
- [ ] Charts and graphs
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software.

---

## 👨‍💻 Author

- GitHub: [@yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Google Apps Script for free backend hosting
- Google Sheets for simple database solution
- Modern browsers for excellent web standards support

---
Last Updated: January 2026
