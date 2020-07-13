import amqp from 'amqplib';

import Config from '../config';

class Rabbit {
  static instance: Rabbit;

  #channel: any;

  #connection: any;

  constructor() {
    amqp.connect(Config.AMPQ_URI)
      .then((connection) => this.#connection(connection));
  }

  async createChannel() {
    this.#channel = await this.#connection.createChannel();

    return this.#channel.prefetch(1);
  }

  async createQueue(queues: any[]) {
    return queues.map((queue: any) => this.#channel.assertQueue(queue));
  }

  async toQueue(queue: any, payload: any) {
    return this.#channel.sendToQueue(queue, Buffer.from(payload));
  }

  static buildPipeline(queues: any[]) {
    return this.getInstance().createChannel()
      .then((channel: any) => queues.forEach((queue) => {
        channel.assertQueue(queue);
      }));
  }

  static getInstance() {
    if (this.instance) return this.instance;

    this.instance = new Rabbit();
    return this.instance;
  }
}

export default Rabbit.getInstance;
