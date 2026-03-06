import * as fs from 'node:fs';
import * as path from 'node:path';

export type StatusOption = 'yes' | 'no' | 'not_specified';

export interface RegisterUser {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
  taxId: string;
  idpStatus: StatusOption;
  disabilityStatus: StatusOption;
  region: string;
  settlementType: string;
  settlement: string;
}

const FIRST_NAMES = [
  'Олена',
  'Марія',
  'Іван',
  'Петро',
  'Андрій',
  'Наталія',
  'Ольга',
  'Михайло',
];
const LAST_NAMES = [
  'Іваненко',
  'Коваленко',
  'Петренко',
  'Шевченко',
  'Бондаренко',
  'Ткаченко',
];
const MIDDLE_NAMES = [
  'Іванович',
  'Петрович',
  'Олексійович',
  'Миколайович',
  'Василівна',
  'Андріївна',
];
const STATUSES: StatusOption[] = ['yes', 'no', 'not_specified'];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

function generatePassword(): string {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghjkmnpqrstuvwxyz';
  const digits = '23456789';
  const random = (s: string) =>
    s[Math.floor(Math.random() * s.length)] as string;
  const base = Array.from({ length: 6 }, () => random(lower)).join('');
  return `${random(upper)}${base}${random(digits)}!`;
}

export function generateRegisterUser(): RegisterUser {
  const timestamp = Date.now();
  const taxId = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 10),
  ).join('');

  return {
    firstName: pickRandom(FIRST_NAMES),
    lastName: pickRandom(LAST_NAMES),
    middleName: pickRandom(MIDDLE_NAMES),
    email: `vector_test_${timestamp}@mail.com`,
    password: generatePassword(),
    taxId,
    idpStatus: pickRandom(STATUSES),
    disabilityStatus: pickRandom(STATUSES),
    region: 'Вінницька',
    settlementType: 'Місто',
    settlement: 'Вінниця',
  };
}

export function saveRegisterUser(user: RegisterUser): void {
  const stateDir = path.resolve(process.cwd(), 'state');
  if (!fs.existsSync(stateDir)) {
    fs.mkdirSync(stateDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(stateDir, 'newRegisterUser.json'),
    JSON.stringify(user, null, 2),
  );
}
