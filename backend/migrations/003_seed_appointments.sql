-- Seed 5 sample appointments
-- Replace the UUIDs below with real IDs from your mothers and mobile_health_workers tables

INSERT INTO public.appointments (motherId, healthWorkerId, type, scheduledAt, location, status)
VALUES
  (
    (SELECT id FROM public.mothers LIMIT 1), -- replace with a real mother UUID if needed
    (SELECT id FROM public.mobile_health_workers LIMIT 1), -- replace with a real healthworker UUID if needed
    'Antenatal Visit 3',
    NOW() + INTERVAL '1 day',
    'Mukamira Health Center',
    'upcoming'
  ),
  (
    (SELECT id FROM public.mothers LIMIT 1),
    (SELECT id FROM public.mobile_health_workers LIMIT 1),
    'Antenatal Visit 4',
    NOW() + INTERVAL '3 days',
    'Mukamira Health Center',
    'upcoming'
  ),
  (
    (SELECT id FROM public.mothers LIMIT 1),
    (SELECT id FROM public.mobile_health_workers LIMIT 1),
    'Follow-up',
    NOW() + INTERVAL '7 days',
    'Mukamira Health Center',
    'upcoming'
  ),
  (
    (SELECT id FROM public.mothers LIMIT 1),
    (SELECT id FROM public.mobile_health_workers LIMIT 1),
    'Postnatal Check',
    NOW() + INTERVAL '14 days',
    'Mukamira Health Center',
    'upcoming'
  ),
  (
    (SELECT id FROM public.mothers LIMIT 1),
    (SELECT id FROM public.mobile_health_workers LIMIT 1),
    'Vaccination',
    NOW() + INTERVAL '21 days',
    'Mukamira Health Center',
    'upcoming'
  );
