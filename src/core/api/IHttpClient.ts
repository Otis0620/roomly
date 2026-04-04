/**
 * Optional configuration for an HTTP request.
 */
export interface HttpClientConfig {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  timeout?: number;
}

/**
 * Contract for the HTTP client used to make API requests.
 * Implemented by HttpClient and used as the injection token throughout the application.
 */
export interface IHttpClient {
  get<T>(url: string, config?: HttpClientConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: HttpClientConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: HttpClientConfig): Promise<T>;
  patch<T>(url: string, data?: unknown, config?: HttpClientConfig): Promise<T>;
  delete<T>(url: string, config?: object): Promise<T>;
}
