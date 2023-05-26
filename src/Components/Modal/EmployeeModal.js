import React, { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Alert,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '../../Components/FormElements/Button';
import { generateId } from '../../Utilis/Utilis';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, resetEmployee, getEmployee, updateEmployee } from '../../Redux/Slice/employeeSlice';
import PageLoading from '../../Components/PageLoading/PageLoading';
import { TIMEOUT_TIME } from '../../Utilis/Utilis';

const phoneRegExp = /^[7-9][0-9]{9}$/;
const validationSchema = Yup.object().shape({
     name: Yup.string().matches(/^\S*$/, "Name with spaces should not allowed").required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    department: Yup.string().required('Please select department'),
    gender: Yup.string().required('Gender is required'),
    mobile: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').required('Mobile number is required'),
});

const formInitialValues = {
    name: '',
    email: '',
    mobile: '',
    department: '',
    gender: 'male'
}

const EmployeeModal = (props) => {
    const { openModal, closeModal } = props
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [showMessage, setShowMessage] = useState(null)

    const { message, employeeDetails, } = useSelector((state) => {
        return {
            employeeDetails: state?.employee?.employeeDetails,
            message: state?.employee?.message,
        }
    })

    const [initialValues, setInitialValues] = useState(formInitialValues)
    useEffect(() => {
        if (typeof openModal === 'string') {
            setIsLoading(true)
            dispatch(getEmployee(openModal))
            setTimeout(() => {
                setIsLoading(false)
            }, TIMEOUT_TIME)
        }
    }, [openModal])

    const handeSave = ({ name, email, mobile, department, gender }) => {
        setIsLoading(true)
        let id = openModal;
        if (typeof openModal !== 'string')
            id = generateId()
        const payload = {
            id,
            name,
            email,
            mobile,
            department,
            gender
        }
        if (typeof openModal === 'string') {
            dispatch(updateEmployee(payload))
        } else {
            dispatch(addEmployee(payload))
        }
    }

    useEffect(() => {
        if (message) {
            setShowMessage(message)
            setTimeout(() => {
                handleClose()
            }, TIMEOUT_TIME)
        }
        if (employeeDetails && typeof openModal === 'string') {
            setInitialValues({
                ...initialValues,
                ...employeeDetails,
                password: ''
            })
        }
    }, [message, employeeDetails, openModal])

    const handleClose = () => {
        setInitialValues(formInitialValues)
        dispatch(resetEmployee())
        setIsLoading(false)
        closeModal()
        setShowMessage('')
    }

    return (
        <Dialog
            fullWidth={true}
            open={openModal}
        >
            <DialogContent>
                {showMessage && (
                    <Alert severity="success" variant="filled">{showMessage}</Alert>
                )}
                <PageLoading
                    loading={isLoading}
                />
                <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                    <Grid item xs={6} textAlign='left'>
                        <Typography variant="h5"><strong>Employee </strong></Typography>
                        <Typography variant='body2'>Create/Update your employee</Typography>
                    </Grid>
                </Grid>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handeSave}
                >
                    {({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (
                        <Form>

                            <Grid container spacing={2}>
                                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign='left'>
                                    <TextField
                                        error={errors.name && touched.name}
                                        id="name"
                                        label="Name"
                                        fullWidth
                                        value={values?.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={errors.name && touched.name && (errors.name)}
                                    />
                                </Grid>
                                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign='left'>
                                    <TextField
                                        error={errors.email && touched.email}
                                        id="email"
                                        label="Email"
                                        fullWidth
                                        value={values?.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={errors.email && touched.email && (errors.email)}
                                    />
                                </Grid>
                                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign='left'>
                                    <FormControl
                                        sx={{ width: '100%' }}
                                        error={errors.department && touched.department}
                                    >
                                        <InputLabel id="department">Department</InputLabel>
                                        <Select
                                            labelId="department"
                                            id="department"
                                            value={values.department}
                                            label="Department"
                                            onChange={(e) => setFieldValue('department', e.target.value)}
                                            onBlur={(e) => setFieldValue('department', e.target.value)}
                                        >
                                            <MenuItem value="Production">Production</MenuItem>
                                            <MenuItem value="UAT">UAT</MenuItem>
                                            <MenuItem value="Testing">Testing</MenuItem>
                                            <MenuItem value="Development">Development</MenuItem>

                                        </Select>
                                        <FormHelperText>{errors.department && touched.department && (errors.department)}</FormHelperText>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign='left'>
                                    <TextField
                                        error={errors.mobile && touched.mobile}
                                        id="mobile"
                                        label="Mobile"
                                        type="text"
                                        fullWidth
                                        value={values?.mobile}
                                        onChange={e => {
                                            e.preventDefault();
                                            const { value } = e.target;
                                            const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
                                            if (regex.test(value.toString())) {
                                                setFieldValue("mobile", value);
                                            }
                                        }}
                                        onBlur={handleBlur}
                                        helperText={errors.mobile && touched.mobile && (errors.mobile)}
                                    />
                                </Grid>

                                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign='left'>
                                    <FormControl>
                                        <FormLabel id="gender">Gender</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="male"
                                            value={values?.gender}
                                            onChange={(e) => setFieldValue('gender', e.target.value)}
                                            name="gender"
                                            id='gender'
                                        >
                                            <FormControlLabel
                                                value="male"
                                                key='male'
                                                control={<Radio />}
                                                label="Male"
                                            />
                                            <FormControlLabel
                                                value="female"
                                                key='female'
                                                control={<Radio />}
                                                label="Female"
                                            />
                                            <FormControlLabel
                                                value="other"
                                                key='other'
                                                control={<Radio />}
                                                label="Other"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sx={{ marginBottom: 1 }} textAlign='right' mt={2}>
                                    <Divider sx={{ marginBottom: '15px' }} />
                                    <Button
                                        variant='outlined'
                                        type='button'
                                        sx={{ marginRight: 1 }}
                                        label='Cancel'
                                        loading={isLoading}
                                        onClick={handleClose}
                                    />
                                    <Button
                                        variant='contained'
                                        type='submit'
                                        label='Save'
                                        loading={isLoading}
                                    />
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}
export default EmployeeModal;