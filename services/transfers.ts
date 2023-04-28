import { BASE_URL, instance } from './index';
export const getTransfers = (pageNumber?: string) => {
  return instance.get(`${BASE_URL}/transfers?page=${pageNumber}`);
}

export const addTransfer = (data: any) => {
  return instance.post(`${BASE_URL}/transfers`, {...data })
}

export const addMultipleTransfer = (data: any) => {
  return instance.post(`${BASE_URL}/transfers/store-multiple`, {transfers: data })
}

export const updateTransfer = (data: any) => {
  return instance.post(`${BASE_URL}/transfers/${data.id}`, {...data, _method: 'PUT'});
}

export const updateMultipleTransfers = (data: any) => {
  return instance.post(`${BASE_URL}/transfers/update-multiple`, data);
}

export const removeTransfers = (transfer_ids: any) => {
  return instance.delete(`${BASE_URL}/transfers`, {
    data: {
      transfer_ids
    }
  });
}


