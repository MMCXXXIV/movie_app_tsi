import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Anchor,
  Button,
  Container,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { register } from "../services/authService";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register({
        username: username.trim(),
        email: email.trim(),
        password,
        password2,
      });

      navigate("/login", {
        replace: true,
        state: { message: "Account created. You can now log in." },
      });
    } catch (err: unknown) {
      const responseData = (
        err as {
          response?: {
            data?: Record<string, string[] | string>;
          };
        }
      ).response?.data;

      if (responseData) {
        const messages = Object.entries(responseData)
          .map(([field, value]) => {
            const message = Array.isArray(value) ? value.join(" ") : value;
            return `${field}: ${message}`;
          })
          .join(" ");

        setError(messages || "Registration failed.");
      } else {
        setError("Unable to connect to the server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} py={60}>
      <Title ta="center" order={1}>
        Create your account
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt="sm" mb="xl">
        Join ReelTime to manage your movies.
      </Text>

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          {error && (
            <Alert color="red" title="Registration failed">
              {error}
            </Alert>
          )}

          <TextInput
            label="Username"
            placeholder="Choose a username"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
            required
            autoComplete="username"
            minLength={3}
          />

          <TextInput
            label="Email"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            required
            autoComplete="email"
          />

          <PasswordInput
            label="Password"
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            required
            autoComplete="new-password"
            minLength={8}
          />

          <PasswordInput
            label="Confirm password"
            placeholder="Enter your password again"
            value={password2}
            onChange={(event) => setPassword2(event.currentTarget.value)}
            required
            autoComplete="new-password"
          />

          <Button type="submit" fullWidth loading={loading} mt="sm">
            Create account
          </Button>

          <Text size="sm" ta="center">
            Already have an account?{" "}
            <Anchor component={Link} to="/login">
              Log in
            </Anchor>
          </Text>
        </Stack>
      </form>
    </Container>
  );
};

export default RegisterPage;
