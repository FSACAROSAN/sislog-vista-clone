-- First, let's add a user_id column to link usuarios to auth.users
ALTER TABLE public.usuarios ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update the RLS policies to be user-specific
DROP POLICY IF EXISTS "Allow authenticated users to view usuarios" ON public.usuarios;
DROP POLICY IF EXISTS "Allow authenticated users to insert usuarios" ON public.usuarios;
DROP POLICY IF EXISTS "Allow authenticated users to update usuarios" ON public.usuarios;
DROP POLICY IF EXISTS "Allow authenticated users to delete usuarios" ON public.usuarios;

-- Create user-specific RLS policies
CREATE POLICY "Users can view their own usuario record" 
  ON public.usuarios 
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usuario record" 
  ON public.usuarios 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own usuario record" 
  ON public.usuarios 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own usuario record" 
  ON public.usuarios 
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- For admin access, create separate policies if needed
-- Admins could be identified by a role in the profiles table
CREATE POLICY "Allow service role full access to usuarios" 
  ON public.usuarios 
  FOR ALL 
  TO service_role
  USING (true);