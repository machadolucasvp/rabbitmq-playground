import amqp, { Channel, Connection } from 'amqplib';

import Config from '../config';

class Rabbit {
  static instance: Rabbit;

  #channel?: Channel;

  #connection?: Connection;

  async init() {
    this.#connection = await amqp.connect(Config.AMPQ_URI);
    return this.#connection;
  }

  getChannel() {
    return this.#channel;
  }

  async createChannel() {
    this.#channel = await this.#connection?.createChannel();

    return this.#channel?.prefetch(1);
  }

  async createQueues(queues: string[]) {
    return queues.map((queue) => this.#channel?.assertQueue(queue));
  }

  async toQueue(queue: any, payload: any, options?: any) {
    return this.#channel?.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), options);
  }

  static getInstance() {
    if (this.instance) return this.instance;

    this.instance = new Rabbit();
    return this.instance;
  }
}

export default Rabbit.getInstance;
export { Rabbit };
