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
  try {
    const res = await api.get('/accounts');

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: 'Error',
        error: error.message,
      };
    }

    return {
      message: 'Unknown error',
    };
  }
};