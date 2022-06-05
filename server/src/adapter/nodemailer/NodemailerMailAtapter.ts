import { MailAdapter, SendMailData } from "../MailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9e921a4c795505",
    pass: "a09366217e6d1b"
  }
});

export class NodemailerMailAdatper implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Diego Fernandes <seyadeodin@gmail.com>',
      subject,
      html: body 
    })
  }
}