import React from "react";
import Button from "../../Components/FormElements/Button";
import { Formik, useFormik } from 'formik';
import { Api } from "../../Service/Api";
import { postUrl } from "../../Service/ApiEndpoints";
import Input from "../../Components/FormElements/Input";
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../Redux/Slice/UserSlice';
import './Auth.scss'

const Register = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: { name: '', email: '' },
        onSubmit: (values, { resetForm }) => {
            dispatch(createUser(values))
            // const api = new Api();
            // api.post(postUrl,values);
            resetForm({ value: "" })
        }
       
    })
    return (
        <div className="component">
           <form onSubmit={formik.handleSubmit}>
           <div className="register-form">
                <Input
                    type="name"
                    name="name"
                    label= "name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                <Input
                    type="email"
                    name="email"
                    label= "email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                <Button type="submit"  variant="primary" label="submit"/>
                </div>
            </form>
        </div>
    )

}
export default Register

// export { apiService, Api };

//  const createQueryParams = params => 
//       Object.keys(params)
//             .map(k => `${k}=${encodeURI(params[k])}`)
//             .join('&');

  
//     const queryParams = createQueryParams(params)