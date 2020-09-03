/**
 * Share basket state across tabs/iframes for browsers
 * that support that
 * https://caniuse.com/#feat=broadcastchannel
 */

let channel;

if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  channel = new BroadcastChannel('app_basket');
}

export function getChannel() {
  return channel;
}
