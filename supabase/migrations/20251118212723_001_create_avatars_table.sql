/*
  # Create avatars table for user avatar storage

  1. New Tables
    - `avatars`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `avatar_url` (text, URL to GLB model)
      - `name` (text, optional display name)
      - `is_active` (boolean, indicates current active avatar)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `avatars` table
    - Users can only view and manage their own avatars
*/

CREATE TABLE IF NOT EXISTS avatars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  avatar_url text NOT NULL,
  name text DEFAULT 'My Avatar',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, id)
);

ALTER TABLE avatars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own avatars"
  ON avatars
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own avatars"
  ON avatars
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own avatars"
  ON avatars
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own avatars"
  ON avatars
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_avatars_user_id ON avatars(user_id);
CREATE INDEX idx_avatars_is_active ON avatars(is_active);
