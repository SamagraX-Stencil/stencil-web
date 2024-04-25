import { OpenAI } from "openai";
import {  createAI, getMutableAIState, render } from "ai/rsc";
// import MessageItem from "../../message-item";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const submitMessage = async (message: string) => {
    'use server';
    const aiState = getMutableAIState<typeof AI>();

    aiState.update([
        ...aiState.get(),
        {
            role:"user",
            content:message
        }
    ]);

    const ui = render({
        model:'gpt-4-0125-preview',
        provider:openai,
        messages:aiState.get(),
        text:({content,done}) =>{
            if (done) {
                aiState.done([
                  ...aiState.get(),
                  {
                    role: "assistant",
                    content
                  }
                ]);
            }
            console.log("content: ",content);   
            return content;
        }
    })
    return {
        id:Date.now(),
        display:ui
    }
}

export const AI = createAI({
    actions: {
      submitMessage
    }
  });