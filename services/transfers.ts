import { BASE_URL, instance } from './index';

export const getTransfers = async (pageNumber?: string) => {
  return await instance.get(`${BASE_URL}/transfers?page=${pageNumber}`);
}


