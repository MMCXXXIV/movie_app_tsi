import { useState, type SubmitEvent } from "react";
import { login } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { checkAuth } = useAuth();

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(username, password);
      await checkAuth();
    } catch {
      setError("Something went wrong with login...");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <label>Password:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button disabled={loading}>submit</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginPage;
