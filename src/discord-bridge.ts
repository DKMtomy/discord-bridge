import axios, { type AxiosInstance } from "axios";

export interface DiscordWebhookConfig {
  url: string;
}

interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

interface EmbedFooter {
  text: string;
  icon_url?: string;
}

interface EmbedAuthor {
  name: string;
  url?: string;
  icon_url?: string;
}

interface Embed {
  title: string;
  description: string;
  color: number;
  fields?: Array<EmbedField>;
  footer?: EmbedFooter;
  author?: EmbedAuthor;
}

interface WebhookPayload {
  embeds: Array<Embed>;
}

export enum EventType {
  JOIN = "Joined",
  CHAT = "Chat",
  LEAVE = "Left",
}

export class DiscordBridge {
  private readonly webhookClient: AxiosInstance;
  private readonly webhookUrl: string;

  constructor(webhookConfig: DiscordWebhookConfig) {
    this.webhookClient = axios.create();
    this.webhookUrl = webhookConfig.url;
  }

  private async sendWebhookMessage(payload: WebhookPayload): Promise<void> {
    try {
      await this.webhookClient.post(this.webhookUrl, payload);
    } catch (reason) {
      console.error("Error sending webhook message:", reason);
    }
  }

  public async sendMessage(
    eventType: EventType,
    username: string,
    message?: string
  ): Promise<void> {
    const embed: Embed = {
      title: `${eventType} Server`,
      description: message
        ? `${username}: ${message}`
        : `${username} has ${eventType.toLowerCase()} the server.`,
      color: this.getEventColor(eventType),
    };

    await this.sendWebhookMessage({ embeds: [embed] });
  }

  private getEventColor(eventType: EventType): number {
    switch (eventType) {
      case EventType.JOIN: {
        return 4_321_431;
      }
      case EventType.CHAT: {
        return 10_509_236;
      }
      case EventType.LEAVE: {
        return 15_879_747;
      }
      default: {
        return 0;
      }
    }
  }
}
