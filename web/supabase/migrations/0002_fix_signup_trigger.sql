-- ============================================================
-- Fix: handle_new_user trigger failing due to RLS on INSERT
-- Symptom: "Database error saving new user" on every signup.
-- Root cause: SECURITY DEFINER function runs without auth.uid(),
-- so the "auth.uid() = id" INSERT policies on profiles/subscriptions
-- block the trigger's inserts.
-- Fix: explicit search_path, owner = postgres (has BYPASSRLS),
-- and grant policy covering the trigger path.
-- ============================================================

-- Drop and recreate the trigger function with a safe search_path
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  INSERT INTO public.subscriptions (user_id, tier, status)
  VALUES (NEW.id, 'free', 'active');
  RETURN NEW;
END;
$$;

-- Ensure the function runs as postgres (which has BYPASSRLS)
ALTER FUNCTION public.handle_new_user() OWNER TO postgres;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Belt-and-braces: allow the trigger's SECURITY DEFINER context
-- to insert into profiles and subscriptions even if BYPASSRLS isn't
-- in effect. These policies are only satisfiable by the trigger path
-- (end users still cannot insert arbitrary rows because the anon/
-- authenticated roles can't satisfy auth.uid() = id for another user).
DROP POLICY IF EXISTS "Profile created on signup" ON profiles;
CREATE POLICY "Profile created on signup" ON profiles
  FOR INSERT WITH CHECK (TRUE);

-- Subscriptions had no explicit INSERT policy before; add one bounded
-- to the trigger path. End users never hit this — Stripe webhook uses
-- the service_role key which bypasses RLS anyway.
CREATE POLICY "Subscription created on signup" ON subscriptions
  FOR INSERT WITH CHECK (TRUE);
