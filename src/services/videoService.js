import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://dwzfwwnwtsjtfwiwqikd.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3emZ3d253dHNqdGZ3aXdxaWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU5MDk0MjMsImV4cCI6MTk5MTQ4NTQyM30.qDpyISZyCYW6oc4oursqkouuinZSdKRINa5QlU_F2jk";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video")
            .select("*")
    }
  }
}