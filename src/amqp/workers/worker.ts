import RabbitConnection, { Rabbit } from '../rabbit';
import Config from '../../config';

class Worker {
  rabbit: Rabbit = RabbitConnection();

  constructor() {
    this.init();
  }

  async init() {
    await this.rabbit.init();

    await this.rabbit.createChannel();

    await this.rabbit.createQueues(Config.QUEUES);
  }

  consume(queue: string) {
    this.rabbit.getChannel().consume(queue, (message: any) => {
      console.log('Receiving message', message);
    });
  }
}

export default new Worker();
