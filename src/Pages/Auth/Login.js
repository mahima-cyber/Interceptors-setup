import React from "react";
import Button from "../../Components/FormElements/Button";
import { Formik, useFormik } from 'formik';
import { Api } from "../../Service/Api";
import { postUrl } from "../../Service/ApiEndpoints";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../Components/FormElements/Input";

const Login = () => {
const navigate= useNavigate()
    const formik = useFormik({
        initialValues: { userName: '', password: '' },
        onSubmit: (values, { resetForm }) => {
            const api = new Api();
            api.post(postUrl,values);
            resetForm({ value: "" })
        }
       
    })
    return (
        <div className="component">
       <div className="login-form">
            <form onSubmit={formik.handleSubmit}>
                <FormInput
                    type="userName"
                    name="userName"
                    label= "Username"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                <FormInput
                    type="password"
                    name="password"
                    label= "Password"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                <Button type="submit"  variant="primary" label="SignIn" onClick={()=>navigate('/')}/>
                   
              
            </form>
            <Link to="/forgotpassword" style={{color: 'blue'}} >Forgotten password?</Link>
            <br/>
            <Button type="submit"  variant="primary" label="Create an account" onClick={()=>navigate('/register')}/>
        </div>
        </div>
    )

}
export default Login
