import type { AppUser } from '../types';

export interface UserCredentials {
  email: string;
  password: string;
  user: AppUser;
}

export const MOCK_USERS: UserCredentials[] = [
  {
    email: 'anbu.trust@foodloop.tn',
    password: 'rescue123',
    user: {
      id: 'user-001',
      name: 'K. Muthukumar',
      organizationName: 'Anbu Karangal Children Orphanage & Trust, Chennai',
      email: 'anbu.trust@foodloop.tn',
      role: 'recipient',
      phone: '+91 94441 23456',
    },
  },
  {
    email: 'mandapam@srikrishna.com',
    password: 'surplus123',
    user: {
      id: 'user-002',
      name: 'S. Ramanathan',
      organizationName: 'Sri Krishna Gana Sabha Kalyana Mandapam, T. Nagar',
      email: 'mandapam@srikrishna.com',
      role: 'donor',
      phone: '+91 94440 12890',
    },
  },
  {
    email: 'annadhanam@maduraitrust.org',
    password: 'temple123',
    user: {
      id: 'user-003',
      name: 'Sundaram Gurukkal',
      organizationName: 'Kapaleeshwarar Temple Annadhanam Trust, Mylapore',
      email: 'annadhanam@maduraitrust.org',
      role: 'donor',
      phone: '+91 98840 76543',
    },
  },
  {
    email: 'akshaya.orphanage@gmail.com',
    password: 'care123',
    user: {
      id: 'user-004',
      name: 'Revathi Murugan',
      organizationName: 'Akshaya Home & Orphan Children Care, Madurai',
      email: 'akshaya.orphanage@gmail.com',
      role: 'recipient',
      phone: '+91 98420 87654',
    },
  },
];
