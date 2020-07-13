import RabbitConnection, { Rabbit } from '../rabbit';
import Config from '../../config';

export class Publisher {
  rabbit: Rabbit = RabbitConnection();

  constructor() {
    this.init();
  }

  async init() {
    await this.rabbit.init();

    await this.rabbit.createChannel();

    await this.rabbit.createQueues(Config.QUEUES);
  }

  async publish(queue: string, payload: any) {
    try {
      await this.rabbit.toQueue(queue, payload);
    } catch (err) {
      console.log('Publish failed');
    }
  }
}

export default new Publisher();
