// Define types for the theme object
interface Theme {
  palette: {
    primary: {
      main: string
      light: string
      dark: string
      contrastText: string
    }
  }
  primaryColor: {
    allowOverride: boolean
    value: string
  }
  secondaryColor: {
    allowOverride: boolean
    value: string
  }
}

// Define types for the component object
interface BotDetails {
  logo: string
  botName: string
  allowOverride: boolean
}

interface HomePage {
  allowOverride: boolean
  title: string
  showBtns: boolean
  btns: { title: string; image: string }[]
  showMic: boolean
  placeholder: string
}

interface Navbar {
  brandName: string
  showHamburgerMenu: boolean
  showHomeIcon: boolean
  leftHomeIcon: { id: string; src: string }
  logos: {
    showCenterLogos: boolean
    centerLogoIcons: { id: string; src: string }[]
    showRightLogos: boolean
    rightLogoIcons: { id: string; src: string }[]
  }
}

interface Link {
  label: string
  icon: string
  route: string
}

interface Sidebar {
  showLangSwitcher: boolean
  languages: { code: string; label: string }[]
  showProfileIcon: boolean
  profileText: string
  links: Link[]
  showLogoutButton: boolean
  logoutButtonLabel: string
}

interface OtpPage {
  allowOverride: boolean
  showLogo: boolean
  showSplitedView: boolean
  otpLength: number
  logo: string
  title: string
  resendOtpTimer: number
}

interface ComingSoon {
  allowOverride: boolean
  title: string
  description: string
  backText: string
}

interface Downtime {
  allowOverride: boolean
  title: string
  downTimeImage: string
  supportingText: string
  contactLink: string
  refreshText: string
  previousPageText: string
}

interface Faqs {
  allowOverride: boolean
  title: string
  userManualText: string
  contactDescriptionText: string
  contactText: string
}

interface VoiceRecorder {
  allowOverride: boolean
  voiceMinDecibels: number
  delayBetweenDialogs: number
  dialogMaxLength: number
  isRecording: boolean
  recorderErrorMessage: string
  waitMessage: string
}

interface FeedbackPage {
  ratingBox: boolean
  reviewBox: boolean
  Title: string
  ratingBoxTitle: string
  ratingMaxStars: number
  ratingStarDescription: string
  ratingButtonText: string
  reviewBoxTitle: string
  reviewPlaceholder: string
  reviewButtonText: string
}

interface LoginMobileAadharPage {
  allowOverride: boolean
  loginWithAadhaar: boolean
  showSignUp: boolean
  showAlternateSignIn: boolean
  showLogo: boolean
  showSplitedView: boolean
  logo: string
  title: string
}

interface HistoryPage {
  allowOverride: boolean
  title: string
  noItemsText: string
  allowDelete: boolean
  showTimestamp: boolean
}

interface LaunchPage {
  allowOverride: boolean
  logo: string
  label: string
}

interface ChatUi {
  allowOverride: boolean
  placeholder: string
  allowFeedback: boolean
  positiveFeedbackText: string
  negativeFeedbackText: string
  allowTextToSpeech: boolean
  textToSpeechLabel: string
  allowTransliteration: boolean
  transliterationApi: string
  transliterationInputLanguage: string
  transliterationOutputLanguage: string
  transliterationProvider: string
  transliterationSuggestions: number
  rightAction: null
  leftAction: null
}

interface ShareButton {
  allowOverride: boolean
  allowDownloadChat: boolean
  allowShareChat: boolean
}

export interface Component {
  botDetails: BotDetails
  homePage: HomePage
  navbar: Navbar
  sidebar: Sidebar
  otpPage: OtpPage
  comingSoon: ComingSoon
  downtime: Downtime
  faqs: Faqs
  voiceRecorder: VoiceRecorder
  feedbackPage: FeedbackPage
  loginMobileAadharPage: LoginMobileAadharPage
  historyPage: HistoryPage
  launchPage: LaunchPage
  chatUi: ChatUi
  shareButton: ShareButton
}

// Define the type for the JSON object
interface AppConfig {
  theme: Theme
  component: Component
  [key: string]: any // Add this line
}

export default AppConfig
