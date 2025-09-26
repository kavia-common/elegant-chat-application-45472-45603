export type Credentials = { email: string; password: string };
export type User = { id: string; name: string; email: string; avatarUrl?: string; status?: string };
export type Message = { id: string; fromId: string; toId: string; content: string; createdAt: string };
export type ConversationSummary = { id: string; name: string; lastMessage?: string; avatarUrl?: string; unread?: number };

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api";

// Helper to handle JSON fetch with error handling
async function jsonFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    credentials: "include",
    ...options,
  });
  if (!res.ok) {
    let err: any = { status: res.status, message: res.statusText };
    try {
      const data = await res.json();
      err = { ...err, ...data };
    } catch {
      // ignore
    }
    throw err;
  }
  return res.json() as Promise<T>;
}

// PUBLIC_INTERFACE
export async function login(credentials: Credentials): Promise<{ user: User; token?: string }> {
  /** Authenticate user with email/password and return basic profile and optional token. */
  return jsonFetch(`/auth/login`, { method: "POST", body: JSON.stringify(credentials) });
}

// PUBLIC_INTERFACE
export async function logout(): Promise<{ success: boolean }> {
  /** Logout the current user session. */
  return jsonFetch(`/auth/logout`, { method: "POST" });
}

// PUBLIC_INTERFACE
export async function getProfile(): Promise<User> {
  /** Get current user's profile. */
  return jsonFetch(`/users/me`, { method: "GET" });
}

// PUBLIC_INTERFACE
export async function updateProfile(update: Partial<User>): Promise<User> {
  /** Update current user's profile fields. */
  return jsonFetch(`/users/me`, { method: "PATCH", body: JSON.stringify(update) });
}

// PUBLIC_INTERFACE
export async function getContacts(): Promise<User[]> {
  /** Fetch list of contacts for sidebar. */
  return jsonFetch(`/contacts`, { method: "GET" });
}

// PUBLIC_INTERFACE
export async function getConversations(): Promise<ConversationSummary[]> {
  /** Fetch conversation summaries for the sidebar. */
  return jsonFetch(`/conversations`, { method: "GET" });
}

// PUBLIC_INTERFACE
export async function getMessages(conversationId: string): Promise<Message[]> {
  /** Fetch messages for a conversation. */
  return jsonFetch(`/conversations/${encodeURIComponent(conversationId)}/messages`, { method: "GET" });
}

// PUBLIC_INTERFACE
export async function sendMessage(conversationId: string, content: string): Promise<Message> {
  /** Send a message to a conversation. */
  return jsonFetch(`/conversations/${encodeURIComponent(conversationId)}/messages`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}
