import RabbitConnection, { Rabbit } from '../rabbit';

class Worker {
  rabbit: Rabbit = RabbitConnection();

  async init(queues: string[]) {
    await this.rabbit.init();

    await this.rabbit.createChannel();

    await this.rabbit.createQueues(queues);

    queues.forEach((queue) => this.listenTo(queue));
  }

  listenTo(routingKey: string, options?: Object) {
    this.rabbit.getChannel()?.consume(routingKey, this.handleMessage.bind(this), options);
  }

  handleMessage(message: any) {
    console.log('Received', JSON.parse(message.content));

    this.rabbit.getChannel()?.ack(message);
  }
}

export default new Worker();
