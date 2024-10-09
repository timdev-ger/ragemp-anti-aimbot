
# RageMP Anti-Cheat for Aimbot Detection 🔒

This is a **basic anti-cheat system** for detecting internal and external aimbots in **RageMP**. It uses server-side and client-side checks to monitor suspicious player behavior and provides a verification mechanism to kick unresponsive clients.

## Features ✨

- **Aimbot Detection**: Analyzes player aiming behavior for unnatural "snapping" and other suspicious activities.
- **Client Verification**: Pings the client at regular intervals to ensure responsiveness. If a client fails to respond within a given time, it accumulates points, and after reaching the threshold, the player gets kicked.
- **Customizable**: Thresholds and detection logic can be adjusted to reduce false positives and fine-tune detection accuracy.

## How It Works ⚙️

1. **Aimbot Detection**: 
   - Tracks the player's aiming angle and timing between shots.
   - Detects unnatural aim snapping to targets.
   - Flags players for suspicious behavior and broadcasts warnings or kicks if necessary.

2. **Client Verification**:
   - Server sends periodic "ping" requests to the client.
   - If the client doesn't respond within a set time, the player receives a point.
   - After accumulating 3 points in 10 minutes, the player gets kicked for non-responsiveness.

## Installation 🛠️

1. Download the files from the repository or grab the ZIP file from the releases.
2. Place the `server_anticheat.js` on your RageMP server in the appropriate scripts directory.
3. Add `client_anticheat.js` to your client package to ensure proper verification and responsiveness.
4. Customize the detection thresholds and ping intervals as needed.

## Usage 🚀

- The server-side script automatically runs and monitors player behavior.
- The client-side script listens for verification pings and responds.
- Adjust the detection sensitivity and ping intervals as per your server’s requirements.

## Example Code Snippet 📜

```javascript
mp.events.add('playerWeaponShot', (player, targetPosition, targetEntity) => {
    const timeNow = Date.now();
    // ...Aimbot detection logic...
});
```

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
