import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from ".."
import { api } from "../../../lib/axios";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface  FeedbackContentProps{
  feedbackType: FeedbackType;
  onFeedbackRestartRequest: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequest, onFeedbackSent }: FeedbackContentProps){
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedback(event: FormEvent){
    event.preventDefault();
    
    console.log({
      screenshot,
      comment
    })
    try{
      setIsSendingFeedback(true)
      const response = await api.post('/feedbacks', {
        type: feedbackType,
        comment,
        screenshot
      }) 
      
      console.log(response.status)
      onFeedbackSent();
    } catch(error) {
      console.log(error);
    } finally{
      setIsSendingFeedback(false)
    }


  }

  return(
    <>
      <header>
        <button 
          type="button"
          className="top=5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={() => onFeedbackRestartRequest()}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex itens-center gap-2">
          <img 
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton/>
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px]  w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:rin g-1 resize-none p-2 focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={event => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            onScreenshotTaken={setScreenshot}
            screenshot={screenshot}
          />
          <button
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:bg-brand-500"
            disabled={comment.length === 0 || isSendingFeedback}
          >
            {isSendingFeedback ? <Loading/> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}