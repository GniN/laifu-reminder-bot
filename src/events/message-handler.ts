import { Message } from 'discord.js';

import { EventHandler, TriggerHandler } from './index.js';

export class MessageHandler implements EventHandler {
    constructor(private triggerHandler: TriggerHandler) {}

    public async process(msg: Message): Promise<void> {
        // Don't respond to system messages or self
        if (msg.system || msg.author.id === msg.client.user?.id) {
            return;
        }

        if (msg.embeds[0]?.title === 'Case File Opened' && msg.reference) {
            // getting user id from profile img link
            const userId = msg.embeds[0].author.iconURL.split('/')[4]

            setTimeout(() => {
                let toSend = `<@${userId}> time to drop`;
                msg.channel.send(toSend);
            }, 6 * 60 * 1000);
        }

        // Process trigger
        await this.triggerHandler.process(msg);
    }
}
