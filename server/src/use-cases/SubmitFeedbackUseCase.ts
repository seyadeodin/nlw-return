import { MailAdapter } from "../adapter/MailAdapter";
import { FeedbacksRepository } from "../repositories/FeedbacksRepository";

interface SubmiteFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmiteFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if(!type) {
      throw new Error('Type is required.');
    }

    if(!comment) {
      throw new Error('Comment is required.');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font size 16px; color: #111" >`,
        `<p> Tipo de feedback: ${type} </p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`
      ].join('\n')
    })
  }
}