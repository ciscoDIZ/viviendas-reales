export interface Session {
  id: string;
  email: string;
  role: string;
  iat: bigint;
  exp: bigint;
}
