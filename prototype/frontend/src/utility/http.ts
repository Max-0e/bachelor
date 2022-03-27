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

export type HttpResponse<TBody = any, TError = any> = {
	isError: boolean;
	body: TBody | null;
	error: TError | null;
	status: number | null;
};

export async function get<T>(url: string, options: HttpOptions = {}): Promise<HttpResponse<T>> {
	return await makeHttpResponseFromAxiosPromise(
		axios.get(url, {
			params: options?.params,
			headers: options?.headers,
			withCredentials: options?.withCredentials,
		})
	);
}

export async function head<T>(url: string, options: HttpOptions = {}): Promise<HttpResponse<T>> {
	return await makeHttpResponseFromAxiosPromise(
		axios.head(url, {
			params: options?.params,
			headers: options?.headers,
			withCredentials: options?.withCredentials,
		})
	);
}

export async function post<T>(url: string, jsonBody: any, options: HttpOptions = {}): Promise<HttpResponse<T>> {
	return await makeHttpResponseFromAxiosPromise(
		axios.post(url, jsonBody, {
			params: options?.params,
			headers: options?.headers,
			withCredentials: options?.withCredentials,
		})
	);
}

export async function put<T>(url: string, jsonBody: any, options: HttpOptions = {}): Promise<HttpResponse<T>> {
	return await makeHttpResponseFromAxiosPromise(
		axios.put(url, jsonBody, {
			params: options?.params,
			headers: options?.headers,
			withCredentials: options?.withCredentials,
		})
	);
}

export async function patch<T>(url: string, jsonBody: any, options: HttpOptions = {}): Promise<HttpResponse<T>> {
	return await makeHttpResponseFromAxiosPromise(
		axios.patch(url, jsonBody, {
			params: options?.params,
			headers: options?.headers,
			withCredentials: options?.withCredentials,
		})
	);
}

/**
 * Deliberately misspelled because `delete` is a reserved keyword.
 */
export async function deletE<T>(url: string, options: HttpOptions = {}): Promise<HttpResponse<T>> {
	return await makeHttpResponseFromAxiosPromise(
		axios.delete(url, {
			params: options?.params,
			headers: options?.headers,
			withCredentials: options?.withCredentials,
		})
	);
}

async function makeHttpResponseFromAxiosPromise<T>(axiosPromise: Promise<AxiosResponse<T>>): Promise<HttpResponse<T>> {
	try {
		const response = await axiosPromise;
		if (DEV_MODE) {
			Logger.debug('Http response', response?.data);
		}
		return {
			isError: false,
			body: response.data,
			status: response.status,
			error: null,
		};
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

export class HttpError extends Error {
	public readonly status: number;

	constructor(message: string = 'Unknown Error', status: number = 500) {
		super(message);
		this.status = status;
	}
}
