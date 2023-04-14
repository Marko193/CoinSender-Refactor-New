import { BASE_URL, instance } from './index';

export const getTransfers = (pageNumber?: string) => {
  return instance.get(`${BASE_URL}/transfers?page=${pageNumber}`);
}

export const addTransfer = (data: any) => {
  return instance.post(`${BASE_URL}/transfers`, {...data })
}

export const updateTransfer = (data: any) => {
  return instance.post(`${BASE_URL}/transfers/${data.id}`, {...data, company_id: 1, _method: 'PUT'});
}


