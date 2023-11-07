import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoken } from "../redux/tokenSlice";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

// const delay = () => {
//   return new Promise((resolve) => setTimeout(() => resolve("delay"), 4000));
// };
export function Login(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const validate = (values) => {
    let errors = {};

    if (!values.username) {
      errors.username = "لطفا فیلد نام کاربری را پر کنید.";
    } else if (values.username.length < 5) {
      errors.username =
        "نام کاربری کوتاه است -باید حداقل 5 کاراکتر داشته باشد.";
    }

    if (!values.password) {
      errors.password = "لطفا فیلد کلمه عبور را پر کنید.";
    } else if (values.password.length < 6) {
      errors.password = "کلمه عبور کوتاه است -باید حداقل ۶ کاراکتر داشته باشد.";
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*[a-zA-Z]).{6,}$/.test(
        values.password
      )
    ) {
      errors.password = "کلمه عبور خود را درست وارد کنید.";
    }
    return errors;
  };

  const submitForm = (values) => {
    // (async () => {
    //   try {
    //     const response = axios
    //       .post("http://rezayari.ir:5050/Auth/Login", values)
    //       .then((res) => {
    //         console.log(res.data)
    //         return res.data});

    //         await delay();
    //         console.log(response);
    //         const token = await response.token;
    //     localStorage.setItem("token", token);
    //     dispatch(addtoken(token));
    //     navigate("/home");

    //   } catch (error) {
    //     alert("لطفا مجدد تلاش کنید نام کاربدی و یا رمز عبور وارد شده اشتباه است.");
    //     console.log(error)
    //   }
    // })();
    // const response = axios
    axios.post("http://rezayari.ir:5050/Auth/Login", values).then((res) => {
      //   console.log(res.data)
      //   return res.data
      localStorage.setItem("token", res.data.token);
      dispatch(addtoken(res.data.token));
      navigate("/home");
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: " linear-gradient(to right, #007991, #a6d4fa)",
        p: { xs: 2, sm: 4, md: 5 },
        minHeight: "100vh",
      }}
    >
      <Container
        dir="rtl"
        component="main"
        sx={{
          width: { xs: "95%", sm: "60%", md: "50%" },
          background: "white",
          borderRadius: "20px",
          p: 3,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#2196f3" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ورود به صفحه ی کاربری
          </Typography>
          <Formik
            width="100%"
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitForm}
          >
            {(formik) => {
              const {
                // values,
                handleChange,
                handleSubmit,
                // resetForm,
                errors,
                touched,
                handleBlur,
                // isValid,
                // dirty,
              } = formik;

              return (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ mt: 4 }}
                  width="100%"
                >
                  <label>نام کاربری</label>

                  <TextField
                    error={touched.username && errors.username}
                    dir="ltr"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />

                  <Box sx={{ height: "10px", mb: 1 }}>
                    {touched.username && errors.username && (
                      <Box sx={{ fontSize: "small", color: "red" }}>
                        {errors.username}
                      </Box>
                    )}
                  </Box>
                  <label>رمز عبور</label>
                  <TextField
                    error={touched.password && errors.password}
                    dir="ltr"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    // type="password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box sx={{ height: "10px" }}>
                    {touched.password && errors.password && (
                      <Box sx={{ fontSize: "small", color: "red" }}>
                        {errors.password}
                      </Box>
                    )}
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "#2196f3" }}
                  >
                    ورود
                  </Button>
                  <br />
                  <br />
                  <Link to="/">
                    <Alert severity="info">بازگشت </Alert>
                  </Link>
                </Box>
              );
            }}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
}
export default Login;
