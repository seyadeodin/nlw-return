import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase"

// spies -> ensure our called functions run properly
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,RONALDOBRILHAMUITO',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })
  // in this unit test we're checking if our functionality can run without throwing an error
  // to do that we instantiate a mockup for our create and sendMail
  // we then told our test we expect it to resolve(be executed until the end) and not throw an error
  // what is it testing? the content of the function

  it('should not be able to submit a feedback without a type', async () => {

    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,RONALDOBRILHAMUITO',
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback without a commnet', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,RONALDOBRILHAMUITO',
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback without an invalid screenshot', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data%:image/png;base64,RONALDOBRILHAMUITO',
    })).rejects.toThrow();
  })

})