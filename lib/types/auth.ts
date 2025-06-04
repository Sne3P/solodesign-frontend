export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  role: "admin" | "client";
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  profile: UserProfile | null;
}
