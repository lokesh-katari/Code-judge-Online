import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useEffect,useState } from 'react';

const AlertComponent = (props) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false)
    }, 5000)
  
    return () => {
      clearTimeout(timeId)
    }
    
  }, []);



  return (props.alert &&
    
    
    <div className='pt-16  relative'>
    <Alert severity="error">
        <AlertTitle>{props.title}</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
    </div>

  )
}

export default AlertComponent