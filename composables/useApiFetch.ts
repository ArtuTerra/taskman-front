import { useRuntimeConfig, type UseFetchOptions } from "nuxt/app";

export function useApiFetch<T>(
	path: string,
	options: UseFetchOptions<T> = {},
	useBaseApiURL = true,
) {
	const headers: any = {
		"Accept": "application/json",
		"Content-Type": "application/json",
	};

	const config = useRuntimeConfig();
	const baseApiURL = useBaseApiURL ? config.public.apiBaseUrl : "";

	return useFetch(baseApiURL + path, {
		...options,
		headers: {
			...headers,
			...options?.headers,
		},
	});
}
