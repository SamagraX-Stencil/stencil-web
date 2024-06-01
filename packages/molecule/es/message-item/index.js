import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { Bubble, Image as Img, ScrollView, List, ListItem, FileCard, Typing } from '@repo/chatui';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import styles from './index.module.css';
import RightIcon from './assets/right';
import SpeakerIcon from './assets/speaker.svg';
import MsgThumbsUp from './assets/msg-thumbs-up';
import MsgThumbsDown from './assets/msg-thumbs-down';
import moment from 'moment';
import { JsonToTable } from '../json-to-table';
import { useColorPalates } from '@repo/hooks';

// import BlinkingSpinner from '../blinking-spinner/index';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var MessageItem = function MessageItem(_ref) {
  var _message$content, _message$content2, _message$content4, _content$data2, _theme$primary4, _content$data3, _theme$primary5, _content$data4, _theme$primary6, _content$data5, _content$data6, _content$data7, _theme$primary7, _content$data8, _content$data9, _theme$primary8, _theme$primary9, _theme$primary10, _theme$primary11, _theme$primary12, _theme$primary13, _theme$primary14;
  var message = _ref.message,
    themeColor = _ref.themeColor,
    chatUi = _ref.chatUi;
  var theme = useColorPalates();
  var _useState = useState(message === null || message === void 0 || (_message$content = message.content) === null || _message$content === void 0 || (_message$content = _message$content.data) === null || _message$content === void 0 ? void 0 : _message$content.reaction),
    _useState2 = _slicedToArray(_useState, 2),
    reaction = _useState2[0],
    setReaction = _useState2[1];
  // @ts-ignore
  var _useState3 = useState((message === null || message === void 0 || (_message$content2 = message.content) === null || _message$content2 === void 0 || (_message$content2 = _message$content2.data) === null || _message$content2 === void 0 ? void 0 : _message$content2.optionClicked) || false),
    _useState4 = _slicedToArray(_useState3, 2),
    optionDisabled = _useState4[0],
    setOptionDisabled = _useState4[1];
  useEffect(function () {
    var _message$content3;
    setReaction(message === null || message === void 0 || (_message$content3 = message.content) === null || _message$content3 === void 0 || (_message$content3 = _message$content3.data) === null || _message$content3 === void 0 ? void 0 : _message$content3.reaction);
  }, [message === null || message === void 0 || (_message$content4 = message.content) === null || _message$content4 === void 0 || (_message$content4 = _message$content4.data) === null || _message$content4 === void 0 ? void 0 : _message$content4.reaction]);
  var feedbackHandler = useCallback(function (_ref2) {
    var like = _ref2.like;
    if (reaction === 0) {
      return setReaction(like);
    }
    if (reaction === 1 && like === -1) {
      return setReaction(-1);
    }
    if (reaction === -1 && like === 1) {
      return setReaction(1);
    }
    setReaction(0);
  }, [reaction]);
  var getLists = useCallback(function (_ref3) {
    var choices = _ref3.choices;
    return /*#__PURE__*/_jsx(List, {
      className: "".concat(styles.list),
      children: choices === null || choices === void 0 ? void 0 : choices.map(function (choice, index) {
        var _content$data, _theme$primary, _theme$primary2, _theme$primary3;
        return (
          /*#__PURE__*/
          // {_.map(choices ?? [], (choice, index) => (
          _jsx(ListItem, {
            className: "".concat(styles.onHover, " ").concat(styles.listItem),
            onClick: function onClick(e) {
              e.preventDefault();
              if (optionDisabled) {
                toast.error("Cannot answer again");
              }
            },
            children: /*#__PURE__*/_jsxs("div", {
              style: {
                display: 'flex',
                alignItems: 'center',
                color: (content === null || content === void 0 || (_content$data = content.data) === null || _content$data === void 0 ? void 0 : _content$data.position) === 'right' ? theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main : optionDisabled ? themeColor.primaryColor.value : theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
              },
              children: [/*#__PURE__*/_jsx("div", {
                children: choice
              }), /*#__PURE__*/_jsx("div", {
                style: {
                  marginLeft: 'auto'
                },
                children: /*#__PURE__*/_jsx(RightIcon, {
                  width: "30px",
                  color: optionDisabled ? themeColor.primaryColor.value : theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main
                })
              })]
            })
          }, "".concat(index, "_").concat(choice === null || choice === void 0 ? void 0 : choice.key))
        );
      })
    });
  }, []);
  var content = message.content,
    type = message.type;
  console.log('here', content);
  var handleAudio = useCallback(function (url) {
    // console.log(url)
    if (!url) {
      toast.error('No audio');
      return;
    }
    // Write logic for handling audio here
  }, []);
  switch (type) {
    case 'loader':
      return /*#__PURE__*/_jsx(Typing, {});
    case 'text':
      return /*#__PURE__*/_jsxs("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          maxWidth: '90vw'
        },
        children: [/*#__PURE__*/_jsxs(Bubble, {
          type: "text",
          style: (content === null || content === void 0 || (_content$data2 = content.data) === null || _content$data2 === void 0 ? void 0 : _content$data2.position) === 'right' ? {
            background: theme === null || theme === void 0 || (_theme$primary4 = theme.primary) === null || _theme$primary4 === void 0 ? void 0 : _theme$primary4.main,
            borderRadius: '10px 10px 0 25px',
            boxShadow: '0 3px 8px rgba(0,0,0,.24)'
          } : {
            background: themeColor.primaryColor.value,
            borderRadius: '10px 10px 10px 0',
            boxShadow: '0 3px 8px rgba(0,0,0,.24)'
          },
          children: [/*#__PURE__*/_jsxs("span", {
            style: {
              fontWeight: 600,
              fontSize: '1rem',
              color: (content === null || content === void 0 || (_content$data3 = content.data) === null || _content$data3 === void 0 ? void 0 : _content$data3.position) === 'right' ? themeColor.primaryColor.value : theme === null || theme === void 0 || (_theme$primary5 = theme.primary) === null || _theme$primary5 === void 0 ? void 0 : _theme$primary5.main
            },
            children: [content === null || content === void 0 ? void 0 : content.text, ' ']
          }), /*#__PURE__*/_jsx("div", {
            style: {
              display: 'flex',
              justifyContent: 'flex-end'
            },
            children: /*#__PURE__*/_jsx("span", {
              style: {
                color: (content === null || content === void 0 || (_content$data4 = content.data) === null || _content$data4 === void 0 ? void 0 : _content$data4.position) === 'right' ? themeColor.primaryColor.value : theme === null || theme === void 0 || (_theme$primary6 = theme.primary) === null || _theme$primary6 === void 0 ? void 0 : _theme$primary6.main,
                fontSize: '10px'
              },
              children: moment((content === null || content === void 0 || (_content$data5 = content.data) === null || _content$data5 === void 0 ? void 0 : _content$data5.sentTimestamp) || (content === null || content === void 0 || (_content$data6 = content.data) === null || _content$data6 === void 0 ? void 0 : _content$data6.repliedTimestamp)).format('hh:mm A DD/MM/YYYY')
            })
          })]
        }), content !== null && content !== void 0 && (_content$data7 = content.data) !== null && _content$data7 !== void 0 && _content$data7.btns ? /*#__PURE__*/_jsx("div", {
          className: styles.offlineBtns,
          children: /*#__PURE__*/_jsx("button", {
            onClick: function onClick() {
              var _window;
              return (_window = window) === null || _window === void 0 || (_window = _window.location) === null || _window === void 0 ? void 0 : _window.reload();
            },
            style: {
              border: "2px solid ".concat(theme === null || theme === void 0 || (_theme$primary7 = theme.primary) === null || _theme$primary7 === void 0 ? void 0 : _theme$primary7.main)
            },
            children: "Refresh"
          })
        }) : (content === null || content === void 0 || (_content$data8 = content.data) === null || _content$data8 === void 0 ? void 0 : _content$data8.position) === 'left' && /*#__PURE__*/_jsxs("div", {
          style: {
            display: 'flex',
            position: 'relative',
            top: '-10px',
            justifyContent: 'space-between'
          },
          children: [chatUi.allowTextToSpeech && /*#__PURE__*/_jsx("div", {
            style: {
              display: 'flex'
            },
            children: /*#__PURE__*/_jsxs("div", {
              className: styles.msgSpeaker,
              onClick: handleAudio,
              style: !(content !== null && content !== void 0 && (_content$data9 = content.data) !== null && _content$data9 !== void 0 && _content$data9.isEnd) ? {
                pointerEvents: 'none',
                filter: 'grayscale(100%)',
                opacity: '0.5',
                border: "1px solid ".concat(theme === null || theme === void 0 || (_theme$primary8 = theme.primary) === null || _theme$primary8 === void 0 ? void 0 : _theme$primary8.main)
              } : {
                pointerEvents: 'auto',
                opacity: '1',
                filter: 'grayscale(0%)',
                border: "1px solid ".concat(theme === null || theme === void 0 || (_theme$primary9 = theme.primary) === null || _theme$primary9 === void 0 ? void 0 : _theme$primary9.main)
              },
              children: [/*#__PURE__*/_jsx("img", {
                src: SpeakerIcon,
                width: 15,
                height: 15,
                alt: ""
              }), /*#__PURE__*/_jsx("p", {
                style: {
                  fontSize: '11px',
                  // color: config.theme.primaryColor.value,
                  fontFamily: 'Mulish-bold',
                  display: 'flex',
                  alignItems: 'flex-end',
                  marginRight: '1px',
                  padding: '0 5px',
                  color: "".concat(theme === null || theme === void 0 || (_theme$primary10 = theme.primary) === null || _theme$primary10 === void 0 ? void 0 : _theme$primary10.dark)
                },
                children: chatUi.textToSpeechLabel
              })]
            })
          }), chatUi.allowFeedback && /*#__PURE__*/_jsx("div", {
            className: styles.msgFeedback,
            children: /*#__PURE__*/_jsxs("div", {
              className: styles.msgFeedbackIcons,
              style: {
                border: "1px solid ".concat(theme === null || theme === void 0 || (_theme$primary11 = theme.primary) === null || _theme$primary11 === void 0 ? void 0 : _theme$primary11.main)
              },
              children: [/*#__PURE__*/_jsxs("div", {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  paddingRight: '6px'
                },
                onClick: function onClick() {
                  var _content$data10;
                  return feedbackHandler({
                    like: 1,
                    msgId: content === null || content === void 0 || (_content$data10 = content.data) === null || _content$data10 === void 0 ? void 0 : _content$data10.messageId
                  });
                },
                children: [/*#__PURE__*/_jsx(MsgThumbsUp, {
                  fill: reaction === 1,
                  width: "20px"
                }), /*#__PURE__*/_jsx("p", {
                  style: {
                    fontSize: '11px',
                    fontFamily: 'Mulish-bold',
                    color: "".concat(theme === null || theme === void 0 || (_theme$primary12 = theme.primary) === null || _theme$primary12 === void 0 ? void 0 : _theme$primary12.dark)
                  },
                  children: chatUi.positiveFeedbackText
                })]
              }), /*#__PURE__*/_jsx("div", {
                style: {
                  height: '32px',
                  width: '1px',
                  backgroundColor: theme === null || theme === void 0 || (_theme$primary13 = theme.primary) === null || _theme$primary13 === void 0 ? void 0 : _theme$primary13.main,
                  margin: '6px 0'
                }
              }), /*#__PURE__*/_jsxs("div", {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column'
                },
                onClick: function onClick() {
                  var _content$data11;
                  return feedbackHandler({
                    like: -1,
                    msgId: content === null || content === void 0 || (_content$data11 = content.data) === null || _content$data11 === void 0 ? void 0 : _content$data11.messageId
                  });
                },
                children: [/*#__PURE__*/_jsx(MsgThumbsDown, {
                  fill: reaction === -1,
                  width: "20px"
                }), /*#__PURE__*/_jsx("p", {
                  style: {
                    fontSize: '11px',
                    fontFamily: 'Mulish-bold',
                    color: "".concat(theme === null || theme === void 0 || (_theme$primary14 = theme.primary) === null || _theme$primary14 === void 0 ? void 0 : _theme$primary14.dark)
                  },
                  children: chatUi.negativeFeedbackText
                })]
              })]
            })
          })]
        })]
      });
    case 'image':
      {
        var _content$data12, _content$data13, _content$data14, _content$data15, _content$data16;
        var url = (content === null || content === void 0 || (_content$data12 = content.data) === null || _content$data12 === void 0 || (_content$data12 = _content$data12.payload) === null || _content$data12 === void 0 || (_content$data12 = _content$data12.media) === null || _content$data12 === void 0 ? void 0 : _content$data12.url) || (content === null || content === void 0 || (_content$data13 = content.data) === null || _content$data13 === void 0 ? void 0 : _content$data13.imageUrl);
        return /*#__PURE__*/_jsxs(_Fragment, {
          children: [(content === null || content === void 0 || (_content$data14 = content.data) === null || _content$data14 === void 0 ? void 0 : _content$data14.position) === 'left' && /*#__PURE__*/_jsx("div", {
            style: {
              width: '40px',
              marginRight: '4px',
              textAlign: 'center'
            }
          }), /*#__PURE__*/_jsx(Bubble, {
            type: "image",
            children: /*#__PURE__*/_jsxs("div", {
              style: {
                padding: '7px'
              },
              children: [/*#__PURE__*/_jsx(Img, {
                src: url,
                width: "299",
                height: "200",
                alt: "image",
                lazy: true,
                fluid: true
              }), /*#__PURE__*/_jsx("div", {
                style: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'self-end'
                },
                children: /*#__PURE__*/_jsx("span", {
                  style: {
                    color: themeColor.primaryColor.value,
                    fontSize: '10px'
                  },
                  children: moment((content === null || content === void 0 || (_content$data15 = content.data) === null || _content$data15 === void 0 ? void 0 : _content$data15.sentTimestamp) || (content === null || content === void 0 || (_content$data16 = content.data) === null || _content$data16 === void 0 ? void 0 : _content$data16.repliedTimestamp)).format('hh:mm A DD/MM/YYYY')
                })
              })]
            })
          })]
        });
      }
    case 'file':
      {
        var _content$data17, _content$data18, _content$data19, _content$data20, _content$data21;
        var _url = (content === null || content === void 0 || (_content$data17 = content.data) === null || _content$data17 === void 0 || (_content$data17 = _content$data17.payload) === null || _content$data17 === void 0 || (_content$data17 = _content$data17.media) === null || _content$data17 === void 0 ? void 0 : _content$data17.url) || (content === null || content === void 0 || (_content$data18 = content.data) === null || _content$data18 === void 0 ? void 0 : _content$data18.fileUrl);
        return /*#__PURE__*/_jsxs(_Fragment, {
          children: [(content === null || content === void 0 || (_content$data19 = content.data) === null || _content$data19 === void 0 ? void 0 : _content$data19.position) === 'left' && /*#__PURE__*/_jsx("div", {
            style: {
              width: '40px',
              marginRight: '4px',
              textAlign: 'center'
            }
          }), /*#__PURE__*/_jsx(Bubble, {
            type: "image",
            children: /*#__PURE__*/_jsxs("div", {
              style: {
                padding: '7px'
              },
              children: [/*#__PURE__*/_jsx(FileCard, {
                file: _url,
                extension: "pdf"
              }), /*#__PURE__*/_jsx("div", {
                style: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'self-end'
                },
                children: /*#__PURE__*/_jsx("span", {
                  style: {
                    color: themeColor.primaryColor.value,
                    fontSize: '10px'
                  },
                  children: moment((content === null || content === void 0 || (_content$data20 = content.data) === null || _content$data20 === void 0 ? void 0 : _content$data20.sentTimestamp) || (content === null || content === void 0 || (_content$data21 = content.data) === null || _content$data21 === void 0 ? void 0 : _content$data21.repliedTimestamp)).format('hh:mm A DD/MM/YYYY')
                })
              })]
            })
          })]
        });
      }
    case 'video':
      {
        var _content$data22, _content$data23, _content$data24, _content$data25;
        var _url2 = (content === null || content === void 0 || (_content$data22 = content.data) === null || _content$data22 === void 0 || (_content$data22 = _content$data22.payload) === null || _content$data22 === void 0 || (_content$data22 = _content$data22.media) === null || _content$data22 === void 0 ? void 0 : _content$data22.url) || (content === null || content === void 0 || (_content$data23 = content.data) === null || _content$data23 === void 0 ? void 0 : _content$data23.videoUrl);
        var videoId = _url2.split('=')[1];
        return /*#__PURE__*/_jsx(_Fragment, {
          children: /*#__PURE__*/_jsx(Bubble, {
            type: "image",
            children: /*#__PURE__*/_jsxs("div", {
              style: {
                padding: '7px'
              },
              children: [/*#__PURE__*/_jsx("iframe", {
                width: "100%",
                height: "fit-content",
                src: "https://www.youtube.com/embed/" + videoId,
                frameBorder: "0",
                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                allowFullScreen: true
              }), /*#__PURE__*/_jsx("div", {
                style: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'self-end'
                },
                children: /*#__PURE__*/_jsx("span", {
                  style: {
                    color: themeColor.primaryColor.value,
                    fontSize: '10px'
                  },
                  children: moment((content === null || content === void 0 || (_content$data24 = content.data) === null || _content$data24 === void 0 ? void 0 : _content$data24.sentTimestamp) || (content === null || content === void 0 || (_content$data25 = content.data) === null || _content$data25 === void 0 ? void 0 : _content$data25.repliedTimestamp)).format('hh:mm A DD/MM/YYYY')
                })
              })]
            })
          })
        });
      }
    case 'options':
      {
        var _content$data26, _content$data$payload, _content$data27, _content$data28;
        return /*#__PURE__*/_jsx(_Fragment, {
          children: /*#__PURE__*/_jsxs(Bubble, {
            type: "text",
            className: styles.textBubble,
            children: [/*#__PURE__*/_jsx("div", {
              style: {
                display: 'flex'
              },
              children: /*#__PURE__*/_jsx("span", {
                className: styles.optionsText,
                children: content === null || content === void 0 || (_content$data26 = content.data) === null || _content$data26 === void 0 || (_content$data26 = _content$data26.payload) === null || _content$data26 === void 0 ? void 0 : _content$data26.text
              })
            }), getLists({
              choices: (_content$data$payload = content === null || content === void 0 || (_content$data27 = content.data) === null || _content$data27 === void 0 || (_content$data27 = _content$data27.payload) === null || _content$data27 === void 0 ? void 0 : _content$data27.buttonChoices) !== null && _content$data$payload !== void 0 ? _content$data$payload : content === null || content === void 0 || (_content$data28 = content.data) === null || _content$data28 === void 0 ? void 0 : _content$data28.choices
            })]
          })
        });
      }
    case 'table':
      {
        var _content$data29, _JSON$parse, _content$data30, _theme$primary15, _JSON$parse2, _JSON$parse3, _JSON$parse4;
        return /*#__PURE__*/_jsxs("div", {
          style: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            maxWidth: '90vw'
          },
          children: [/*#__PURE__*/_jsx("div", {
            className: (content === null || content === void 0 || (_content$data29 = content.data) === null || _content$data29 === void 0 ? void 0 : _content$data29.position) === 'right' ? styles.messageTriangleRight : styles.messageTriangleLeft
          }), /*#__PURE__*/_jsxs(Bubble, {
            type: "text",
            children: [/*#__PURE__*/_jsx("div", {
              className: styles.tableContainer,
              children: /*#__PURE__*/_jsx(JsonToTable, {
                json: (_JSON$parse = JSON.parse(content === null || content === void 0 ? void 0 : content.text)) === null || _JSON$parse === void 0 ? void 0 : _JSON$parse.table
              })
            }), /*#__PURE__*/_jsxs("span", {
              style: {
                fontWeight: 600,
                fontSize: '1rem',
                color: (content === null || content === void 0 || (_content$data30 = content.data) === null || _content$data30 === void 0 ? void 0 : _content$data30.position) === 'right' ? theme === null || theme === void 0 || (_theme$primary15 = theme.primary) === null || _theme$primary15 === void 0 ? void 0 : _theme$primary15.main : themeColor.primaryColor.value
              },
              children: ["\n" + ((_JSON$parse2 = JSON.parse(content === null || content === void 0 ? void 0 : content.text)) === null || _JSON$parse2 === void 0 ? void 0 : _JSON$parse2.generalAdvice) + "\n\n" + ((_JSON$parse3 = JSON.parse(content === null || content === void 0 ? void 0 : content.text)) === null || _JSON$parse3 === void 0 ? void 0 : _JSON$parse3.buttonDescription), getLists({
                choices: (_JSON$parse4 = JSON.parse(content === null || content === void 0 ? void 0 : content.text)) === null || _JSON$parse4 === void 0 ? void 0 : _JSON$parse4.buttons
              })]
            })]
          })]
        });
      }
    default:
      return /*#__PURE__*/_jsx(ScrollView, {
        data: []
        // @ts-ignore
        ,
        renderItem: function renderItem(item) {
          return /*#__PURE__*/_jsx(Button, {
            label: item.text
          });
        }
      });
  }
};
export default MessageItem;