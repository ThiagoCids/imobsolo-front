/**
 * Declaração de tipos para useAuth hook
 * 
 * Este arquivo d.ts fornece tipos para o hook useAuth.js
 * que ainda é um arquivo JavaScript puro.
 */

import type { User } from '../types';

export interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
}

export function useAuth(): UseAuthReturn;
