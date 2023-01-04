import { CreateParams,
	DataProvider,
	DeleteManyParams,
	DeleteParams,
	fetchUtils,
	GetListParams,
	GetManyParams, GetManyReferenceParams,
	UpdateManyParams,
	UpdateParams
} from "react-admin";
import { stringify } from "query-string";

const apiUrl = 'https://jsonplaceholder.typicode.com';
const httpClient = fetchUtils.fetchJson;

export const dataProvider= {
	getList: (resource: string, params: GetListParams) => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort;
		const rangeStart = (page - 1) * perPage;
		const rangeEnd = page * perPage - 1;
		const query = {
			_end: rangeEnd,
			_order: order,
			_sort: field,
			_start: rangeStart
			// sort: JSON.stringify({field, order}),
			// range: JSON.stringify([rangeStart, rangeEnd]),
			// filter: JSON.stringify(params.filter),
		};

		const url = `${apiUrl}/${resource}?${stringify(query)}`;

		return httpClient(url).then(({ json }) => {
			const totalResults = json.length;
			const contentRange = `${resource} ${rangeStart}-${rangeEnd}/${totalResults}`;
				return {
					data: json.filter((_: any, index: number) => index >= rangeStart && index <= rangeEnd),
					total: parseInt(contentRange.split('/').pop()!, 10),
				};
		});
},

	getOne: (resource: string, params:{id: number}) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
			data: json,
		})),

	getMany: (resource: string, params: GetManyParams) => {
		const query = {
			filter: JSON.stringify({ id: params.ids }),
		};
		const url = `${apiUrl}/${resource}?${stringify(query)}`;
		return httpClient(url).then(({ json }) => ({ data: json }));
	},

	getManyReference: (resource: string, params: GetManyReferenceParams) => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort;
		const rangeStart = (page - 1) * perPage;
		const rangeEnd = page * perPage - 1;
		const query = {
			_end: rangeEnd,
			_order: order,
			_sort: field,
			_start: rangeStart,
			// sort: JSON.stringify([field, order]),
			// range: JSON.stringify([rangeStart, rangeEnd]),
			filter: JSON.stringify({
					...params.filter,
					[params.target]: params.id,
			}),
		};
		const url = `${apiUrl}/${resource}?${stringify(query)}`;

		return httpClient(url).then(({ json }) => {
			const totalResults = json.length;
			const contentRange = `${resource} ${rangeStart}-${rangeEnd}/${totalResults}`;
				return {
					data: json.filter((_: any, index: number) => index >= rangeStart && index <= rangeEnd),
					total: parseInt(contentRange.split('/').pop()!, 10),
				};
		});
	},

	update: (resource: string, params: UpdateParams) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json })),

	updateMany: (resource: string, params: UpdateManyParams) => {
		const query = {
			filter: JSON.stringify({ id: params.ids}),
		};
		return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json }));
	},

	create: (resource: string, params: CreateParams) =>
		httpClient(`${apiUrl}/${resource}`, {
			method: 'POST',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({
			data: { ...params.data, id: json.id },
	})),

	delete: (resource: string, params: DeleteParams) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'DELETE',
		}).then(({ json }) => ({ data: json })),

	deleteMany: (resource: string, params: DeleteManyParams) => {
		const query = {
			filter: JSON.stringify({ id: params.ids}),
		};
		return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
			method: 'DELETE',
		}).then(({ json }) => ({ data: json }));
	}
} as DataProvider;