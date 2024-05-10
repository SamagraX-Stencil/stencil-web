<h1 align="center">
    <img width="109" height="28" src="https://gw.alicdn.com/tfs/TB1uYH4QoY1gK0jSZFMXXaWcVXa-218-56.svg" alt="ChatUI">
</h1>

<p align="center">The UI design language and React library for Conversational UI</p>

<div align="center">

[![LICENSE](https://img.shields.io/npm/l/chatui-package?style=flat-square)](https://github.com/Samagra-Development/ChatUI/blob/next/LICENSE) [![NPM version](https://img.shields.io/npm/v/chatui-package?style=flat-square)](https://www.npmjs.com/package/chatui-package)

</div>

## Features

- 😎 **Best Practices**: The best practice for chat interaction based on our experience of Alime Chatbot
- 🛡 **TypeScript**: Written in TypeScript with predictable static types
- 📱 **Responsive**: Responsive design to adapt automatically to whatever device
- ♿ **Accessibility**: Accessibility support and get the certification from Accessibility Research Association
- 🎨 **Theming**: Powerful theme customization in every detail
- 🌍 **International**: Internationalization support for dozens of languages

## Environment Support

- Modern browsers (support [CSS Variables](https://caniuse.com/css-variables))
- Internet Explorer 11 (with [polyfills](https://stackoverflow.com/questions/57020976/polyfills-in-2019-for-ie11) and [CSS Variables Polyfill](https://github.com/nuxodin/ie11CustomProperties) / [css-vars-ponyfill](https://github.com/jhildenbiddle/css-vars-ponyfill))

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" /><br>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /><br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /><br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /><br>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" /><br>iOS Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/android-webview/android-webview_48x48.png" alt="Android WebView" width="24px" height="24px" /><br>Android WebView |
| --- | --- | --- | --- | --- | --- |
| 16+ | 31+ | 49+ | 9.1+ | 9.3+ | 6+ |

## Install

```bash
npm install chatui-package
```

```bash
yarn add chatui-package
```

## Usage

```jsx
import Chat, { Bubble, useMessages } from 'chatui-package';
import 'chatui-package/dist/index.css';

const App = () => {
  const { messages, appendMsg, setTyping } = useMessages([]);

  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTyping(true);

      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: 'Bala bala' },
        });
      }, 1000);
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <Chat
      navbar={{ title: 'Assistant' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
};
```

[![DEMO](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/chatui-demo-o6n3z?fontsize=14&hidenavigation=1&theme=dark)

### Development

```bash
cd storybook
npm i
npm run storybook
```

## License

MIT
