import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { injectable } from 'inversify';

import type { IHttpClient, HttpClientConfig } from './IHttpClient';

/**
 * Axios-based HTTP client used to make API requests throughout the application.
 * Registered as a singleton in the DI container and injected into feature API classes.
 */
@injectable()
export class HttpClient implements IHttpClient {
  private readonly client: AxiosInstance;

  /**
   * Creates an Axios instance configured with the base API URL.
   *
   * @param getAccessToken - Function that returns the current access token
   */
  constructor(private readonly getAccessToken: () => string | null) {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.registerRequestInterceptors();
  }

  /**
   * Sends a GET request to the given URL.
   *
   * @param url - Request path
   * @param config - Optional Axios config
   * @returns Response data
   */
  async get<T>(url: string, config?: HttpClientConfig): Promise<T> {
    const response = await this.client.get<T>(url, this.toAxiosRequestConfig(config));

    return response.data;
  }

  /**
   * Sends a POST request to the given URL.
   *
   * @param url - Request path
   * @param data - Request body
   * @param config - Optional Axios config
   * @returns Response data
   */
  async post<T>(url: string, data?: unknown, config?: HttpClientConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, this.toAxiosRequestConfig(config));

    return response.data;
  }

  /**
   * Sends a PUT request to the given URL.
   *
   * @param url - Request path
   * @param data - Request body
   * @param config - Optional Axios config
   * @returns Response data
   */
  async put<T>(url: string, data?: unknown, config?: HttpClientConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, this.toAxiosRequestConfig(config));

    return response.data;
  }

  /**
   * Sends a PATCH request to the given URL.
   *
   * @param url - Request path
   * @param data - Request body
   * @param config - Optional Axios config
   * @returns Response data
   */
  async patch<T>(url: string, data?: unknown, config?: HttpClientConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, this.toAxiosRequestConfig(config));

    return response.data;
  }

  /**
   * Sends a DELETE request to the given URL.
   *
   * @param url - Request path
   * @param config - Optional Axios config
   * @returns Response data
   */
  async delete<T>(url: string, config?: HttpClientConfig): Promise<T> {
    const response = await this.client.delete<T>(url, this.toAxiosRequestConfig(config));

    return response.data;
  }

  /**
   * Registers Axios request interceptors on the client instance.
   */
  private registerRequestInterceptors() {
    this.client.interceptors.request.use((config) => {
      const token = this.getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  /**
   * Maps an HttpClientConfig to an AxiosRequestConfig.
   *
   * @param config - Optional client config
   * @returns Axios-compatible request config
   */
  private toAxiosRequestConfig(config?: HttpClientConfig): AxiosRequestConfig {
    return {
      headers: config?.headers,
      params: config?.params,
      timeout: config?.timeout,
    };
  }
}
