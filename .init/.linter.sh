#!/bin/bash
cd /home/kavia/workspace/code-generation/elegant-chat-application-45472-45603/chat_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

