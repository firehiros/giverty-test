import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as hbs from 'handlebars';
import { join } from 'path';

export interface MailParams {
  mailTo: string;
  contentHtml: string;
  subject: string;
}

export interface RenderHtmlParams {
  type: string;
  data: any;
}

@Injectable()
export class SendEmailService {
  private fromEmail: string;

  constructor() {
    // aws.config.credentials = {
    //   accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
    //   secretAccessKey: AWS_CONFIG.SECRET_KEY,
    // };
    // this.fromEmail = AWS_SES.FROM_EMAIL;
  }

  public sendMail(params: MailParams) {
    // aws.config.update({
    //   region: AWS_CONFIG.AWS_MAIL_REGION,
    // });
    // const { mailTo, contentHtml, subject } = params;
    // const sendMailParams = {
    //   Destination: {
    //     ToAddresses: [mailTo],
    //   },
    //   Message: {
    //     Body: {
    //       Html: {
    //         Charset: 'UTF-8',
    //         Data: contentHtml,
    //       },
    //     },
    //     Subject: {
    //       Charset: 'UTF-8',
    //       Data: subject,
    //     },
    //   },
    //   Source: this.fromEmail,
    // };
    // return new aws.SES().sendEmail(sendMailParams).promise();
  }

  _render(data: RenderHtmlParams) {
    const filePath = join(`${process.cwd()}/src/templates`, `${data.type}.hbs`);
    const source = fs.readFileSync(filePath, 'utf8').toString();
    const template = hbs.compile(source);
    const output = template(data.data);

    return output;
  }

  async sendEmailWithRenderedContent({
    type,
    mailTo,
    subject,
    data,
  }: {
    type: string;
    mailTo: string;
    subject: string;
    data: Record<string, any>;
  }) {
    const contentHtml = this._render({ type, data });

    return this.sendMail({
      mailTo,
      subject,
      contentHtml,
    });
  }
}
