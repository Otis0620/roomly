import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { injectable } from 'inversify';

import type { HttpClientConfig, IHttpClient } from './IHttpClient';

@injectable()
export class HttpClient implements IHttpClient {
  private readonly client: AxiosInstance;

  /**
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

  /** @inheritdoc */
  async get<T>(url: string, config?: HttpClientConfig): Promise<T> {
    const response = await this.client.get<T>(url, this.toAxiosRequestConfig(config));

    return response.data;
  }

  /** @inheritdoc */
  async post<T>(url: string, data?: unknown, config?: HttpClientConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, this.toAxiosRequestConfig(config));

    return response.data;
  }

  /** @inheritdoc */
  async put<T>(url: string, data?: unknown, config?: HttpClientConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, this.toAxiosRequestConfig(config));

    return response.data;
  }

  /** @inheritdoc */
  async patch<T>(url: string, data?: unknown, config?: HttpClientConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, this.toAxiosRequestConfig(config));

    return response.data;
  }

  /** @inheritdoc */
  async delete<T>(url: string, config?: HttpClientConfig): Promise<T> {
    const response = await this.client.delete<T>(url, this.toAxiosRequestConfig(config));

    return response.data;
  }

  /**
   * Registers Axios request interceptors on the client instance.
   */
  private registerRequestInterceptors(): void {
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
