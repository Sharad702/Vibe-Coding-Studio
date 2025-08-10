import express from 'express';
import cors from 'cors';
import { supabase, SUBMISSIONS_TABLE } from './supabase.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist')); // Serve the built React app



// Excel file path
const EXCEL_FILE = 'submissions.xlsx';

// Initialize Excel file if it doesn't exist
function initializeExcelFile() {
  if (!fs.existsSync(EXCEL_FILE)) {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([]);
    
    // Add headers
    const headers = [
      'Timestamp',
      'App Name',
      'Description', 
      'Features',
      'Contact Name',
      'Email',
      'Phone',
      'Status'
    ];
    
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');
    
    XLSX.writeFile(workbook, EXCEL_FILE);
    console.log('Excel file initialized with headers');
  }
}

// Add submission to Excel file
function addSubmissionToExcel(submission) {
  try {
    let workbook;
    let worksheet;
    
    if (fs.existsSync(EXCEL_FILE)) {
      workbook = XLSX.readFile(EXCEL_FILE);
      worksheet = workbook.Sheets['Submissions'];
    } else {
      initializeExcelFile();
      workbook = XLSX.readFile(EXCEL_FILE);
      worksheet = workbook.Sheets['Submissions'];
    }
    
    // Convert worksheet to JSON to get existing data
    const existingData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Add new submission
    const newRow = [
      new Date().toISOString(),
      submission.appName,
      submission.description,
      submission.features.join(', '),
      submission.name,
      submission.email,
      submission.phone || 'null',
      'New'
    ];
    
    existingData.push(newRow);
    
    // Create new worksheet with updated data
    const newWorksheet = XLSX.utils.aoa_to_sheet(existingData);
    workbook.Sheets['Submissions'] = newWorksheet;
    
    // Write to file
    XLSX.writeFile(workbook, EXCEL_FILE);
    
    console.log('Submission added to Excel file:', submission.appName);
    return true;
  } catch (error) {
    console.error('Error adding submission to Excel:', error);
    return false;
  }
}

// Routes
app.post('/api/submit-idea', async (req, res) => {
  try {
    const submission = req.body;
    
    // Validate required fields
    if (!submission.appName || !submission.description || !submission.name || !submission.email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Add to database
    const success = await addSubmissionToDatabase(submission);
    
    if (success) {
      res.json({ 
        success: true, 
        message: 'Your app idea has been submitted successfully! We\'ll review it and get back to you within 24 hours.' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to save submission. Please try again.' 
      });
    }
  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error. Please try again.' 
    });
  }
});

// Get all submissions (for admin purposes)
app.get('/api/submissions', async (req, res) => {
  try {
    const { data: submissions, error } = await supabase
      .from(SUBMISSIONS_TABLE)
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error reading submissions:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to read submissions' 
      });
    }

    // Format data to match frontend expectations
    const formattedSubmissions = submissions.map(submission => ({
      timestamp: submission.timestamp,
      appName: submission.app_name,
      description: submission.description,
      features: submission.features,
      contactName: submission.contact_name,
      email: submission.email,
      phone: submission.phone,
      status: submission.status
    }));
    
    res.json({ submissions: formattedSubmissions });
  } catch (error) {
    console.error('Error reading submissions:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to read submissions' 
    });
  }
});

// Update submission status
app.put('/api/submissions/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const { error } = await supabase
      .from(SUBMISSIONS_TABLE)
      .update({ status: status })
      .eq('id', id);

    if (error) {
      console.error('Error updating status:', error);
      return res.status(500).json({ message: 'Failed to update status' });
    }
    
    res.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Failed to update status' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Initialize database on startup
initializeDatabase();

// Function to initialize database (create table if not exists)
async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Check if table exists by trying to select from it
    const { data, error } = await supabase
      .from(SUBMISSIONS_TABLE)
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database initialization failed:', error.message);
      console.log('Please run the SQL setup script in your Supabase dashboard');
      return false;
    }
    
    console.log('✅ Database initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    return false;
  }
}

// Function to add submission to database
async function addSubmissionToDatabase(submission) {
  try {
    const { data, error } = await supabase
      .from(SUBMISSIONS_TABLE)
      .insert([
        {
          app_name: submission.appName,
          description: submission.description,
          features: submission.features,
          contact_name: submission.name,
          email: submission.email,
          phone: submission.phone || 'null',
          status: 'New'
        }
      ])
      .select();
    
    if (error) {
      console.error('❌ Error adding submission to database:', error);
      throw error;
    }
    
    console.log('✅ Submission added to database:', data[0]);
    return data[0];
  } catch (error) {
    console.error('❌ Failed to add submission to database:', error);
    throw error;
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Excel file: ${EXCEL_FILE}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/submit-idea`);
});
