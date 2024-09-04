# Sockets

## Overview

This document provides an overview of the socket connection implementation used in this project. It details the packages used, how they are configured, and how the socket connection is managed within the application.

## Introduction

The `socket-package` manages the socket connections in the application, providing functionalities to connect, disconnect, send, and receive messages. This is done using a `ContextProvider ` component that sets up and manages the socket connection, providing it to the rest of the application through React's context API.

## Packages Used

[samagra-x/xmessage](https://www.npmjs.com/package/@samagra-x/xmessage): A package for handling messaging.
[socket-package](https://www.npmjs.com/package/socket-package): A custom package for managing socket connections.

## Creating a New Socket Instance

In the provided code, a new Socket instance is created to establish a WebSocket connection for real-time communication. This instance is responsible for sending and receiving messages.

```typescript

       new UCI(
         URL,
         {
           transportOptions: {
             polling: {
               extraHeaders: {

                 channel: '',
               },
             },
           },
           path:'',
           query: {
             deviceId:'',
           },
           autoConnect: false,
           transports: ['polling', 'websocket'],
           upgrade: true,
         },
         onMessageReceived
       )
     );
   }

```

## Handling Messages

### Sending Messages

Once the Socket instance is created, you can use the sendMessage function to send messages to the WebSocket server. This function takes a message object conforming to the XMessage interface.

```typescript
const sendMessage = useCallback(() => {
  socket.sendMessage();
}, []);
```

## Receiving Messages

The `onMessageReceived` callback processes incoming messages and updates the chat state based on the message type (TEXT, AUDIO, IMAGE, etc.).
