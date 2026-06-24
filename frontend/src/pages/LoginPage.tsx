import { useState } from "react";

import { login, register } from "../services/authApi";

interface Props {
  onLogin: () => void;
}

function LoginPage({ onLogin }: Props) {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleSubmit() {
    try {
      if (isLogin) {
        const response = await login(email, password);

        localStorage.setItem("token", response.token);

        localStorage.setItem("username", response.username);
      } else {
        await register(username, email, password);

        // Auto login after registration
        const response = await login(email, password);

        localStorage.setItem("token", response.token);

        localStorage.setItem("username", response.username);
      }

      onLogin();
    } catch (error) {
      console.error(error);

      alert(isLogin ? "Invalid credentials" : "Registration failed");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>{isLogin ? "Login" : "Create Account"}</h1>

        <p className="auth-subtitle">Welcome to Spring AI Chatbot</p>

        {!isLogin && (
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-submit-btn" onClick={handleSubmit}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <div className="auth-switch">
          <span>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>

          <button
            type="button"
            className="auth-switch-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
