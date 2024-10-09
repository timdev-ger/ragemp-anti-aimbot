// Server-side script for aimbot detection and verification pings
const verificationInterval = 60000; // Ping every minute
const kickThreshold = 3; // Threshold for points in 10 minutes

mp.players.forEach(player => {
    player.verificationPoints = 0;
});

setInterval(() => {
    mp.players.forEach(player => {
        // Send ping to client to verify responsiveness
        player.call('verifyPing');
        
        // Set timeout to detect if the player does not respond
        let responded = false;
        player._verifyTimeout = setTimeout(() => {
            if (!responded) {
                player.verificationPoints += 1;
                if (player.verificationPoints >= kickThreshold) {
                    player.call('onKick');
                    player.kick("Kicked for suspicious behavior: non-responsiveness.");
                }
            }
        }, 5000); // Allow 5 seconds for client to respond

        // Listen for the client's response
        mp.events.add('verifyPingResponse', (player) => {
            clearTimeout(player._verifyTimeout); // Clear the timeout if client responded
            responded = true;
        });
    });
}, verificationInterval);

// Aimbot detection code (previously defined)
mp.events.add('playerWeaponShot', (player, targetPosition, targetEntity) => {
    const timeNow = Date.now();
    
    // Store previous aim data
    if (!player.lastAim) {
        player.lastAim = { position: targetPosition, time: timeNow };
        return;
    }

    // Calculate time difference and angle difference since last shot
    const timeDifference = timeNow - player.lastAim.time;
    const angleDifference = getAngleDifference(player.lastAim.position, targetPosition);

    // Detect "snapping" by analyzing the angle difference and the time taken
    if (timeDifference < 50 && angleDifference > 15) { // Customize these values
        // Flag this player for suspicious behavior
        player.suspicionLevel = (player.suspicionLevel || 0) + 1;

        if (player.suspicionLevel > 5) {
            mp.players.broadcast(`${player.name} may be using an aimbot!`);
            // Take action like kicking or banning the player
        }
    } else {
        // Reset suspicion if aiming seems normal
        player.suspicionLevel = Math.max(0, (player.suspicionLevel || 0) - 1);
    }

    player.lastAim = { position: targetPosition, time: timeNow };
});

function getAngleDifference(pos1, pos2) {
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    return Math.atan2(dy, dx) * 180 / Math.PI;
}
