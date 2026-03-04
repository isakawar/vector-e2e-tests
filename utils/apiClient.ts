import type { APIRequestContext } from '@playwright/test';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  // Add API methods here as the project grows
  // Example:
  // async getUser(id: string) {
  //   const response = await this.request.get(`/api/users/${id}`);
  //   return response.json();
  // }
}
