/**
 * Frappe LMS API Client
 * Connects Next.js frontend to Frappe LMS backend
 * Now with robust error handling, retry logic, and circuit breaker
 */

import { RobustHTTPClient } from './client'

const FRAPPE_BASE_URL = process.env.LMS_API_URL || 'http://lms.localhost:8000';
const FRAPPE_API_KEY = process.env.LMS_API_KEY;
const FRAPPE_API_SECRET = process.env.LMS_API_SECRET;

export class FrappeClient {
  private baseUrl: string;
  private apiKey?: string;
  private apiSecret?: string;
  private httpClient: RobustHTTPClient;

  constructor(apiKey?: string, apiSecret?: string, httpClient?: RobustHTTPClient) {
    this.baseUrl = FRAPPE_BASE_URL;
    this.apiKey = apiKey || FRAPPE_API_KEY;
    this.apiSecret = apiSecret || FRAPPE_API_SECRET;
    this.httpClient = httpClient || new RobustHTTPClient();
  }

  private async request(
    method: string,
    endpoint: string,
    data?: any,
    userToken?: string
  ) {
    const url = `${this.baseUrl}/api${endpoint}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Use user token if provided, otherwise use API key
    if (userToken) {
      headers['Authorization'] = `Bearer ${userToken}`;
    } else if (this.apiKey && this.apiSecret) {
      headers['Authorization'] = `token ${this.apiKey}:${this.apiSecret}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(data);
    }

    // Use robust HTTP client with retry, backoff, and circuit breaker
    return this.httpClient.request(url, options);
  }

  async get(endpoint: string, userToken?: string) {
    return this.request('GET', endpoint, undefined, userToken);
  }

  async post(endpoint: string, data: any, userToken?: string) {
    return this.request('POST', endpoint, data, userToken);
  }

  async put(endpoint: string, data: any, userToken?: string) {
    return this.request('PUT', endpoint, data, userToken);
  }

  async patch(endpoint: string, data: any, userToken?: string) {
    return this.request('PATCH', endpoint, data, userToken);
  }

  async delete(endpoint: string, userToken?: string) {
    return this.request('DELETE', endpoint, undefined, userToken);
  }

  // Resource shortcuts
  async getDoc(doctype: string, name: string, userToken?: string) {
    return this.get(`/resource/${doctype}/${name}`, userToken);
  }

  async getDocList(
    doctype: string,
    fields?: string[],
    filters?: any,
    userToken?: string
  ) {
    const params = new URLSearchParams();
    if (fields) params.append('fields', JSON.stringify(fields));
    if (filters) params.append('filters', JSON.stringify(filters));

    return this.get(
      `/resource/${doctype}?${params.toString()}`,
      userToken
    );
  }

  async createDoc(doctype: string, data: any, userToken?: string) {
    return this.post(`/resource/${doctype}`, data, userToken);
  }

  async updateDoc(doctype: string, name: string, data: any, userToken?: string) {
    return this.put(`/resource/${doctype}/${name}`, data, userToken);
  }

  async deleteDoc(doctype: string, name: string, userToken?: string) {
    return this.delete(`/resource/${doctype}/${name}`, userToken);
  }

  // Method calls
  async call(method: string, args?: any, userToken?: string) {
    return this.post(`/method/${method}`, args, userToken);
  }
}

// Default client instance
export const frappeClient = new FrappeClient();

// Helper to create user-specific client
export function createUserFrappeClient(userToken: string) {
  return new FrappeClient(undefined, undefined);
}
