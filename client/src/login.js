import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";

import { makeStyles } from "@material-ui/core/styles";

import { useForm } from "react-hook-form";
import * as yup from "yup";

import axios from "axios";
import { useHistory } from "react-router-dom";

import { setAccessToken } from "./utils/index";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SigninSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const { register, handleSubmit } = useForm({
    validationSchema: SigninSchema,
  });

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API}/login`, {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        alert("successful");
        //set on the local storage

        console.log(response);
        setAccessToken(response.data.token);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            inputRef={register}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <div>
            <div item xs></div>
            <div item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
