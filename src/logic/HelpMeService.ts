import {
  Client,
  MessageEvent,
  PostbackEvent,
  QuickReplyItem,
} from '@line/bot-sdk';
import { inject, injectable } from 'inversify';
import { DbService } from 'src/logic/DbService';
import { Status } from 'src/model/Status';
import { SubjectName } from 'src/model/SubjectName';
import { User, userBindingId } from 'src/model/User';
import { ItemGenerator } from 'src/util/ItemGenerator';

/**
 * Service class for help-me line bot.
 */
@injectable()
export class HelpMeService {
  @inject(Client)
  private readonly client!: Client;

  @inject(userBindingId)
  private readonly user!: User;

  @inject(DbService)
  private readonly dbService!: DbService;

  private step: string[] = [];
  private replyToken: string = '';

  public async messageReply(event: MessageEvent): Promise<void> {
    if (this.user.status === Status.WAITING_FOR_QUESTION) {
      if (event.message.type === 'text') {
        const questionId: string = await this.dbService.addQuestion(
          event.timestamp,
          event.message.text
        );
        await this.client.replyMessage(event.replyToken, {
          type: 'text',
          text: event.message.text,
          quickReply: {
            items: [
              ItemGenerator.quickReplyItem(
                '確定',
                '確定',
                `change_status::save_question::${questionId}`
              ),
              ItemGenerator.quickReplyItem('打錯了', '打錯了', `change_status::wrong_input::${questionId}`),
            ],
          },
        });
      }

      return;
    }
  }

  public async richMenuPostback(event: PostbackEvent): Promise<void> {
    this.step = event.postback.data.split('::');
    this.replyToken = event.replyToken;

    switch (this.step[0]) {
      case 'ask_question':
        if ((await this.checkStatus(event)) === false) {
          return;
        }
        await this.askQuestion();
        break;
      case 'change_status':
        await this.changeStatus();
        break;
      case 'nothing_to_do':
        break;
      default:
        if ((await this.checkStatus(event)) === false) {
          return;
        }
    }
  }

  private async changeStatus(): Promise<void> {
    switch (this.step[1]) {
      case 'save_question':
        await this.saveQuestion();
        break;
      case 'stop_process':
        await this.stopProcess();
        break;
      case 'wrong_input':
        await this.wrongInput();
        break;
      default:
    }
  }

  private async askQuestion(): Promise<void> {
    switch (this.step.length) {
      case 1: // first step
        await this.selectEducationalStage();
        break;
      case 2: // second step
        await this.askQuestionStep2();
        break;
      case 3: // third step
        await this.askQuestionStep3();
        break;
      default:
    }
  }

  private async askQuestionStep2(): Promise<void> {
    switch (this.step[1]) {
      case 'junior_high':
        await this.selectSubject('junior_high', [
          SubjectName.CHINESE_NO,
          SubjectName.ENGLISH_NO,
          SubjectName.MATH_NO,
          SubjectName.PHYSICS_AND_CHEMISTRY_NO,
        ]);
        break;
      case 'senior_high':
        await this.selectSubject('senior_high', [
          SubjectName.CHINESE_NO,
          SubjectName.ENGLISH_NO,
          SubjectName.MATH_NO,
          SubjectName.PHYSICS_NO,
          SubjectName.CHEMISTRY_NO,
        ]);
        break;
      default:
        await this.selectEducationalStage();
    }
  }

  private async askQuestionStep3(): Promise<void> {
    // ask for literal question
    await this.dbService.saveAttribute(
      this.user.userId,
      'status',
      Status.WAITING_FOR_QUESTION
    );
    await this.client.replyMessage(this.replyToken, {
      type: 'text',
      text: '請輸入您的問題',
    });
  }

  private async selectEducationalStage(): Promise<void> {
    await this.client.replyMessage(this.replyToken, {
      type: 'text',
      text: '請選擇國中、高中',
      quickReply: {
        items: [
          ItemGenerator.quickReplyItem(
            '國中',
            '國中',
            'ask_question::junior_high'
          ),
          ItemGenerator.quickReplyItem(
            '高中',
            '高中',
            'ask_question::senior_high'
          ),
        ],
      },
    });
  }

  private async selectSubject(
    grade: string,
    subjects: number[]
  ): Promise<void> {
    const items: QuickReplyItem[] = [];
    for (const num of subjects) {
      items.push(
        ItemGenerator.quickReplyItem(
          SubjectName.CHINESE_NAME[num],
          SubjectName.CHINESE_NAME[num],
          `ask_question::${grade}::${SubjectName.ENGLISH_NAME[num]}`
        )
      );
    }
    await this.client.replyMessage(this.replyToken, {
      type: 'text',
      text: '請選擇科目',
      quickReply: {
        items: items,
      },
    });
  }

  private async checkStatus(event: PostbackEvent): Promise<boolean> {
    if (this.user.status === Status.WAITING_FOR_QUESTION) {
      await this.client.replyMessage(event.replyToken, {
        type: 'text',
        text: '是否中斷輸入題目?',
        quickReply: {
          items: [
            ItemGenerator.quickReplyItem(
              '確定',
              '確定',
              'change_status::stop_process'
            ),
            ItemGenerator.quickReplyItem('取消', '取消', 'nothing_to_do'),
          ],
        },
      });

      return false;
    }

    return true;
  }

  private async saveQuestion(): Promise<void> {
    await this.dbService.saveAttribute(this.user.userId, 'status', Status.IDLE);
    await this.client.replyMessage(this.replyToken, {
      type: 'text',
      text: '已儲存!',
    });
  }

  private async stopProcess(): Promise<void> {
    await this.dbService.saveAttribute(this.user.userId, 'status', Status.IDLE);
    await this.client.replyMessage(this.replyToken, {
      type: 'text',
      text: '已中止。',
    });
  }

  private async wrongInput(): Promise<void> {
    await this.dbService.deleteQuestion(this.step[2]);
    await this.client.replyMessage(this.replyToken, {
      type: 'text',
      text: '請重新輸入。',
    });
  }
}
