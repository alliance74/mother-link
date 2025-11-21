-- Rename columns to match controller expectations (camelCase)
ALTER TABLE public.appointments RENAME COLUMN healthworkerid TO healthWorkerId;
ALTER TABLE public.appointments RENAME COLUMN scheduledat TO scheduledAt;

-- Recreate indexes with new names
DROP INDEX IF EXISTS idx_appointments_healthWorkerId;
CREATE INDEX idx_appointments_healthWorkerId ON public.appointments(healthWorkerId);

DROP INDEX IF EXISTS idx_appointments_scheduledAt;
CREATE INDEX idx_appointments_scheduledAt ON public.appointments(scheduledAt);
