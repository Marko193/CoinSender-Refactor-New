import { BASE_URL, instance } from './index';

export const getRecipients = () => {
  return instance.get(`${BASE_URL}/members`);
}

export const getRecipientById = (recipientId: any) => {
  return instance.get(`${BASE_URL}/members/${recipientId}`);
}
