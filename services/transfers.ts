import { BASE_URL, instance } from './index';
import { array } from 'yup';
import axios from 'axios';

export const getTransfers = (pageNumber?: string) => {
  return instance.get(`${BASE_URL}/transfers?page=${pageNumber}`);
}

export const addTransfer = (data: any) => {
  return instance.post(`${BASE_URL}/transfers`, {...data })
}

export const updateTransfer = (data: any) => {
  return instance.post(`${BASE_URL}/transfers/${data.id}`, {...data, _method: 'PUT'});
}

export const removeTransfers = (transfer_ids: any) => {
  return instance.delete(`${BASE_URL}/transfers`, {
    data: {
      transfer_ids
    }
  });
}


