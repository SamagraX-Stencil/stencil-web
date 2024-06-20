'use client'
import { useCallback, useState } from 'react'
import { Box, Container, IconButton } from '@mui/material'
import { useMemo } from 'react'
import ForumIcon from '@mui/icons-material/Forum'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useColorPalates } from '@samagra-x/stencil-hooks'
import {
  JsonToTable,
  List,
  OTPInput,
  ShareButtons,
  VoiceRecorder,
} from '@samagra-x/stencil-molecules'
import { Navbar } from '@samagra-x/stencil-molecules'

const Components = () => {
  const [otp, setOtp] = useState('')
  const theme = useColorPalates()
  const sampleList = useMemo(
    () => [
      {
        id: 'item1',
        label: 'Item 1',
        secondaryLabel: 'Description of Item 1',
        icon: <ForumIcon style={{ color: theme?.primary?.light }} />,

        items: [
          {
            id: 'subitem1-1',
            label: 'Subitem 1-1',
          },
          {
            id: 'subitem1-2',
            label: 'Subitem 1-2',
            isDivider: true,
          },
        ],
        onClick: 'functionNameForItem1',
        isDivider: false,
      },
      {
        id: 'item2',
        label: 'Item 2',
        avatar: 'https://rb.gy/u1ufa2',
        isDivider: true,
        secondaryAction: (
          <IconButton edge="end" aria-label="comments">
            <DeleteOutlineIcon />
          </IconButton>
        ),
      },

      {
        id: 'item3',
        label: 'Item 3',
        secondaryLabel: 'Description of Item 3',
        avatar: 'https://rb.gy/u1ufa2',
        items: [
          {
            id: 'subitem3-1',
            label: 'Subitem 3-1',
          },
        ],
      },
    ],
    [theme?.primary?.light]
  )
  const setInputMsg = useCallback(() => {
    //message to be passed to VoiceRecorders
  }, [])
  return (
    <Box
      style={{ background: 'lightgray', height: '90vh', overflow: 'scroll' }}
      className="bg-light"
    >
      <Container style={{ marginTop: '50px' }}>
        <h4>OTP Input</h4>
        <div className="mt-2 p-5 border">
          <OTPInput separator="-" length={4} value={otp} onChange={setOtp} />
        </div>
      </Container>

      <Container style={{ marginTop: '50px' }}>
        <h4>Voice recorder</h4>
        <div className="mt-2 p-5 border">
          <VoiceRecorder
            setInputMsg={setInputMsg}
            tapToSpeak={false}
            includeDiv={false}
          />
        </div>
      </Container>

      <Container style={{ marginTop: '50px' }}>
        <h4>List</h4>
        <div className="mt-2 p-5 border">
          {
            //@ts-ignore
            <List items={sampleList} />
          }
        </div>
      </Container>

      <Container style={{ marginTop: '50px' }}>
        <h4>Navbar</h4>
        <Navbar />
      </Container>

      <Box sx={{ marginTop: '50px' }}>
        <Container>
          <h4>JSON To Table</h4>
          <JsonToTable
            json={{
              personalDetails: {
                'Aadhaar Card No': '5592****6433',
                'Farmer Category': 'SMF',
                'Applicant Name': 'MALAR GARNAYAK',
                'Father Name': 'ISWAR GARNAYAK',
                District: 'ANGUL',
                Block: 'KANIHA',
                GP: 'KUILEI',
                Village: 'Kulei',
              },
              buttons: [
                {
                  id: 0,
                  type: 'kalia_grievance_status',
                  aadhar: 'Aadhar number - 559207276433',
                  textInEnglish: 'Grievance Status',
                  text: 'Grievance Status',
                },
                {
                  id: 1,
                  type: 'kalia_eligibility_criteria',
                  aadhar: 'Aadhar number - 559207276433',
                  textInEnglish: 'Eligibility Criteria',
                  text: 'Eligibility Criteria',
                },
                {
                  id: 2,
                  type: 'kalia_benefit_disbursal_history',
                  aadhar: 'Aadhar number - 559207276433',
                  textInEnglish: 'Benefit Disbursal History',
                  text: 'Benefit Disbursal History',
                },
              ],
            }}
          />
        </Container>
      </Box>

      <Container style={{ marginTop: '50px' }}>
        <h4>Share Buttons</h4>
        <div className="mt-2 p-10 border w-25">
          <ShareButtons />
        </div>
      </Container>
    </Box>
  )
}

export default Components
