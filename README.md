# Vibe Coding Studio - MVP Backend

A simple MVP backend for Vibe Coding Studio that collects user app ideas and stores them in an Excel file.

## Features

- **User Form Submission**: Collect app ideas with features, vibe preferences, and contact info
- **Excel Storage**: All submissions are stored in a local Excel file (`submissions.xlsx`)
- **Admin Dashboard**: View and manage submissions with status updates
- **Simple API**: RESTful endpoints for form submission and admin operations

## Project Structure

```
project/
├── src/                    # React frontend
│   ├── App.tsx           # Main application component
│   ├── AdminDashboard.tsx # Admin interface for managing submissions
│   └── ...
├── server.js              # Express backend server
├── submissions.xlsx       # Excel file storing submissions (auto-created)
└── package.json
```

## API Endpoints

- `POST /api/submit-idea` - Submit a new app idea
- `GET /api/submissions` - Get all submissions (admin)
- `PUT /api/submissions/:index/status` - Update submission status

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the backend server:**
   ```bash
   npm run server
   ```
   This will start the Express server on port 3001 and create the Excel file.

3. **Run the frontend (in a new terminal):**
   ```bash
   npm run dev
   ```
   This will start the Vite dev server on port 5173.

4. **Run both simultaneously:**
   ```bash
   npm run dev:full
   ```

## Usage

### For Users
1. Navigate to the Submit page
2. Fill out the form with your app idea details
3. Submit the form - data will be saved to Excel

### For Admins
1. Click the Admin button in the navigation
2. View all submissions in a table format
3. Update submission statuses (New → In Progress → Delivered)
4. Export data from the Excel file as needed

## Excel File Structure

The `submissions.xlsx` file contains the following columns:
- Timestamp
- App Name
- Description
- Features
- Vibe
- Contact Name
- Email
- Phone
- Status

## Development

- **Backend**: Node.js + Express
- **Frontend**: React + TypeScript + Tailwind CSS
- **Database**: Local Excel file (using xlsx library)
- **Build Tool**: Vite

## Next Steps

This MVP can be extended with:
- User authentication for admin access
- Email notifications
- File uploads for app sketches
- Payment integration
- Automated app generation templates
- Database migration (PostgreSQL, MongoDB, etc.)

## Notes

- The Excel file is automatically created when the server starts
- All data is stored locally - no external database required
- The admin dashboard is accessible to anyone (no authentication yet)
- Form validation is handled on both frontend and backend
