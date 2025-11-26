/*
  # Create user_avatars table for avatar preferences

  1. New Tables
    - `user_avatars`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `avatar_type` (text: 'male' or 'female')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_avatars` table
    - Users can only read and update their own avatar preference
    - Authenticated users can insert their own avatar preference
*/

CREATE TABLE IF NOT EXISTS user_avatars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  avatar_type text NOT NULL CHECK (avatar_type IN ('male', 'female')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_avatars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own avatar"
  ON user_avatars
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own avatar"
  ON user_avatars
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own avatar"
  ON user_avatars
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own avatar"
  ON user_avatars
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_user_avatars_user_id ON user_avatars(user_id);
