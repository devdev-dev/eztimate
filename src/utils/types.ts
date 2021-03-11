import { User } from 'next-auth';

export type SessionUser = User & {
  objectId: string;
  teamSession: TeamSession;
};

// Either the teamId or null to clear it from the session
export type TeamSession = string | null;
