import { Box, TextField, Typography } from '@mui/material'

const AdminRoute = () => {
  return (
    <Box sx={{ margin: 10 }}>
      {/* login through mobile and adhar page */}
      <Box sx={{ marginBottom: 20 }}>
        <Box sx={{ marginBottom: 20 }}>
          <Typography variant="body2">Login Page Variable</Typography>
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: 10, width: 300 }}
        >
          <TextField
            label="Title"
            id="outlined-size-small"
            defaultValue="Welcome!"
            size="small"
          />
        </Box>
      </Box>
      {/* login through mobile and adhar page */}
      <Box sx={{ marginBottom: 20 }}>
        <Box sx={{ marginBottom: 20 }}>
          <Typography variant="body2">Home Page Variable</Typography>
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: 10, width: 300 }}
        >
          <TextField
            label="Title"
            id="outlined-size-small"
            defaultValue="Ask me anything about farming"
            size="small"
            sx={{ marginBottom: 2, marginLeft: 2 }}
          />

          <TextField
            label="Placeholder"
            id="outlined-size-small"
            defaultValue="Ask your question"
            size="small"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default AdminRoute
