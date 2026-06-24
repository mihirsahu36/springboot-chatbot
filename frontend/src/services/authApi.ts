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
    await fetch(
      "http://localhost:8081/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    );

  if (!response.ok) {
    throw new Error(
      "Registration failed"
    );
  }

  return response.text();
}