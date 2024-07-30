'use client'
import React, { useCallback, useState } from 'react'
import { Box, Container, IconButton } from '@mui/material'
import { useMemo } from 'react'
import ForumIcon from '@mui/icons-material/Forum'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useColorPalates } from '@samagra-x/stencil-hooks'
import { SelectChangeEvent } from '@mui/material/Select'

import {
  BlinkingSpinner,
  FullPageLoader,
  JsonToTable,
  LanguagePicker,
  List,
  NewLanguagePicker,
  OTPInput,
  ShareButtons,
  StencilModal,
  NewNavbar,
  TransliterationInput,
  VoiceRecorder,
} from '@samagra-x/stencil-molecules'
import { Navbar } from '@samagra-x/stencil-molecules'
import { Button } from '@samagra-x/stencil-chatui'

const Components = () => {
  const [otp, setOtp] = useState('')
  const theme = useColorPalates()
 {/* const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }; */}

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

  {/*    <Container style={{ marginTop: '50px' }}>
        <h4>New Navbar</h4>
        <NewNavbar
  brandName="Bot"
  onToggle={handleToggle}
  isOpen={isSidebarOpen}
  showHamburgerMenu={true}
  showHomeIcon={true}
  leftHomeIcon={{ id: 'home', src: '/path/to/home/icon.png' }}
  centerLogoIcons={[{ id: 'center1', src: '/path/to/center/icon1.png' }]}
  rightLogoIcons={[{ id: 'right1', src: '/path/to/right/icon1.png' }]}
  style={{
    appBar: { backgroundColor: 'blue' },
    toolbar: { padding: '10px' },
    leftSection: { marginLeft: '20px' },
    centerSection: { textAlign: 'center' },
    rightSection: { marginRight: '20px' },
  }}
/>
</Container>

*/}

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
      <LangugagePickerComponent />
      <BlinkingSpinnerComponent />
      <FullPageLoaderComponent />
      <ModalComponent />
      <TransliterationInputComponent />
    </Box>
  )
}

const LangugagePickerComponent = () => {
  const languages = [
    { name: 'Eng', value: 'en' },
    { name: 'हिंदी', value: 'hi' },
  ]
  const [activeLanguage, setActiveLanguage] = React.useState('en')

  const handleLanguageClick = (event: SelectChangeEvent) => {
    setActiveLanguage(event.target.value)
  }
  return (
    <Container style={{ marginTop: '50px' }}>
      <h4>Language Picker</h4>
      <div className="mt-2 p-10 border w-25">
        <NewLanguagePicker
          languages={languages}
          activeLanguage={activeLanguage}
          handleLanguageClick={handleLanguageClick}
        />
      </div>
    </Container>
  )
}

const BlinkingSpinnerComponent = () => {
  return (
    <Container style={{ marginTop: '50px' }}>
      <h4>Blinking Spinner</h4>
      <div className="mt-2 p-10 border w-25">
        <BlinkingSpinner />
      </div>
    </Container>
  )
}
const FullPageLoaderComponent = () => {
  const [loader, setLoader] = useState(false)

  const FetchData = () => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 2000)
  }
  return (
    <Container style={{ marginTop: '30px', marginBottom: '20px' }}>
      <h4>FullPage Loader</h4>
      <div className="mt-2 p-10 border w-25">
        <FullPageLoader loading={loader} label="loading" />
      </div>
      {/* @ts-ignore */}
      <Button onClick={FetchData}>Fetch Data</Button>
    </Container>
  )
}

const ModalComponent = () => {
  const [showModal, setShowModal] = useState(false)
  const handleOPen = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  return (
    <Container style={{ marginTop: '30px', marginBottom: '20px' }}>
      <h4>Show Modal</h4>

      {/* @ts-ignore */}
      <Button onClick={handleOPen}>Open modal</Button>
      <StencilModal
        handleCancelButton={handleClose}
        showModal={showModal}
        heading="Click On Ok button"
      />
    </Container>
  )
}
const TransliterationInputComponent = () => {
  const [review, setReview] = useState('')
  const config = {
    allowFeedback: true,
    allowTextToSpeech: true,
    transliterationApi: '',
    allowTransliteration: false,
    transliterationProvider: '',
    transliterationSuggestions: '',
    transliterationInputLanguage: '',
    transliterationOutputLanguage: '',
  }

  return (
    <Container style={{ marginTop: '30px', marginBottom: '20px' }}>
      <h4>Transliteration Input</h4>

      {/* @ts-ignore */}
      <TransliterationInput
        data-testid="feedback-popup-box"
        config={config}
        value={review}
        setValue={setReview}
        name="experience-feedback"
        id="inputBox"
        multiline={true}
        style={{ minHeight: '120px', minWidth: '250px', padding: '5px' }}
        placeholder={'Let us know your issue with the response'}
      />
    </Container>
  )
}

export default Components
