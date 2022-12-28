import axios, { AxiosResponse } from 'axios';
import { DEV_MODE } from '../config';
import Logger from './log';

export type HttpParams = { [key: string]: string };

export type HttpHeaders = { [key: string]: string };

export type HttpOptions = {
	headers?: HttpHeaders;
	params?: HttpParams;
	withCredentials?: boolean;
};

class HttpClient {
	public async get<T>(url: string, options: HttpOptions = {}) {
		return await this.makeHttpResponseFromAxiosPromise<T>(
			axios.get(url, {
				params: options?.params,
				headers: options?.headers,
				withCredentials: options?.withCredentials,
			})
		);
	}

	public async post<T>(url: string, jsonBody: any, options: HttpOptions = {}) {
		return await this.makeHttpResponseFromAxiosPromise<T>(
			axios.post(url, jsonBody, {
				params: options?.params,
				headers: options?.headers,
				withCredentials: options?.withCredentials,
			})
		);
	}

	public async put<T>(url: string, jsonBody: any, options: HttpOptions = {}) {
		return await this.makeHttpResponseFromAxiosPromise<T>(
			axios.put(url, jsonBody, {
				params: options?.params,
				headers: options?.headers,
				withCredentials: options?.withCredentials,
			})
		);
	}

	public async delete<T>(url: string, options: HttpOptions = {}) {
		return await this.makeHttpResponseFromAxiosPromise<T>(
			axios.delete(url, {
				params: options?.params,
				headers: options?.headers,
				withCredentials: options?.withCredentials,
			})
		);
	}

	private async makeHttpResponseFromAxiosPromise<T>(axiosPromise: Promise<AxiosResponse<T>>): Promise<T> {
		try {
			const response = await axiosPromise;
			if (DEV_MODE) {
				Logger.debug('Http response', response?.data);
			}
			return response.data;
		} catch (error: any) {
			if (error?.response) {
				if (DEV_MODE) {
					Logger.debug('Http error', error.response?.data);
				}
				throw new HttpError(error.response.data, error.response.status);
			} else {
				throw new HttpError();
			}
		}
	}
}

export class HttpError extends Error {
	public readonly status: number;

	constructor(message: string = 'Unknown Error', status: number = 500) {
		super(message);
		this.status = status;
	}
}

export default new HttpClient();
