import React from "react";
import Layout from "../components/common/Layout";
import { useAuth } from "../context/AuthContext";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { LoginFormData } from "../types/login";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "../validation/login-schema";
import Typography from "@material-ui/core/Typography";

const StyledLogin = styled(Layout)`
  .login-form-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-form-card {
    width: 100%;
    max-width: 400px;
  }
`;

const Login = () => {
  const { user, login } = useAuth();

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: joiResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <StyledLogin>
      <div className="login-form-container">
        <Card className="login-form-card">
          <CardContent component="form" onSubmit={onSubmit}>
            <Typography variant="h4" className="font-bold text-center mb-5">
              Login
            </Typography>
            <FormGroup className="mb-5">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="password"
                    variant="outlined"
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </FormGroup>
            <FormGroup className="mb-5">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="password"
                    variant="outlined"
                    label="Password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{ type: "password" }}
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" variant="contained" type="submit">
                Login
              </Button>
            </FormGroup>
          </CardContent>
        </Card>
      </div>
    </StyledLogin>
  );
};

export default Login;
