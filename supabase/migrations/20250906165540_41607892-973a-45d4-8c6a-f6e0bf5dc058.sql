-- Add user_id column to track who created/owns each tercero record
ALTER TABLE public.ge_tercero ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Add company_id column for multi-tenant access (if users belong to different companies)
ALTER TABLE public.ge_tercero ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES empresas(id) ON DELETE SET NULL;

-- Remove the overly permissive policies
DROP POLICY IF EXISTS "Allow all users to delete ge_tercero" ON public.ge_tercero;
DROP POLICY IF EXISTS "Allow all users to insert ge_tercero" ON public.ge_tercero;
DROP POLICY IF EXISTS "Allow all users to read ge_tercero" ON public.ge_tercero;
DROP POLICY IF EXISTS "Allow all users to update ge_tercero" ON public.ge_tercero;

-- Create secure, user-specific policies
CREATE POLICY "Users can view terceros they created or from their company" 
  ON public.ge_tercero 
  FOR SELECT 
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    company_id IN (
      SELECT id FROM empresas WHERE id IN (
        SELECT company_id FROM profiles WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can insert terceros for their company" 
  ON public.ge_tercero 
  FOR INSERT 
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    (company_id IS NULL OR company_id IN (
      SELECT id FROM empresas WHERE id IN (
        SELECT company_id FROM profiles WHERE id = auth.uid()
      )
    ))
  );

CREATE POLICY "Users can update terceros they created" 
  ON public.ge_tercero 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete terceros they created" 
  ON public.ge_tercero 
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Service role retains full access for administrative operations
CREATE POLICY "Service role full access to ge_tercero" 
  ON public.ge_tercero 
  FOR ALL 
  TO service_role
  USING (true);