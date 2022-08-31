import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Button, FormControl, IconButton, Stack } from '@mui/material';
import { Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';

import './Auth.css';
import eye from '../../assets/eye.svg';
import eyeslash from '../../assets/eye-slash.svg';
import priceGetter from '../../assets/PriceGetterIcon.png';

import { InputText } from './InputText';
import { Loader } from '../../components';
import fire from '../../utils/swal';
import { authActions, useAppSelector } from '../../redux';

const { Formik } = require('formik');

const SignUp = () => {
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter your Email'),
    password: Yup.string().required('Please enter your Password'),
    confirmpassword: Yup.string().when('password', {
      is: (val: string) => val?.length > 0,
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Your passwords donot match.'
      ),
    }),
    name: Yup.string().required('please enter the name'),
  });

  const [values, setValues] = React.useState(false);
  const handleClickShowPassword = () => setValues(!values);
  const navigate = useNavigate();

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const { isAuth, loading } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuth) {
      fire('User Sign Up Successfull!', 'success');

      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <div
      className="main_div background "
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }} className="mb-4">
        <img
          src={priceGetter}
          style={{ width: '220px', cursor: 'pointer', margin: '20px' }}
          alt="logo"
          onClick={() => {
            navigate('/');
          }}
        />

        <h2 className="LOGIN_PAGE_TEXT">Sign Up</h2>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmpassword: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values: any) => authActions.register(values)}
          >
            {({ errors, touched }: any) => (
              <Form>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <FormControl sx={{ m: 0.5, width: '40ch' }}>
                    <Field
                      placeholder="User Name"
                      name="name"
                      label="name"
                      component={InputText}
                    />
                  </FormControl>
                  <div style={{ height: '15px' }}>
                    {errors.name && touched.name ? (
                      <div
                        style={{ width: '100%', textAlign: 'center' }}
                        className="errorText mb-1"
                      >
                        {errors.name}
                      </div>
                    ) : null}
                  </div>
                </Stack>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <FormControl sx={{ m: 0.5, width: '40ch' }}>
                    <Field
                      placeholder="email"
                      name="email"
                      label="email"
                      component={InputText}
                    />
                  </FormControl>
                  <div style={{ height: '15px' }}>
                    {errors.email && touched.email ? (
                      <div
                        style={{ width: '100%', textAlign: 'center' }}
                        className="errorText mb-2"
                      >
                        {errors.email}
                      </div>
                    ) : null}
                  </div>
                </Stack>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <FormControl sx={{ m: 0.5, width: '40ch' }}>
                    <Field
                      label="password"
                      name="password"
                      component={InputText}
                      type={values ? 'text' : 'password'}
                    />
                  </FormControl>
                  <IconButton
                    style={{
                      margin: '0 0 0 0',
                      position: 'relative',
                      right: '-130px',
                      bottom: '30px',
                      padding: '0',
                    }}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values ? (
                      <img alt="imgs" src={eye} />
                    ) : (
                      <img alt="imgs" src={eyeslash} />
                    )}
                  </IconButton>
                  <div style={{ height: '15px' }}>
                    {errors.password && touched.password ? (
                      <div
                        className="errorText"
                        style={{ position: 'relative', bottom: '18px' }}
                      >
                        {errors.password}
                      </div>
                    ) : null}
                  </div>
                </Stack>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: 2, mb: 2 }}
                >
                  <FormControl sx={{ m: 0.5, width: '40ch' }}>
                    <Field
                      label=" Confirm password"
                      name="confirmpassword"
                      component={InputText}
                      type={values ? 'text' : 'password'}
                    />
                  </FormControl>
                  <IconButton
                    style={{
                      width: '5px',
                      marginTop: '-35px',
                      marginLeft: '300px',
                    }}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values ? (
                      <img alt="iss" src={eye} />
                    ) : (
                      <img alt="" src={eyeslash} />
                    )}
                  </IconButton>
                  <div style={{ height: '15px' }}>
                    {errors.confirmpassword && touched.confirmpassword ? (
                      <div
                        style={{ width: '100%', textAlign: 'center' }}
                        className="errorText"
                      >
                        {errors.confirmpassword}
                      </div>
                    ) : null}
                  </div>
                </Stack>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    className="mb-2"
                    style={{
                      margin: 'auto',
                      background: ' #3EE18F',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
                      borderRadius: '10px',
                      width: '100%',
                    }}
                    variant="contained"
                    type="submit"
                  >
                    Signup
                  </Button>
                </div>
                <div className="d-flex justify-content-between align-align-items-center">
                  <p
                    className="login_p"
                    onClick={() => {
                      navigate('/signin');
                    }}
                  >
                    Already have account?
                  </p>
                  <p
                    className="login_p"
                    onClick={() => {
                      navigate('/forgotpassword');
                    }}
                  >
                    ForgotPassword
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default SignUp;
