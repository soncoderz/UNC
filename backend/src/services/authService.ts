import { createHash, randomBytes } from "crypto";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import type { User, SafeUser, AuthResponse } from "@/types";

/**
 * Auth Service - Authentication logic using SHA-256 + base64 tokens
 */

const USERS_FILE = join(process.cwd(), "src", "data", "users.json");
const TOKEN_SECRET = process.env.AUTH_SECRET || "unc-technology-secret-key-2024";

// ========== Helpers ==========

function loadUsers(): User[] {
  if (!existsSync(USERS_FILE)) return [];
  const raw = readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(raw) as User[];
}

function saveUsers(users: User[]): void {
  writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

function toSafeUser(user: User): SafeUser {
  const { password: _, ...safeUser } = user;
  return safeUser;
}

// ========== Token Management ==========

export function generateToken(user: SafeUser): string {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHash("sha256")
    .update(payloadStr + TOKEN_SECRET)
    .digest("base64url");
  return `${payloadStr}.${signature}`;
}

export function verifyToken(token: string): { id: string; email: string; role: string } | null {
  try {
    const [payloadStr, signature] = token.split(".");
    if (!payloadStr || !signature) return null;

    const expectedSignature = createHash("sha256")
      .update(payloadStr + TOKEN_SECRET)
      .digest("base64url");

    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString());

    if (payload.exp < Date.now()) return null;

    return { id: payload.id, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

// ========== Auth Operations ==========

export async function login(email: string, password: string): Promise<AuthResponse | null> {
  const users = loadUsers();
  const hashedPassword = hashPassword(password);
  const user = users.find((u) => u.email === email && u.password === hashedPassword);

  if (!user) return null;

  const safeUser = toSafeUser(user);
  const token = generateToken(safeUser);

  return { user: safeUser, token };
}

export async function register(
  email: string,
  password: string,
  name: string
): Promise<AuthResponse | null> {
  const users = loadUsers();

  // Check if email already exists
  if (users.some((u) => u.email === email)) {
    return null;
  }

  const newUser: User = {
    id: `user-${randomBytes(8).toString("hex")}`,
    email,
    password: hashPassword(password),
    name,
    role: "user",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  const safeUser = toSafeUser(newUser);
  const token = generateToken(safeUser);

  return { user: safeUser, token };
}

export async function getUserFromToken(token: string): Promise<SafeUser | null> {
  const decoded = verifyToken(token);
  if (!decoded) return null;

  const users = loadUsers();
  const user = users.find((u) => u.id === decoded.id);
  if (!user) return null;

  return toSafeUser(user);
}
