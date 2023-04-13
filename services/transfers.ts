import { BASE_URL, instance } from './index';

export const getTransfers = (pageNumber?: string) => {
  return instance.get(`${BASE_URL}/transfers?page=${pageNumber}`);
}


