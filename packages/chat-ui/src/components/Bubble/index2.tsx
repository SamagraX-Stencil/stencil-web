import React, { Children } from 'react';

export interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: string;
  content?: any;
}

export const NewBubble = ({ message, themeColor, chatUi }) => {
  const { type = 'text', content, children, ...other } = props;
  return (
    <div className={`Bubble ${type}`} data-type={type} {...other}>
      {content && <p>{content}</p>}
      return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          maxWidth: '90vw',
        }}
      >
        <Bubble
          type="text"
          style={
            content?.data?.position === 'right'
              ? {
                  background: theme?.primary?.main,
                  borderRadius: '10px 10px 0 25px',
                  boxShadow: '0 3px 8px rgba(0,0,0,.24)',
                }
              : {
                  background: themeColor.primaryColor.value,
                  borderRadius: '10px 10px 10px 0',
                  boxShadow: '0 3px 8px rgba(0,0,0,.24)',
                }
          }
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: '1rem',
              color:
                content?.data?.position === 'right'
                  ? themeColor.primaryColor.value
                  : theme?.primary?.main,
            }}
          >
            {content?.text}{' '}
            {/* {
                content?.data?.position === 'right'
                  ? null
                  : !content?.data?.isEnd
                && <BlinkingSpinner />
              } */}
          </span>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <span
              style={{
                color:
                  content?.data?.position === 'right'
                    ? themeColor.primaryColor.value
                    : theme?.primary?.main,
                fontSize: '10px',
              }}
            >
              {moment(content?.data?.sentTimestamp || content?.data?.repliedTimestamp).format(
                'hh:mm A DD/MM/YYYY',
              )}
            </span>
          </div>
        </Bubble>
        {content?.data?.btns ? (
          <div className={styles.offlineBtns}>
            <button
              onClick={() => window?.location?.reload()}
              style={{
                border: `2px solid ${theme?.primary?.main}`,
              }}
            >
              Refresh
            </button>
          </div>
        ) : (
          content?.data?.position === 'left' && (
            <div
              style={{
                display: 'flex',
                position: 'relative',
                top: '-10px',
                justifyContent: 'space-between',
              }}
            >
              {chatUi.allowTextToSpeech && (
                <div style={{ display: 'flex' }}>
                  <div
                    className={styles.msgSpeaker}
                    onClick={handleAudio}
                    style={
                      !content?.data?.isEnd
                        ? {
                            pointerEvents: 'none',
                            filter: 'grayscale(100%)',
                            opacity: '0.5',
                            border: `1px solid ${theme?.primary?.main}`,
                          }
                        : {
                            pointerEvents: 'auto',
                            opacity: '1',
                            filter: 'grayscale(0%)',
                            border: `1px solid ${theme?.primary?.main}`,
                          }
                    }
                  >
                    <img src={SpeakerIcon} width={15} height={15} alt="" />

                    <p
                      style={{
                        fontSize: '11px',
                        // color: config.theme.primaryColor.value,
                        fontFamily: 'Mulish-bold',
                        display: 'flex',
                        alignItems: 'flex-end',
                        marginRight: '1px',
                        padding: '0 5px',
                        color: `${theme?.primary?.dark}`,
                      }}
                    >
                      {chatUi.textToSpeechLabel}
                    </p>
                  </div>
                </div>
              )}
              {chatUi.allowFeedback && (
                <div className={styles.msgFeedback}>
                  <div
                    className={styles.msgFeedbackIcons}
                    style={{
                      border: `1px solid ${theme?.primary?.main}`,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        paddingRight: '6px',
                      }}
                      onClick={() =>
                        feedbackHandler({
                          like: 1,
                          msgId: content?.data?.messageId,
                        })
                      }
                    >
                      <MsgThumbsUp fill={reaction === 1} width="20px" />
                      <p
                        style={{
                          fontSize: '11px',
                          fontFamily: 'Mulish-bold',
                          color: `${theme?.primary?.dark}`,
                        }}
                      >
                        {chatUi.positiveFeedbackText}
                      </p>
                    </div>
                    <div
                      style={{
                        height: '32px',
                        width: '1px',
                        backgroundColor: theme?.primary?.main,
                        margin: '6px 0',
                      }}
                    ></div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      }}
                      onClick={() =>
                        feedbackHandler({
                          like: -1,
                          msgId: content?.data?.messageId,
                        })
                      }
                    >
                      <MsgThumbsDown fill={reaction === -1} width="20px" />
                      <p
                        style={{
                          fontSize: '11px',
                          fontFamily: 'Mulish-bold',
                          color: `${theme?.primary?.dark}`,
                        }}
                      >
                        {chatUi.negativeFeedbackText}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
      )
    </div>
  );
};
