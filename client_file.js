// Client-side script for responding to server's verification pings
let verificationPoints = 0;

mp.events.add('verifyPing', () => {
    mp.events.callRemote('verifyPingResponse');
});

// Reset points every 10 minutes (600,000 milliseconds)
setInterval(() => {
    verificationPoints = 0;
}, 600000); // 10 minutes in milliseconds

mp.events.add('onKick', () => {
    mp.gui.chat.push("You have been kicked from the server for suspicious behavior.");
    mp.players.local.kick("Suspicious behavior detected.");
});
