import { RegisterRequestDTO } from '@/types/dtos/register';

export const registerUser = ({ mobile }: RegisterRequestDTO) => {
  return new Promise((resolve, reject) => {
    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ mobile }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res
          .json()
          .then((json) => resolve(json))
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
};
