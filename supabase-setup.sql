-- Create the app_submissions table
CREATE TABLE IF NOT EXISTS app_submissions (
  id BIGSERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  app_name TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT 'null',
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on timestamp for faster queries
CREATE INDEX IF NOT EXISTS idx_app_submissions_timestamp ON app_submissions(timestamp);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS idx_app_submissions_status ON app_submissions(status);

-- Enable Row Level Security (RLS)
ALTER TABLE app_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (you can restrict this later)
CREATE POLICY "Allow all operations" ON app_submissions
  FOR ALL USING (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_app_submissions_updated_at 
  BEFORE UPDATE ON app_submissions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
