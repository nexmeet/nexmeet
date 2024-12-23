import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../supabase/supabase";

interface AuthState {
  user: User | null;
  session: Session | null;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),

  signUp: async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:5173/profile",
      },
    });
    if (error) throw error;
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    set({ session: data.session, user: data.session.user });
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null, session: null });
  },

  fetchSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    if (data.session) {
      set({ session: data.session, user: data.session.user });
    }
  },
}));
