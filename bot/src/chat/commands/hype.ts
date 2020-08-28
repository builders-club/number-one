import { OnCommandEvent, OnSayEvent } from "../../models"
import { EventBus, Events } from "../../events"

/**
 * Sends a message to chat BBB Hype emotes
 * @param onCommandEvent 
 */
export function Hype(onCommandEvent: OnCommandEvent) {

  const message = `baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype`

  // Send the message to Twitch chat
  EventBus.eventEmitter.emit(Events.OnSay, new OnSayEvent(message))
}