import { Box, TextField, Typography } from '@mui/material'

const gap = 20
const AdminRoute = () => {
  return (
    <Box sx={{ margin: 10, overflow: 'auto', height: '90vh' }}>
      {/* login through mobile and adhar page */}
      <Box sx={{ marginBottom: 20 }}>
        <Box sx={{ marginBottom: 20 }}>
          <PageTitle title="Login Page Variable" />
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

      {/* Comming soon page */}
      <Box sx={{ marginBottom: 20 }}>
        <Box sx={{ marginBottom: 20 }}>
          <PageTitle title="Comming soon Page Variable" />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: gap }}>
          <InputField label={'Title'} defaultValue={'Coming Soon!'} />
          <InputField
            label={'description'}
            defaultValue={
              'We are going to launch this feature very soon. Stay tuned!'
            }
          />
          <InputField label={'backText'} defaultValue={'Back'} />
        </Box>
      </Box>
      {/* DownTime page */}
      <Box sx={{ marginBottom: 20 }}>
        <Box sx={{ marginBottom: 20 }}>
          <PageTitle title="DownTime Page Variable" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: gap,
          }}
        >
          <InputField
            label={'Title'}
            defaultValue={"We're under maintainance"}
          />
          <InputField
            label={'Supporting Text'}
            defaultValue={'Have an urgent query?'}
          />
          <InputField label={'Contact Link'} defaultValue={'Call Ama Krushi'} />
          <InputField label={'Refresh Text'} defaultValue={'Try Again'} />
          <InputField
            label={'Previous Page Text'}
            defaultValue={'Previous Page'}
          />
        </Box>
      </Box>
      {/* FAQ page */}
      <Box sx={{ marginBottom: 20 }}>
        <Box sx={{ marginBottom: 20 }}>
          <PageTitle title="FAQs Page Variable" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: gap,
          }}
        >
          <InputField label={'Title'} defaultValue={'FAQs'} />
          <InputField
            label={'User Manual Text'}
            defaultValue={'User Manual - For VAWs'}
          />
          <InputField
            label={'Contact Description Text'}
            defaultValue={'To connect with call centre'}
          />
          <InputField label={'Contact Text'} defaultValue={'Dial'} />
        </Box>
      </Box>
      {/* Feedback page */}
      <Box sx={{ marginBottom: 20 }}>
        <Box sx={{ marginBottom: 20 }}>
          <PageTitle title="Feedback Page Variable" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: gap,
          }}
        >
          <InputField label={'Title'} defaultValue={'Feedback'} />
          <InputField
            label={'Rating Box Title'}
            defaultValue={'Rate your experience'}
          />
          <InputField
            label={'Rating Star Description'}
            defaultValue={'Click on the stars to rate'}
          />
          <InputField
            label={'Rating Button Text'}
            defaultValue={'Submit Rating'}
          />
          <InputField
            label={'Review Box Title'}
            defaultValue={'Write a review'}
          />
          <InputField
            label={'Review Place Holder'}
            defaultValue={'Enter your review here'}
          />
          <InputField
            label={'Rating Button Text'}
            defaultValue={'Submit Review'}
          />
        </Box>
      </Box>
      {/* History page */}
      <Box sx={{ marginBottom: 20 }}>
        <Box sx={{ marginBottom: 20 }}>
          <PageTitle title="History Page Variable" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: gap,
          }}
        >
          <InputField label={'Title'} defaultValue={'History'} />
          <InputField label={'No Items Text'} defaultValue={'No items found'} />
        </Box>
      </Box>
      {/* Home page */}
      <Box sx={{ marginBottom: 20 }}>
        <Box sx={{ marginBottom: 20 }}>
          <PageTitle title="Home Page Variable" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: gap,
          }}
        >
          <InputField
            label={'Title'}
            defaultValue={'Ask me anything about farming'}
          />
          <InputField
            label={'Placeholder'}
            defaultValue={'Ask Your Question'}
          />
        </Box>
      </Box>
      {/* Launch page */}
      <Box sx={{ marginBottom: 20 }}>
        <Box sx={{ marginBottom: 20 }}>
          <PageTitle title="Launch Page Variable" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: gap,
          }}
        >
          <InputField label={'Label'} defaultValue={'ଆମ କୃଷି ଏ ଆଇ ଚାଟ୍ ବୋଟ୍'} />
        </Box>
      </Box>
      {/* Navbar page */}
      <Box sx={{ marginBottom: 20 }}>
        <Box sx={{ marginBottom: 20 }}>
          <PageTitle title="Navbar Variable" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: gap,
          }}
        >
          <InputField label={'Brand Name'} defaultValue={'Bot'} />
        </Box>
      </Box>
      {/* Otp page */}
      <Box sx={{ marginBottom: 20 }}>
        <Box sx={{ marginBottom: 20 }}>
          <PageTitle title="Otp Page Variable" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: gap,
          }}
        >
          <InputField label={'Title'} defaultValue={'OTP Verification'} />
        </Box>
      </Box>
      {/* SideBar */}
      <Box sx={{ marginBottom: 20 }}>
        <Box sx={{ marginBottom: 20 }}>
          <PageTitle title="Sidebar Variable" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: gap,
          }}
        >
          <InputField label={'Profile Text'} defaultValue={'Welcome, User'} />
        </Box>
      </Box>
      {/* Voice Recorder */}
      <Box sx={{ marginBottom: 20 }}>
        <Box sx={{ marginBottom: 20 }}>
          <PageTitle title="Voice Recorder Variable" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: gap,
          }}
        >
          <InputField
            label={'Recorder Error Message'}
            defaultValue={
              'Your question was not recognised. Pls try speaking more clearly.'
            }
          />
          <InputField
            label={'Wait Message'}
            defaultValue={'Please wait while we process your request...'}
          />
        </Box>
      </Box>
    </Box>
  )
}

const InputField = ({
  label,
  defaultValue,
}: {
  label: string
  defaultValue: string
}) => {
  return (
    <TextField
      sx={{ width: 300 }}
      label={label}
      id="outlined-size-small"
      defaultValue={defaultValue}
      size="small"
    />
  )
}

const PageTitle = ({ title }: { title: string }) => {
  return (
    <Typography variant="body2" fontWeight="bold">
      {title}
    </Typography>
  )
}

export default AdminRoute
