"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var _stylesModule = _interopRequireDefault(require("./styles.module.css"));
var _reactHotToast = _interopRequireDefault(require("react-hot-toast"));
var _hooks = require("@repo/hooks");
var _recordController = _interopRequireDefault(require("./record-controller"));
var _jsxRuntime = require("react/jsx-runtime");
var VoiceRecorder = function VoiceRecorder(_ref) {
  var setInputMsg = _ref.setInputMsg,
    tapToSpeak = _ref.tapToSpeak,
    _ref$includeDiv = _ref.includeDiv,
    includeDiv = _ref$includeDiv === void 0 ? false : _ref$includeDiv;
  var config = (0, _hooks.useUiConfig)('component', 'voiceRecorder');
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    mediaRecorder = _useState2[0],
    setMediaRecorder = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    isErrorClicked = _useState4[0],
    setIsErrorClicked = _useState4[1];
  var _useState5 = (0, _react.useState)('idle'),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    recorderStatus = _useState6[0],
    setRecorderStatus = _useState6[1];
  var voiceMinDecibels = config.voiceMinDecibels;
  var delayBetweenDialogs = config.delayBetweenDialogs;
  var dialogMaxLength = config.dialogMaxLength;
  var _useState7 = (0, _react.useState)(config.isRecording),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    isRecording = _useState8[0],
    setIsRecording = _useState8[1];
  var startRecording = function startRecording() {
    if (!isRecording) {
      setIsRecording(true);
      record();
    }
  };
  var stopRecording = function stopRecording() {
    if (isRecording) {
      if (mediaRecorder !== null) {
        mediaRecorder.stop();
        setIsRecording(false);
        setMediaRecorder(null);
      }
    }
  };
  function record() {
    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then(function (stream) {
      var _window2;
      //start recording:
      var recorder = new MediaRecorder(stream);
      recorder.start();
      setMediaRecorder(recorder);

      //save audio chunks:
      var audioChunks = [];
      recorder.addEventListener('dataavailable', function (event) {
        audioChunks.push(event.data);
      });

      //analysis:
      var audioContext = new AudioContext();
      var audioStreamSource = audioContext.createMediaStreamSource(stream);
      var analyser = audioContext.createAnalyser();
      analyser.minDecibels = voiceMinDecibels;
      audioStreamSource.connect(analyser);
      var bufferLength = analyser.frequencyBinCount;
      var domainData = new Uint8Array(bufferLength);

      //loop:
      var time = new Date();
      var startTime;
      var lastDetectedTime = time.getTime();
      var anySoundDetected = false;
      var detectSound = function detectSound() {
        var _window;
        //recording stopped by user:
        if (!isRecording) return;
        time = new Date();
        var currentTime = time.getTime();

        //time out:
        if (currentTime > startTime + dialogMaxLength) {
          recorder.stop();
          return;
        }

        //a dialog detected:
        if (anySoundDetected === true && currentTime > lastDetectedTime + delayBetweenDialogs) {
          recorder.stop();
          return;
        }

        //check for detection:
        analyser.getByteFrequencyData(domainData);
        for (var i = 0; i < bufferLength; i++) if (domainData[i] > 0) {
          anySoundDetected = true;
          time = new Date();
          lastDetectedTime = time.getTime();
        }

        //continue the loop:
        (_window = window) === null || _window === void 0 || _window.requestAnimationFrame(detectSound);
      };
      (_window2 = window) === null || _window2 === void 0 || _window2.requestAnimationFrame(detectSound);

      //stop event:
      recorder.addEventListener('stop', function () {
        //stop all the tracks:
        stream.getTracks().forEach(function (track) {
          return track.stop();
        });
        if (!anySoundDetected) return;

        //send to server:
        var audioBlob = new Blob(audioChunks, {
          type: 'audio/mp3'
        });
        makeComputeAPICall(audioBlob);
      });
    });
  }
  var makeComputeAPICall = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(blob) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            try {
              setRecorderStatus('processing');
              _reactHotToast.default.success("".concat(config.waitMessage));
              // Define the API endpoint and make api call here
              if (blob) {
                //set api result in setInputMsg
                setInputMsg('');
              }
            } catch (error) {
              console.error(error);
              setRecorderStatus('error');
              _reactHotToast.default.error("".concat(config.recorderErrorMessage));
              // Set isErrorClicked to true when an error occurs
              setIsErrorClicked(false);
              setTimeout(function () {
                // Check if the user has not clicked the error icon again
                if (!isErrorClicked) {
                  setRecorderStatus('idle');
                }
              }, 2500);
            }
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function makeComputeAPICall(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: mediaRecorder && mediaRecorder.state === 'recording' ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _stylesModule.default.center,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_recordController.default, {
          status: 'recording',
          onClick: stopRecording,
          includeDiv: includeDiv
        })
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _stylesModule.default.center,
        children: recorderStatus === 'processing' ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_recordController.default, {
            status: 'processing',
            onClick: function onClick() {}
          })
        }) : recorderStatus === 'error' ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_recordController.default, {
            status: 'error',
            onClick: function onClick() {
              setIsErrorClicked(true);
              startRecording();
            },
            includeDiv: includeDiv
          })
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_recordController.default, {
            status: 'start',
            onClick: function onClick() {
              setIsErrorClicked(true);
              startRecording();
            },
            includeDiv: includeDiv,
            tapToSpeak: tapToSpeak
          })
        })
      })
    })
  });
};
var _default = exports.default = VoiceRecorder;