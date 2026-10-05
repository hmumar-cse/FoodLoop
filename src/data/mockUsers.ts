import type { AppUser } from '../types';

export interface UserCredentials {
  email: string;
  password: string;
  user: AppUser;
}

export const MOCK_USERS: UserCredentials[] = [
  {
    email: 'recipient@foodloop.app',
    password: 'rescue123',
    user: {
      id: 'user-001',
      name: 'Alex Rivera',
      email: 'recipient@foodloop.app',
      role: 'recipient',
    },
  },
  {
    email: 'donor@foodloop.app',
    password: 'surplus123',
    user: {
      id: 'user-002',
      name: 'Morgan Chen',
      email: 'donor@foodloop.app',
      role: 'donor',
    },
  },
  {
    email: 'chef@rosewood.com',
    password: 'kitchen123',
    user: {
      id: 'user-003',
      name: 'Julian Martinez',
      email: 'chef@rosewood.com',
      role: 'donor',
    },
  },
  {
    email: 'sarah@community.org',
    password: 'community123',
    user: {
      id: 'user-004',
      name: 'Sarah Jenkins',
      email: 'sarah@community.org',
      role: 'recipient',
    },
  },
];
