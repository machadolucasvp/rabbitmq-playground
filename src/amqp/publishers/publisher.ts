import RabbitConnection, { Rabbit } from '../rabbit';

class Publisher {
  rabbit: Rabbit = RabbitConnection();

  async init(queues: string[]) {
    await this.rabbit.init();

    await this.rabbit.createChannel();

    await this.rabbit.createQueues(queues);
  }

  async publish(queue: string, payload: any, options?: any) {
    await this.rabbit.toQueue(queue, payload, options);
  }
}

export default new Publisher();
