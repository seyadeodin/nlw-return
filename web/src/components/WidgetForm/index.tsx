import { CloseButton } from "../CloseButton";

import bugImage from '../../assets/bug.svg'
import ideaImage from '../../assets/idea.svg'
import thoughtImage from '../../assets/thought.svg'
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";


export const feedbackTypes = {
  bug: {
    title: 'Problema',
    image: {
      source: bugImage,
      alt: 'Inseto'
    }
  },
  idea: {
    title: 'Ideia',
    image: {
      source: ideaImage,
      alt: 'Lâmpada'
    }
  },
  other: {
    title: 'Outro',
    image: {
      source: thoughtImage,
      alt: 'Balão de pensamento'
    }
  }
}

/*
Object.entries(feedbackTypes) =>
[
  ['bug', {...}],
  ['idea', {...}],
  ['other', {...}],
]
*/

export type FeedbackType = keyof typeof feedbackTypes;

export  function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback(){
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  function handleSendFeedback(){
    setFeedbackSent(true)
  }

  return(
    <div className="bg-zinc-900 p-4 relatived rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      { feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
      !feedbackType ? (
        <FeedbackTypeStep onFeedbackTypeChange={setFeedbackType}/> )
        : (
        <FeedbackContentStep 
          feedbackType={feedbackType}
          onFeedbackRestartRequest={handleRestartFeedback}
          onFeedbackSent={handleSendFeedback} 
        />
        ) 
      )}
      <footer className="test xs text-neutral-400">
        Feito com ❤️ por <a className="underline underline-offset-1" href="https://github.com/seyadeodin">Lucas</a>
      </footer>
    </div>
  )
}