import { Box } from '@mui/material';
import { FC, ReactElement } from 'react'

export const Layout: FC<{ children: ReactElement }> = ({ children }) => {
    return (<Box display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="95vh" // Full viewport height
      style={{background:'lightgray'}}
    >
      {children}
    </Box>
    );
  }