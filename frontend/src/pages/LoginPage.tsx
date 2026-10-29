import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { login } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(username, password);
      await checkAuth();
      navigate("/movies", { replace: true });
    } catch {
      setError(
        "Login failed. Check your username and password, then try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      maw={420}
      mx="auto"
      mt="xl"
      p="xl"
      radius="lg"
      withBorder
    >
      <Stack gap="md">
        <Title order={2}>Log in</Title>

        <TextInput
          label="Username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          required
        />

        <PasswordInput
          label="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />

        {error && <Alert color="red">{error}</Alert>}

        <Button type="submit" loading={loading} fullWidth>
          Log in
        </Button>
      </Stack>
    </Paper>
  );
};

export default LoginPage;
