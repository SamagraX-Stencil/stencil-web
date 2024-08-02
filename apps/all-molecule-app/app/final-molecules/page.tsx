'use client'
import React, { useCallback, useState } from 'react'
import { Box, Container, IconButton } from '@mui/material'
import { useMemo } from 'react'
import ForumIcon from '@mui/icons-material/Forum'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { SelectChangeEvent } from '@mui/material/Select'

import { InputComponent } from '@samagra-x/stencil-molecules'
import { Navbar } from '@samagra-x/stencil-molecules'
import { Button } from '@samagra-x/stencil-chatui'

const Components = () => {
  return (
    <Box
      style={{ background: 'lightgray', height: '90vh', overflow: 'scroll' }}
      className="bg-light"
    >
      <FinalInputComponent />
    </Box>
  )
}

const FinalInputComponent = () => {
  const [loginInput, setLoginInput] = useState('')
  const handleNextButtonTask = async () => {
    return 'success'
  }
  return (
    <Container style={{ marginTop: '30px', marginBottom: '20px' }}>
      <h4> Final Input Component</h4>
      <InputComponent
        handleNextTask={handleNextButtonTask}
        onChange={setLoginInput}
        placeholder="Enter UserName*"
        type="otp"
        value={loginInput}
        buttonText="login"
        title="Welcome !"
        mobileNumberForOtpScreen={'9907799970'}
        optBoxSeparator={<>-</>}
        passWordPlaceholder="Enter Password"
      />
    </Container>
  )
}

export default Components
