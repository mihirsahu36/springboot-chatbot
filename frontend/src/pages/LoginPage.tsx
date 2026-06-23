import { useState } from "react";
import { login } from "../services/authApi";

interface Props {
  onLogin: () => void;
}

function LoginPage({
  onLogin
}: Props) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleLogin() {

    try {

      const response =
        await login(
          email,
          password
        );

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "username",
        response.username
      );

      onLogin();

    } catch {

      alert(
        "Invalid credentials"
      );
    }
  }

  return (

    <div className="auth-page">

      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={e =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e =>
          setPassword(
            e.target.value
          )
        }
      />

      <button
        onClick={handleLogin}
      >
        Login
      </button>

    </div>
  );
}

export default LoginPage;