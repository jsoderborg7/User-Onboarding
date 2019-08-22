import React, {useState} from 'react';
import axios from 'axios';
import {Form, Field, withFormik} from "formik";
import * as Yup from "yup";
import './Form.css';

const OnboardForm = ({errors, touched, values}) => {
  return (
    <div className="onboard-form">
      <Form>
        <Field name="name" type="text" placeholder="Name"/>
        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}
        <Field name="email" type="email" placeholder="Email"/>
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field name="password" type="password" placeholder="Password"/>
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <label className="checkbox">
          Terms of Service
          <Field name="terms" type="checkbox" checked={values.terms} />
        </label>
        <button>Submit</button>
      </Form>
    </div>
  );
};

const FormikOnboardForm = withFormik({
  mapPropsToValues({name, email, password, terms}) {
    return{
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("I need your name!"),
    email: Yup.string().required("Pretty please?"),
    password: Yup.string().required(),
  }),
  handleSubmit(values, {setStatus}){
    axios
    .post("< https://reqres.in/api/users>", values)
    .then(res => {
      setStatus(res.data);
    })
    .catch(err => console.log(err.response));
  }
})(OnboardForm);
export default FormikOnboardForm;
