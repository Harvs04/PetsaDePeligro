import api from '../lib/api';

// export const registerUser = async (username: string, email: string, password: string) => {
//   const res = await api.post('/users/register/', { username, email, password });
//   return res.data;
// };

// export const loginUser = async (email: string, password: string) => {
//   const res = await api.post('/users/login/', { email, password });
//   return res.data;
// };

export default async function getAccounts() {
  const res = await api.get('/accounts/');
  return res.data;
};