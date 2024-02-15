# Stencil Bot UI

This folder contains the Stencil Bot template.

# Requirements

[yarn](https://yarnpkg.com/getting-started/install)

# Setup and Installation
### Install using yarn
```
yarn
```
### Develop
```
yarn dev
```

# Features
- User-friendly ChatUI built on top of [ChatUI library](https://www.npmjs.com/package/@samagra-x/chatui)
- Supports message feedback (thumbs up / down), list buttons in message, image responses, video responses, chat history.
- Voice to Text feature can be used by passing a recorder component in `voiceToText` key of `Chat` component. (Sample recorder component provided in code)
- Uses socket based communication for seamless connectivity.
- Sample config file provided for providing colors throughout the app.
