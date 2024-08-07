import { useAuthStore } from "~/stores/useAuthStore";

type Methods = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions extends RequestInit {
	body?: string;
	headers?: { [key: string]: string };
}

export const fetchWrapper = {
	get: (url: string, token?: string) => request("GET", url, token),
	post: (url: string, body?: any, token?: string) => request("POST", url, token, body),
	put: (url: string, body?: any, token?: string) => request("PUT", url, token, body),
	delete: (url: string, body?: any, token?: string) => request("DELETE", url, token, body),
};

async function request(method: Methods, url: string, token?: string, body?: any) {
	const headers = authHeader(token);
	const requestOptions: RequestOptions = {
		method,
		headers,
	};

	if (body) {
		requestOptions.headers = {
			...headers,
			"Content-Type": "application/json",
		};
		requestOptions.body = JSON.stringify(body);
	}

	const response = await fetch(url, requestOptions);
	return handleResponse(response);
}

function authHeader(token?: string): { [key: string]: string } {
	return {
		"Accept": "application/json",
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};
}

async function handleResponse(response: Response): Promise<any> {
	if (response.status === 204) {
		return;
	}

	const data = await response.json();

	if (!response.ok) {
		const error = (data && data.message) || response.status;
		if (response.status === 401 && !response.url.endsWith("/logout")) {
			useAuthStore().logout(true);
		}
		return Promise.reject(error);
	}

	return data;
}
