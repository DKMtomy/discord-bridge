import { BasePlugin } from "@serenityjs/plugins";
import { ItemStack } from "@serenityjs/world";
import { ItemType } from "@serenityjs/item";
import { BlockIdentifier, BlockPermutation } from "@serenityjs/block";
import {
  DiscordWebhookConfig,
  DiscordBridge,
  EventType,
} from "./discord-bridge.js";

const webhookConfig: DiscordWebhookConfig = {
  url: "https://discord.com/api/webhooks/1234200987724546199/gjInAa85RnFOwa31LATo-M_bYYNL1Lj6vy-ErQAdeQA2CMMIboQE7L50njw8Jp3Enwc-",
};

// Create the DiscordBridge instance
const bridge = new DiscordBridge(webhookConfig);

import type {
  PlayerChatSignal,
  PlayerJoinedSignal,
  PlayerSpawnedSignal,
  Serenity,
} from "@serenityjs/launcher";
import type { Logger } from "@serenityjs/logger";

/**
 * Sample plugin for the Serenity server.
 */
export default class SamplePlugin extends BasePlugin {
  // The constructor is not required, as it is inherited from the BasePlugin class.
  public constructor(serenity: Serenity, logger: Logger) {
    super(serenity, logger);

    // The signal hooks for the plugin.
    serenity.on("PlayerJoined", this.onJoin.bind(this));
    serenity.before("PlayerChat", this.onChat.bind(this));
  }

  public startup(): void {
    // Log the plugin startup.
    this.logger.info("Discord bridge plugin started.");
  }

  // The event listener for the player join signal.
  public onJoin(event: PlayerJoinedSignal): void {
    // Log the player join event from the plugin.
    bridge.sendMessage(EventType.JOIN, event.player.username);
  }

  // The event listener for the player chat signal.
  public onChat(event: PlayerChatSignal): boolean {
    // return true to continue the chat event.
    bridge.sendMessage(EventType.CHAT, event.player.username, event.message);
    return true;
  }
}
