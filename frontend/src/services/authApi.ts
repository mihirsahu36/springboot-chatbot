import axios from "axios";

const API =
  "http://localhost:8081/api/auth";

export async function login(
  email: string,
  password: string
) {

  const response =
    await axios.post(
      `${API}/login`,
      {
        email,
        password
      }
    );

  return response.data;
}

export async function register(
  username: string,
  email: string,
  password: string
) {

  const response =
    await axios.post(
      `${API}/register`,
      {
        username,
        email,
        password
      }
    );

  return response.data;
}