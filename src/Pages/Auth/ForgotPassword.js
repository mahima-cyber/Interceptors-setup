import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../Components/FormElements/Button'

const ForgotPassword = () => {
    const navigate = useNavigate()
  return (
    <div>
    <h2>Forgotten your password?</h2>
       <Button
               variant="primary" 
                // onClick={() => setOpenEmployeeModal(true)}
                onClick={()=>navigate('/login')}
                label="Back"
            /> 
    </div>
  )
}

export default ForgotPassword