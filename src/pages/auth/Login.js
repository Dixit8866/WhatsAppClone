import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthSocial from "../../sections/auth/AuthSocial";
import LoginForm from "../../sections/auth/LoginForm";

function Login() {
  return (
    <>
      <Stack spacing={1} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Login To Talk</Typography>
        <Stack direction={"row"} spacing={0.4}>
          <Typography variant="body2">New User?</Typography>
          <Link to="/auth/register" component={RouterLink} variant="subtitle2">
            Create an Account
          </Link>
        </Stack>

        {/* Our Login Form */}
        <LoginForm />

        {/* Auth Social */}
        <AuthSocial />
      </Stack>
    </>
  );
}

export default Login;
