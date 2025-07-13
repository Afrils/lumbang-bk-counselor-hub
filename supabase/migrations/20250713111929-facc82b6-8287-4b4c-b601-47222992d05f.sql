-- Insert admin user data (will be created when user registers)
-- This just sets up the admin profile data after the user signs up

-- Create a function to set admin role for specific email
CREATE OR REPLACE FUNCTION public.set_admin_role_for_email(_email TEXT)
RETURNS VOID
LANGUAGE PLPGSQL
SECURITY DEFINER
AS $$
DECLARE
  _user_id UUID;
BEGIN
  -- Get user ID from auth.users table
  SELECT id INTO _user_id 
  FROM auth.users 
  WHERE email = _email;
  
  IF _user_id IS NOT NULL THEN
    -- Update profile to admin role
    UPDATE public.profiles 
    SET role = 'admin'
    WHERE user_id = _user_id;
    
    -- Update user_roles table
    UPDATE public.user_roles 
    SET role = 'admin'
    WHERE user_id = _user_id;
    
    -- If no role exists, insert it
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;

-- Sample data for testing
INSERT INTO public.materials (title, description, content, category, target_class, created_by, is_published) 
SELECT 
  'Panduan Memilih Jurusan yang Tepat',
  'Materi bimbingan untuk membantu siswa memilih jurusan yang sesuai dengan minat dan bakat',
  'Memilih jurusan kuliah adalah keputusan penting yang akan mempengaruhi masa depan. Berikut adalah langkah-langkah yang dapat membantu: 1. Kenali minat dan bakat Anda, 2. Pelajari prospek karir dari jurusan yang diminati, 3. Pertimbangkan kemampuan finansial, 4. Konsultasi dengan guru BK dan orang tua.',
  'career',
  ARRAY['XII IPA', 'XII IPS', 'XII BAHASA'],
  (SELECT id FROM auth.users WHERE email = 'andikabgs@gmail.com' LIMIT 1),
  true
WHERE EXISTS (SELECT 1 FROM auth.users WHERE email = 'andikabgs@gmail.com');

INSERT INTO public.materials (title, description, content, category, target_class, created_by, is_published) 
SELECT 
  'Teknik Belajar Efektif',
  'Tips dan strategi untuk meningkatkan efektivitas belajar siswa',
  'Belajar efektif memerlukan strategi yang tepat: 1. Buat jadwal belajar yang konsisten, 2. Gunakan teknik pomodoro, 3. Buat catatan dengan mind mapping, 4. Diskusi dengan teman, 5. Evaluasi hasil belajar secara berkala.',
  'academic',
  ARRAY['X', 'XI', 'XII'],
  (SELECT id FROM auth.users WHERE email = 'andikabgs@gmail.com' LIMIT 1),
  true
WHERE EXISTS (SELECT 1 FROM auth.users WHERE email = 'andikabgs@gmail.com');

INSERT INTO public.materials (title, description, content, category, target_class, created_by, is_published) 
SELECT 
  'Mengelola Stres dan Kecemasan',
  'Panduan untuk membantu siswa mengatasi stres dan kecemasan dalam belajar',
  'Stres dan kecemasan adalah hal normal, namun perlu dikelola dengan baik: 1. Kenali tanda-tanda stres, 2. Praktikkan teknik relaksasi, 3. Jaga pola tidur yang sehat, 4. Olahraga teratur, 5. Berbagi dengan orang terpercaya.',
  'personal',
  ARRAY['X', 'XI', 'XII'],
  (SELECT id FROM auth.users WHERE email = 'andikabgs@gmail.com' LIMIT 1),
  true
WHERE EXISTS (SELECT 1 FROM auth.users WHERE email = 'andikabgs@gmail.com');