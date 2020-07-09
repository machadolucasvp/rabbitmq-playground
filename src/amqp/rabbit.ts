import amqp from 'amqplib';

import Config from '../config';

class Rabbit {
  static instance: Rabbit;

  #connection: any;

  #channel: any;

  constructor() {
    amqp.connect(Config.AMPQ_URI)
      .then((connection) => this.#connection(connection));
  }

  createChannel() {
    this.#channel = this.#connection.createChannel();

    return this.#channel;
  }

  createQueue(queues: any[]) {
    return queues.map((queue: any) => this.#channel.assertQueue(queue));
  }

  toQueue(queue: any, payload: any) {
    return this.#channel.sendToQueue(queue, Buffer.from(payload));
  }

  static buildPipeline(queues: any[]) {
    this.getInstance().createChannel()
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
