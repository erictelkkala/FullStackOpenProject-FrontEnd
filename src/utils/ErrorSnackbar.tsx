import { useState } from 'react'

import { ApolloError } from '@apollo/client'
import CloseIcon from '@mui/icons-material/Close'
import { Alert, IconButton, Snackbar } from '@mui/material'

import { useError } from '../redux/hooks'

function ErrorSnackbar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  const errorMessage = useError()

  if (!errorMessage) return <>{children}</>

  return (
    <>
      <Snackbar open={open} autoHideDuration={12000} onClose={() => setOpen(false)}>
        <Alert
          severity="error"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      {children}
    </>
  )
}

export default ErrorSnackbar
