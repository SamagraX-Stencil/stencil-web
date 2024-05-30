// import {
//   Image as Img,
//   Bubble,
//   FileCard,
//   ScrollView,
//   Typing,
// } from 'stencil-chatui'
// import moment from 'moment'
// import { JsonToTable } from '../json-to-table'

// export const UpdatedBubble = ({
//   message,
//   themeColor,
//   chatUi,
//   theme,
//   handleAudio,
//   feedbackHandler,
//   SpeakerIcon,
//   MsgThumbsUp,
//   MsgThumbsDown,
//   offlineBtnsStyle,
//   messageSpeakerStyle,
//   tableContinerStyle,
//   messageTriangleLeftStyle,
//   messageTriangleRightStyle,
//   optionsTextStyle,
//   textBubbleStyle,
//   msgFeedbackIconsStyle,
//   msgFeedbackStyle,
//   getLists,
//   reaction,
// }: any) => {
//   const { content, type } = message

//   switch (type) {
//     case 'loader':
//       return <Typing />
//     case 'text':
//       return (
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             position: 'relative',
//             maxWidth: '90vw',
//           }}
//         >
//           <Bubble
//             type="text"
//             style={
//               content?.data?.position === 'right'
//                 ? {
//                     background: theme?.primary?.main,
//                     borderRadius: '10px 10px 0 25px',
//                     boxShadow: '0 3px 8px rgba(0,0,0,.24)',
//                   }
//                 : {
//                     background: themeColor.primaryColor.value,
//                     borderRadius: '10px 10px 10px 0',
//                     boxShadow: '0 3px 8px rgba(0,0,0,.24)',
//                   }
//             }
//           >
//             <span
//               style={{
//                 fontWeight: 600,
//                 fontSize: '1rem',
//                 color:
//                   content?.data?.position === 'right'
//                     ? themeColor.primaryColor.value
//                     : theme?.primary?.main,
//               }}
//             >
//               {content?.text}{' '}
//               {/* {
//                 content?.data?.position === 'right'
//                   ? null
//                   : !content?.data?.isEnd
//                 && <BlinkingSpinner />
//               } */}
//             </span>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'flex-end',
//               }}
//             >
//               <span
//                 style={{
//                   color:
//                     content?.data?.position === 'right'
//                       ? themeColor.primaryColor.value
//                       : theme?.primary?.main,
//                   fontSize: '10px',
//                 }}
//               >
//                 {moment(
//                   content?.data?.sentTimestamp ||
//                     content?.data?.repliedTimestamp
//                 ).format('hh:mm A DD/MM/YYYY')}
//               </span>
//             </div>
//           </Bubble>
//           {content?.data?.btns ? (
//             <div className={offlineBtnsStyle}>
//               <button
//                 onClick={() => window?.location?.reload()}
//                 style={{
//                   border: `2px solid ${theme?.primary?.main}`,
//                 }}
//               >
//                 Refresh
//               </button>
//             </div>
//           ) : (
//             content?.data?.position === 'left' && (
//               <div
//                 style={{
//                   display: 'flex',
//                   position: 'relative',
//                   top: '-10px',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 {chatUi.allowTextToSpeech && (
//                   <div style={{ display: 'flex' }}>
//                     <div
//                       className={messageSpeakerStyle}
//                       onClick={handleAudio}
//                       style={
//                         !content?.data?.isEnd
//                           ? {
//                               pointerEvents: 'none',
//                               filter: 'grayscale(100%)',
//                               opacity: '0.5',
//                               border: `1px solid ${theme?.primary?.main}`,
//                             }
//                           : {
//                               pointerEvents: 'auto',
//                               opacity: '1',
//                               filter: 'grayscale(0%)',
//                               border: `1px solid ${theme?.primary?.main}`,
//                             }
//                       }
//                     >
//                       <img src={SpeakerIcon} width={15} height={15} alt="" />

//                       <p
//                         style={{
//                           fontSize: '11px',
//                           // color: config.theme.primaryColor.value,
//                           fontFamily: 'Mulish-bold',
//                           display: 'flex',
//                           alignItems: 'flex-end',
//                           marginRight: '1px',
//                           padding: '0 5px',
//                           color: `${theme?.primary?.dark}`,
//                         }}
//                       >
//                         {chatUi.textToSpeechLabel}
//                       </p>
//                     </div>
//                   </div>
//                 )}
//                 {chatUi.allowFeedback && (
//                   <div className={msgFeedbackStyle}>
//                     <div
//                       className={msgFeedbackIconsStyle}
//                       style={{
//                         border: `1px solid ${theme?.primary?.main}`,
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           flexDirection: 'column',
//                           paddingRight: '6px',
//                         }}
//                         onClick={() =>
//                           feedbackHandler({
//                             like: 1,
//                             msgId: content?.data?.messageId,
//                           })
//                         }
//                       >
//                         <MsgThumbsUp fill={reaction === 1} width="20px" />
//                         <p
//                           style={{
//                             fontSize: '11px',
//                             fontFamily: 'Mulish-bold',
//                             color: `${theme?.primary?.dark}`,
//                           }}
//                         >
//                           {chatUi.positiveFeedbackText}
//                         </p>
//                       </div>
//                       <div
//                         style={{
//                           height: '32px',
//                           width: '1px',
//                           backgroundColor: theme?.primary?.main,
//                           margin: '6px 0',
//                         }}
//                       ></div>

//                       <div
//                         style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           flexDirection: 'column',
//                         }}
//                         onClick={() =>
//                           feedbackHandler({
//                             like: -1,
//                             msgId: content?.data?.messageId,
//                           })
//                         }
//                       >
//                         <MsgThumbsDown fill={reaction === -1} width="20px" />
//                         <p
//                           style={{
//                             fontSize: '11px',
//                             fontFamily: 'Mulish-bold',
//                             color: `${theme?.primary?.dark}`,
//                           }}
//                         >
//                           {chatUi.negativeFeedbackText}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )
//           )}
//         </div>
//       )

//     case 'image': {
//       const url = content?.data?.payload?.media?.url || content?.data?.imageUrl
//       return (
//         <MediaBubble content={content} themeColor={themeColor} isFile={false} />
//       )
//     }

//     case 'file': {
//       const url = content?.data?.payload?.media?.url || content?.data?.fileUrl
//       return (
//         <MediaBubble content={content} themeColor={themeColor} isFile={true} />
//       )
//     }

//     case 'video': {
//       const url = content?.data?.payload?.media?.url || content?.data?.videoUrl
//       const videoId = url.split('=')[1]
//       return (
//         <>
//           <Bubble type="image">
//             <div style={{ padding: '7px' }}>
//               <iframe
//                 width="100%"
//                 height="fit-content"
//                 src={`https://www.youtube.com/embed/` + videoId}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                 allowFullScreen
//               ></iframe>
//               <div
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'self-end',
//                 }}
//               >
//                 <span
//                   style={{
//                     color: themeColor.primaryColor.value,
//                     fontSize: '10px',
//                   }}
//                 >
//                   {moment(
//                     content?.data?.sentTimestamp ||
//                       content?.data?.repliedTimestamp
//                   ).format('hh:mm A DD/MM/YYYY')}
//                 </span>
//               </div>
//             </div>
//           </Bubble>
//         </>
//       )
//     }
//     case 'options': {
//       return (
//         <>
//           <Bubble type="text" className={textBubbleStyle}>
//             <div style={{ display: 'flex' }}>
//               <span className={optionsTextStyle}>
//                 {content?.data?.payload?.text}
//               </span>
//             </div>
//             {getLists({
//               choices:
//                 content?.data?.payload?.buttonChoices ?? content?.data?.choices,
//             })}
//           </Bubble>
//         </>
//       )
//     }

//     case 'table': {
//       return (
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             position: 'relative',
//             maxWidth: '90vw',
//           }}
//         >
//           <div
//             className={
//               content?.data?.position === 'right'
//                 ? messageTriangleRightStyle
//                 : messageTriangleLeftStyle
//             }
//           ></div>
//           <Bubble type="text">
//             <div className={tableContinerStyle}>
//               <JsonToTable json={JSON.parse(content?.text)?.table} />
//             </div>
//             <span
//               style={{
//                 fontWeight: 600,
//                 fontSize: '1rem',
//                 color:
//                   content?.data?.position === 'right'
//                     ? theme?.primary?.main
//                     : themeColor.primaryColor.value,
//               }}
//             >
//               {`\n` +
//                 JSON.parse(content?.text)?.generalAdvice +
//                 `\n\n` +
//                 JSON.parse(content?.text)?.buttonDescription}
//               {getLists({
//                 choices: JSON.parse(content?.text)?.buttons,
//               })}
//             </span>
//           </Bubble>
//         </div>
//       )
//     }
//     default:
//       return (
//         <ScrollView
//           data={[]}
//           // @ts-ignore
//           renderItem={(item): ReactElement => <Button label={item.text} />}
//         />
//       )
//   }
// }

// const MediaBubble = ({ content, themeColor, isFile }: any) => {
//   const url = isFile
//     ? content?.data?.payload?.media?.url || content?.data?.fileUrl
//     : content?.data?.payload?.media?.url || content?.data?.imageUrl

//   const renderMedia = () => {
//     if (isFile) {
//       return <FileCard file={url} extension="pdf" />
//     } else {
//       return <Img src={url} width="299" height="200" alt="image" lazy fluid />
//     }
//   }

//   return (
//     <>
//       {content?.data?.position === 'left' && (
//         <div
//           style={{
//             width: '40px',
//             marginRight: '4px',
//             textAlign: 'center',
//           }}
//         ></div>
//       )}
//       <Bubble type="image">
//         <div style={{ padding: '7px' }}>
//           {renderMedia()}
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'self-end',
//             }}
//           >
//             <span
//               style={{
//                 color: themeColor.primaryColor.value,
//                 fontSize: '10px',
//               }}
//             >
//               {moment(
//                 content?.data?.sentTimestamp || content?.data?.repliedTimestamp
//               ).format('hh:mm A DD/MM/YYYY')}
//             </span>
//           </div>
//         </div>
//       </Bubble>
//     </>
//   )
// }
