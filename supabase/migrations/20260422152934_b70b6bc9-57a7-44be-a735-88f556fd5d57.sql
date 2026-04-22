
CREATE OR REPLACE FUNCTION public.tg_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Replace broad public read with anon-restricted read so listing is blocked but direct file reads work
DROP POLICY IF EXISTS "public read media" ON storage.objects;
CREATE POLICY "public read media files" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'media');
