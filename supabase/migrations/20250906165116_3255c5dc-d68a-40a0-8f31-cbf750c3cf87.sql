-- Enable Row Level Security on the usuarios table
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- Create policies for usuarios table - only authenticated users can access
CREATE POLICY "Allow authenticated users to view usuarios" 
  ON public.usuarios 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert usuarios" 
  ON public.usuarios 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update usuarios" 
  ON public.usuarios 
  FOR UPDATE 
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete usuarios" 
  ON public.usuarios 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Enable RLS on other tables that currently don't have it
ALTER TABLE public.bodegas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tarifas_generales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.log_equipos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.log_equipos_tipo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.log_equipos_clase ENABLE ROW LEVEL SECURITY;

-- Create basic authenticated-only policies for these tables
CREATE POLICY "Allow authenticated access to bodegas" ON public.bodegas FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access to stands" ON public.stands FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access to tarifas_generales" ON public.tarifas_generales FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access to log_equipos" ON public.log_equipos FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access to log_equipos_tipo" ON public.log_equipos_tipo FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access to log_equipos_clase" ON public.log_equipos_clase FOR ALL TO authenticated USING (true);