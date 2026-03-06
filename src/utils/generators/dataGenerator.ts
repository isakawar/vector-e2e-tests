export class DataGenerator {
  static randomEmail(prefix = 'test'): string {
    return `${prefix}_${Date.now()}@example.com`;
  }

  static randomString(length = 8): string {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  }

  static randomPhone(): string {
    const digits = Array.from({ length: 9 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');
    return `+380${digits}`;
  }
}
