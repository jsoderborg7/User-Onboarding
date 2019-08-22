import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Field, withFormik} from "formik";
import * as Yup from "yup";
import './Form.css';

const OnboardForm = ({errors, touched, values, status}) => {
  const [user, setUser]= useState([]);
  console.log(user);
  useEffect(() => {
    if (status) {
      setUser([...user, status]);
    }
  }, [status]);
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
          Accept Terms of Service
          <Field name="terms" type="checkbox" checked={values.terms} />
          <span className="checkmark" />
        </label>
        <button>Submit</button>
      </Form>
      {user.map(user => ( 
        <p key={user.id}>
          {user.name}, {user.email}
        </p>
      ))}
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
    email: Yup.string().required("Need your email too!"),
    password: Yup.string().required("Need password (I'm so needy today!)"),
    
  }),
  handleSubmit(values, {setStatus}){
    axios
    .post('https://reqres.in/api/users', values)
    .then(res => {
      setStatus(res.data);
    })
    .catch(err => console.log(err.response));
  }
})(OnboardForm);
export default FormikOnboardForm;
