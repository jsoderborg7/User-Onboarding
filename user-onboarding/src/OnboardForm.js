import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Field, withFormik} from "formik";
import * as Yup from "yup";
import './Form.css';
import styled from "styled-components";

const OnboardForm = ({errors, touched, values, status}) => {
  const [user, setUser]= useState([]);
  console.log(user);
  useEffect(() => {
    if (status) {
      setUser([...user, status]);
    }
  }, [status]);
  return (
    <StyledDiv>
    <div className="onboard-form">
      <Form>
        <div className="field">
          <Field name="name" type="text" placeholder="Name"/>
          {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
          )}
        </div>
        <div className="field">
          <Field name="email" type="email" placeholder="Email"/>
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>
        <div className="field">
          <Field name="password" type="password" placeholder="Password"/>
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
        </div>
          <label className="checkbox-container">
            Accept Terms of Service
            <Field name="terms" type="checkbox" checked={values.terms}/>
            {touched.terms && errors.terms && (
              <p className="error">{errors.terms}</p>
            )}
          <span className="checkmark"/>
          </label>
          <button className="button">Submit</button>
      </Form>
      {user.map(user => ( 
        <p key={user.id}>
          {user.name}, {user.email}
        </p>
      ))}
    </div>
    </StyledDiv>
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
    terms: Yup.bool().oneOf([true], "Please accept the terms!"),
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

const StyledDiv = styled.div `
.onboard-form{
  border: 2px solid green;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 25%;
  margin: auto;
  padding: 3%;

  input{
    width: 100%;
    padding: 2%;
    margin: 5% 0%;
    font-size: 1.5rem;
  }

  .checkbox-container {
    font-size: 1.2rem;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-evenly;
    align-items: center;
    margin: auto;
    width: 100%;

    input{
      height: 30px;
      width: 30px;
      }
    }

   .button{
      font-size: 1.5rem;
      border-radius: 10px;
      padding: 5% 20%;
    }
}
`;
export default FormikOnboardForm;
