import {
  Form,
  useLocation,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { ActionFunctionArgs } from "react-router-dom";
// import { authProvider } from "../auth";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

interface ActionData {
  error?: string;
}

export function loader() {
  /*
  if (authProvider.isAuthenticated) {
    return redirect("/");
  }
    */
  // will be handled inside the component
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  /*
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  try {
    await authProvider.login(username, password);
  } catch (error) {
    return { error: (error as Error).message };
  }

  const redirectTo = formData.get("redirectTo") as string;
  return redirect(redirectTo || "/");
  */
  // will be handled inside the component
  return null;
}

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const actionData = useActionData() as ActionData;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      await login(username, password);
      navigate(from);
    } catch (error) {
      setError((error as Error).message);
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} replace>
      <input type="hidden" name="redirecTo" value={from} />
      <label>
        Username: <input name="username" />
      </label>
      <br />
      <label>
        Password: <input name="password" type="password" />
      </label>
      <br />
      <button type="submit">Login</button>
      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
    </Form>
  );
};

export default Login;
