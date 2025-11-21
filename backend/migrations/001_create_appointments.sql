-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  motherId UUID REFERENCES public.mothers(id) ON DELETE CASCADE,
  healthWorkerId UUID REFERENCES public.mobile_health_workers(id) ON DELETE CASCADE,
  type TEXT, -- e.g., "Antenatal Visit 3", "Follow-up"
  scheduledAt TIMESTAMPTZ NOT NULL,
  location TEXT,
  status TEXT DEFAULT 'upcoming', -- upcoming, completed, missed, cancelled
  notes TEXT,
  createdAt TIMESTAMPTZ DEFAULT now(),
  updatedAt TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Policies: health workers can only see their own appointments
CREATE POLICY "Health workers can view own appointments" ON public.appointments
  FOR SELECT USING (auth.uid() = healthWorkerId);

CREATE POLICY "Health workers can insert own appointments" ON public.appointments
  FOR INSERT WITH CHECK (auth.uid() = healthWorkerId);

CREATE POLICY "Health workers can update own appointments" ON public.appointments
  FOR UPDATE USING (auth.uid() = healthWorkerId);

CREATE POLICY "Health workers can delete own appointments" ON public.appointments
  FOR DELETE USING (auth.uid() = healthWorkerId);

-- Indexes for performance
CREATE INDEX idx_appointments_healthWorkerId ON public.appointments(healthWorkerId);
CREATE INDEX idx_appointments_scheduledAt ON public.appointments(scheduledAt);
CREATE INDEX idx_appointments_status ON public.appointments(status);
