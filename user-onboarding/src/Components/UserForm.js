import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

 
const UserForm = ({values, status, errors, touched}) => {
   const [user, setUser]= useState([]);
  
   useEffect(() => {
       status && setUser (user => [...user, status]);
   }, [status]);

    return (
        <div className="userForm">
        <Form>
            <Field type="text" name="name" placeholder="Name"/> 
            {touched.name && errors.name && (<p className="errors">{errors.name}</p>)}

            <Field type="email" name="email" placeholder="Email"/> 
            {touched.email && errors.email && (<p className="errors">{errors.email}</p>)}

            <Field type="password" name="password" placeholder="Password"/> 
            {touched.password && errors.password && (<p className="errors">{errors.password}</p>)}

            <label className="checkbox-container"> Terms of Service
            <Field className="service" type="checkbox" name="serviceTerms" checked={values.serviceTerms}/>
            </label>
        
            <button className="submit-button">Submit!</button>
        
        
        </Form> 
        {user.map(user => (
            <ul key={user.id}>
                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li>
                <li>Password: {user.password}</li>

            </ul>
        ))}
    </div>

    );
};

const FormikUserForm = withFormik({
    mapPropsToValues ({name, email,password, serviceTerms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
           serviceTerms: serviceTerms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),

    }),
    handleSubmit(values, {setStatus}) {
        axios.post("https://reqres.in/api/users" )
        .then(res => {
            setStatus(res.data);
            console.log(res)
        })
        .catch(err => console.log(err.response))
    }

})(UserForm);

export default FormikUserForm; 