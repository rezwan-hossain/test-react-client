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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignupSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    validationSchema: SignupSchema,
  });

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API}/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        alert("succenfull");

        //id name email

        //redux save

        // save on local sotrage
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            token: response.data.token,
          })
        );

        console.log(response.data);
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <div component="h1" variant="h5">
          Sign up
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div spacing={2}>
            <div>
              <TextField
                type="text"
                name="name"
                autoComplete="name"
                variant="outlined"
                fullWidth
                required
                id="name"
                label="Name"
                autoFocus
                inputRef={register}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
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
            </div>
            <div>
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
            </div>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <div className="flex-end">
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
