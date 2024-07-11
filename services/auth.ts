import { RegisterRequestDTO } from "@/types/dtos/register"

export const registerUser = ({ email, password }: RegisterRequestDTO) => {
  return new Promise((resolve, reject) => {
    fetch('/api/register', {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Accept": "application/json",
        "Content": "application/json",
      }
    }).then(res => {
      res.json().then(json => resolve(json)).catch(e => reject(e))
    }).catch(e => reject(e))
  })
}
