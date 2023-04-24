import { BASE_URL, instance } from './index';

export const getRecipients = () => {
  return instance.get(`${BASE_URL}/members`);
}

export const getRecipientById = (recipientId: any) => {
  return instance.get(`${BASE_URL}/members/${recipientId}`);
}

export const addRecipient = (data: any) => {
  return instance.post(`${BASE_URL}/members`, data);
}

export const updateRecipient = (data: any) => {
  return instance.put(`${BASE_URL}/members/${data.id}`, data);
}

export const deleteRecipientById = (id: any) => {
  return instance.delete(`${BASE_URL}/members/${id}`);
}
