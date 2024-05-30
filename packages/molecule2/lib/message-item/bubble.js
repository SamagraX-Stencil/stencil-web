"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdatedBubble = void 0;
var _stencilChatui = require("stencil-chatui");
var _moment = _interopRequireDefault(require("moment"));
var _jsonToTable = require("../json-to-table");
var _jsxRuntime = require("react/jsx-runtime");
var UpdatedBubble = exports.UpdatedBubble = function UpdatedBubble(_ref) {
  var _content$data, _theme$primary, _content$data2, _theme$primary2, _content$data3, _theme$primary3, _content$data4, _content$data5, _content$data6, _theme$primary4, _content$data7, _content$data8, _theme$primary5, _theme$primary6, _theme$primary7, _theme$primary8, _theme$primary9, _theme$primary10, _theme$primary11;
  var message = _ref.message,
    themeColor = _ref.themeColor,
    chatUi = _ref.chatUi,
    theme = _ref.theme,
    handleAudio = _ref.handleAudio,
    feedbackHandler = _ref.feedbackHandler,
    SpeakerIcon = _ref.SpeakerIcon,
    MsgThumbsUp = _ref.MsgThumbsUp,
    MsgThumbsDown = _ref.MsgThumbsDown,
    offlineBtnsStyle = _ref.offlineBtnsStyle,
    messageSpeakerStyle = _ref.messageSpeakerStyle,
    tableContinerStyle = _ref.tableContinerStyle,
    messageTriangleLeftStyle = _ref.messageTriangleLeftStyle,
    messageTriangleRightStyle = _ref.messageTriangleRightStyle,
    optionsTextStyle = _ref.optionsTextStyle,
    textBubbleStyle = _ref.textBubbleStyle,
    msgFeedbackIconsStyle = _ref.msgFeedbackIconsStyle,
    msgFeedbackStyle = _ref.msgFeedbackStyle,
    getLists = _ref.getLists,
    reaction = _ref.reaction;
  var content = message.content,
    type = message.type;
  switch (type) {
    case 'loader':
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_stencilChatui.Typing, {});
    case 'text':
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          maxWidth: '90vw'
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_stencilChatui.Bubble, {
          type: "text",
          style: (content === null || content === void 0 || (_content$data = content.data) === null || _content$data === void 0 ? void 0 : _content$data.position) === 'right' ? {
            background: theme === null || theme === void 0 || (_theme$primary = theme.primary) === null || _theme$primary === void 0 ? void 0 : _theme$primary.main,
            borderRadius: '10px 10px 0 25px',
            boxShadow: '0 3px 8px rgba(0,0,0,.24)'
          } : {
            background: themeColor.primaryColor.value,
            borderRadius: '10px 10px 10px 0',
            boxShadow: '0 3px 8px rgba(0,0,0,.24)'
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
            style: {
              fontWeight: 600,
              fontSize: '1rem',
              color: (content === null || content === void 0 || (_content$data2 = content.data) === null || _content$data2 === void 0 ? void 0 : _content$data2.position) === 'right' ? themeColor.primaryColor.value : theme === null || theme === void 0 || (_theme$primary2 = theme.primary) === null || _theme$primary2 === void 0 ? void 0 : _theme$primary2.main
            },
            children: [content === null || content === void 0 ? void 0 : content.text, ' ']
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              display: 'flex',
              justifyContent: 'flex-end'
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                color: (content === null || content === void 0 || (_content$data3 = content.data) === null || _content$data3 === void 0 ? void 0 : _content$data3.position) === 'right' ? themeColor.primaryColor.value : theme === null || theme === void 0 || (_theme$primary3 = theme.primary) === null || _theme$primary3 === void 0 ? void 0 : _theme$primary3.main,
                fontSize: '10px'
              },
              children: (0, _moment.default)((content === null || content === void 0 || (_content$data4 = content.data) === null || _content$data4 === void 0 ? void 0 : _content$data4.sentTimestamp) || (content === null || content === void 0 || (_content$data5 = content.data) === null || _content$data5 === void 0 ? void 0 : _content$data5.repliedTimestamp)).format('hh:mm A DD/MM/YYYY')
            })
          })]
        }), content !== null && content !== void 0 && (_content$data6 = content.data) !== null && _content$data6 !== void 0 && _content$data6.btns ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: offlineBtnsStyle,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: function onClick() {
              var _window;
              return (_window = window) === null || _window === void 0 || (_window = _window.location) === null || _window === void 0 ? void 0 : _window.reload();
            },
            style: {
              border: "2px solid ".concat(theme === null || theme === void 0 || (_theme$primary4 = theme.primary) === null || _theme$primary4 === void 0 ? void 0 : _theme$primary4.main)
            },
            children: "Refresh"
          })
        }) : (content === null || content === void 0 || (_content$data7 = content.data) === null || _content$data7 === void 0 ? void 0 : _content$data7.position) === 'left' && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: 'flex',
            position: 'relative',
            top: '-10px',
            justifyContent: 'space-between'
          },
          children: [chatUi.allowTextToSpeech && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              display: 'flex'
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: messageSpeakerStyle,
              onClick: handleAudio,
              style: !(content !== null && content !== void 0 && (_content$data8 = content.data) !== null && _content$data8 !== void 0 && _content$data8.isEnd) ? {
                pointerEvents: 'none',
                filter: 'grayscale(100%)',
                opacity: '0.5',
                border: "1px solid ".concat(theme === null || theme === void 0 || (_theme$primary5 = theme.primary) === null || _theme$primary5 === void 0 ? void 0 : _theme$primary5.main)
              } : {
                pointerEvents: 'auto',
                opacity: '1',
                filter: 'grayscale(0%)',
                border: "1px solid ".concat(theme === null || theme === void 0 || (_theme$primary6 = theme.primary) === null || _theme$primary6 === void 0 ? void 0 : _theme$primary6.main)
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                src: SpeakerIcon,
                width: 15,
                height: 15,
                alt: ""
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                style: {
                  fontSize: '11px',
                  // color: config.theme.primaryColor.value,
                  fontFamily: 'Mulish-bold',
                  display: 'flex',
                  alignItems: 'flex-end',
                  marginRight: '1px',
                  padding: '0 5px',
                  color: "".concat(theme === null || theme === void 0 || (_theme$primary7 = theme.primary) === null || _theme$primary7 === void 0 ? void 0 : _theme$primary7.dark)
                },
                children: chatUi.textToSpeechLabel
              })]
            })
          }), chatUi.allowFeedback && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: msgFeedbackStyle,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: msgFeedbackIconsStyle,
              style: {
                border: "1px solid ".concat(theme === null || theme === void 0 || (_theme$primary8 = theme.primary) === null || _theme$primary8 === void 0 ? void 0 : _theme$primary8.main)
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  paddingRight: '6px'
                },
                onClick: function onClick() {
                  var _content$data9;
                  return feedbackHandler({
                    like: 1,
                    msgId: content === null || content === void 0 || (_content$data9 = content.data) === null || _content$data9 === void 0 ? void 0 : _content$data9.messageId
                  });
                },
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(MsgThumbsUp, {
                  fill: reaction === 1,
                  width: "20px"
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                  style: {
                    fontSize: '11px',
                    fontFamily: 'Mulish-bold',
                    color: "".concat(theme === null || theme === void 0 || (_theme$primary9 = theme.primary) === null || _theme$primary9 === void 0 ? void 0 : _theme$primary9.dark)
                  },
                  children: chatUi.positiveFeedbackText
                })]
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  height: '32px',
                  width: '1px',
                  backgroundColor: theme === null || theme === void 0 || (_theme$primary10 = theme.primary) === null || _theme$primary10 === void 0 ? void 0 : _theme$primary10.main,
                  margin: '6px 0'
                }
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column'
                },
                onClick: function onClick() {
                  var _content$data10;
                  return feedbackHandler({
                    like: -1,
                    msgId: content === null || content === void 0 || (_content$data10 = content.data) === null || _content$data10 === void 0 ? void 0 : _content$data10.messageId
                  });
                },
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(MsgThumbsDown, {
                  fill: reaction === -1,
                  width: "20px"
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                  style: {
                    fontSize: '11px',
                    fontFamily: 'Mulish-bold',
                    color: "".concat(theme === null || theme === void 0 || (_theme$primary11 = theme.primary) === null || _theme$primary11 === void 0 ? void 0 : _theme$primary11.dark)
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
        var _content$data11, _content$data12;
        var url = (content === null || content === void 0 || (_content$data11 = content.data) === null || _content$data11 === void 0 || (_content$data11 = _content$data11.payload) === null || _content$data11 === void 0 || (_content$data11 = _content$data11.media) === null || _content$data11 === void 0 ? void 0 : _content$data11.url) || (content === null || content === void 0 || (_content$data12 = content.data) === null || _content$data12 === void 0 ? void 0 : _content$data12.imageUrl);
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(MediaBubble, {
          content: content,
          themeColor: themeColor,
          isFile: false
        });
      }
    case 'file':
      {
        var _content$data13, _content$data14;
        var _url = (content === null || content === void 0 || (_content$data13 = content.data) === null || _content$data13 === void 0 || (_content$data13 = _content$data13.payload) === null || _content$data13 === void 0 || (_content$data13 = _content$data13.media) === null || _content$data13 === void 0 ? void 0 : _content$data13.url) || (content === null || content === void 0 || (_content$data14 = content.data) === null || _content$data14 === void 0 ? void 0 : _content$data14.fileUrl);
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(MediaBubble, {
          content: content,
          themeColor: themeColor,
          isFile: true
        });
      }
    case 'video':
      {
        var _content$data15, _content$data16, _content$data17, _content$data18;
        var _url2 = (content === null || content === void 0 || (_content$data15 = content.data) === null || _content$data15 === void 0 || (_content$data15 = _content$data15.payload) === null || _content$data15 === void 0 || (_content$data15 = _content$data15.media) === null || _content$data15 === void 0 ? void 0 : _content$data15.url) || (content === null || content === void 0 || (_content$data16 = content.data) === null || _content$data16 === void 0 ? void 0 : _content$data16.videoUrl);
        var videoId = _url2.split('=')[1];
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_stencilChatui.Bubble, {
            type: "image",
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              style: {
                padding: '7px'
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("iframe", {
                width: "100%",
                height: "fit-content",
                src: "https://www.youtube.com/embed/" + videoId,
                frameBorder: "0",
                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                allowFullScreen: true
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'self-end'
                },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                  style: {
                    color: themeColor.primaryColor.value,
                    fontSize: '10px'
                  },
                  children: (0, _moment.default)((content === null || content === void 0 || (_content$data17 = content.data) === null || _content$data17 === void 0 ? void 0 : _content$data17.sentTimestamp) || (content === null || content === void 0 || (_content$data18 = content.data) === null || _content$data18 === void 0 ? void 0 : _content$data18.repliedTimestamp)).format('hh:mm A DD/MM/YYYY')
                })
              })]
            })
          })
        });
      }
    case 'options':
      {
        var _content$data19, _content$data$payload, _content$data20, _content$data21;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_stencilChatui.Bubble, {
            type: "text",
            className: textBubbleStyle,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                display: 'flex'
              },
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: optionsTextStyle,
                children: content === null || content === void 0 || (_content$data19 = content.data) === null || _content$data19 === void 0 || (_content$data19 = _content$data19.payload) === null || _content$data19 === void 0 ? void 0 : _content$data19.text
              })
            }), getLists({
              choices: (_content$data$payload = content === null || content === void 0 || (_content$data20 = content.data) === null || _content$data20 === void 0 || (_content$data20 = _content$data20.payload) === null || _content$data20 === void 0 ? void 0 : _content$data20.buttonChoices) !== null && _content$data$payload !== void 0 ? _content$data$payload : content === null || content === void 0 || (_content$data21 = content.data) === null || _content$data21 === void 0 ? void 0 : _content$data21.choices
            })]
          })
        });
      }
    case 'table':
      {
        var _content$data22, _JSON$parse, _content$data23, _theme$primary12, _JSON$parse2, _JSON$parse3, _JSON$parse4;
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            maxWidth: '90vw'
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: (content === null || content === void 0 || (_content$data22 = content.data) === null || _content$data22 === void 0 ? void 0 : _content$data22.position) === 'right' ? messageTriangleRightStyle : messageTriangleLeftStyle
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_stencilChatui.Bubble, {
            type: "text",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: tableContinerStyle,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsonToTable.JsonToTable, {
                json: (_JSON$parse = JSON.parse(content === null || content === void 0 ? void 0 : content.text)) === null || _JSON$parse === void 0 ? void 0 : _JSON$parse.table
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
              style: {
                fontWeight: 600,
                fontSize: '1rem',
                color: (content === null || content === void 0 || (_content$data23 = content.data) === null || _content$data23 === void 0 ? void 0 : _content$data23.position) === 'right' ? theme === null || theme === void 0 || (_theme$primary12 = theme.primary) === null || _theme$primary12 === void 0 ? void 0 : _theme$primary12.main : themeColor.primaryColor.value
              },
              children: ["\n" + ((_JSON$parse2 = JSON.parse(content === null || content === void 0 ? void 0 : content.text)) === null || _JSON$parse2 === void 0 ? void 0 : _JSON$parse2.generalAdvice) + "\n\n" + ((_JSON$parse3 = JSON.parse(content === null || content === void 0 ? void 0 : content.text)) === null || _JSON$parse3 === void 0 ? void 0 : _JSON$parse3.buttonDescription), getLists({
                choices: (_JSON$parse4 = JSON.parse(content === null || content === void 0 ? void 0 : content.text)) === null || _JSON$parse4 === void 0 ? void 0 : _JSON$parse4.buttons
              })]
            })]
          })]
        });
      }
    default:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_stencilChatui.ScrollView, {
        data: []
        // @ts-ignore
        ,
        renderItem: function renderItem(item) {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(Button, {
            label: item.text
          });
        }
      });
  }
};
var MediaBubble = function MediaBubble(_ref2) {
  var _content$data24, _content$data25, _content$data26, _content$data27, _content$data28, _content$data29, _content$data30;
  var content = _ref2.content,
    themeColor = _ref2.themeColor,
    isFile = _ref2.isFile;
  var url = isFile ? (content === null || content === void 0 || (_content$data24 = content.data) === null || _content$data24 === void 0 || (_content$data24 = _content$data24.payload) === null || _content$data24 === void 0 || (_content$data24 = _content$data24.media) === null || _content$data24 === void 0 ? void 0 : _content$data24.url) || (content === null || content === void 0 || (_content$data25 = content.data) === null || _content$data25 === void 0 ? void 0 : _content$data25.fileUrl) : (content === null || content === void 0 || (_content$data26 = content.data) === null || _content$data26 === void 0 || (_content$data26 = _content$data26.payload) === null || _content$data26 === void 0 || (_content$data26 = _content$data26.media) === null || _content$data26 === void 0 ? void 0 : _content$data26.url) || (content === null || content === void 0 || (_content$data27 = content.data) === null || _content$data27 === void 0 ? void 0 : _content$data27.imageUrl);
  var renderMedia = function renderMedia() {
    if (isFile) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_stencilChatui.FileCard, {
        file: url,
        extension: "pdf"
      });
    } else {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_stencilChatui.Image, {
        src: url,
        width: "299",
        height: "200",
        alt: "image",
        lazy: true,
        fluid: true
      });
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [(content === null || content === void 0 || (_content$data28 = content.data) === null || _content$data28 === void 0 ? void 0 : _content$data28.position) === 'left' && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        width: '40px',
        marginRight: '4px',
        textAlign: 'center'
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_stencilChatui.Bubble, {
      type: "image",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          padding: '7px'
        },
        children: [renderMedia(), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'self-end'
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              color: themeColor.primaryColor.value,
              fontSize: '10px'
            },
            children: (0, _moment.default)((content === null || content === void 0 || (_content$data29 = content.data) === null || _content$data29 === void 0 ? void 0 : _content$data29.sentTimestamp) || (content === null || content === void 0 || (_content$data30 = content.data) === null || _content$data30 === void 0 ? void 0 : _content$data30.repliedTimestamp)).format('hh:mm A DD/MM/YYYY')
          })
        })]
      })
    })]
  });
};