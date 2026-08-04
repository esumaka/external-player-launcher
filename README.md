[English](README.md) | [简体中文](README.zh-Hans.md)

---

# External Player Launcher

This plugin adds support for launching videos in external media players from scene cards and scene detail pages.

## Features

- Adds a player dropdown menu at the bottom of scene cards for quickly selecting an external player
- When "Single player mode" is enabled, the dropdown is replaced with a single player button for one-click playback
- Scene detail pages also support launching external players
- Individual players can be shown or hidden in settings as needed
- Independently control whether player buttons appear on scene cards, the scene detail page tabs, and the scene detail page toolbar
- Settings are stored per browser, so different devices can have different configurations

## Screenshots

Scene card:

![scene-card01](preview/scene-card01.jpg)

Scene card (single player mode):

![scene-card02](preview/scene-card02.jpg)

Scene detail:

![scene-detail](preview/scene-detail01.jpg)

Scene detail page toolbar (single player mode):

![scene-detail](preview/scene-detail02.png)

## Supported Players

Supported players and their corresponding platforms:

⚠️ Note: some players require additional tools to function properly

| Player | Windows | Android | iOS | macOS | Linux |
|--------|---------|---------|-----|-------|-------|
| IINA | | | | ✅ | |
| Infuse | | | ✅ | ✅ | |
| MPC-HC | ✅ (requires [mpc-protocol](https://github.com/muse90673/mpc-protocol/tree/develop)) | | | | |
| MPV | ✅ (requires [mpv-handler](https://github.com/akiirui/mpv-handler)) | ✅ | ✅ | | ✅ (requires [mpv-handler](https://github.com/akiirui/mpv-handler)) |
| MX Player (Pro) | | ✅ | | | |
| nPlayer | | | ✅ | ✅ | |
| PotPlayer | ✅ | | | | |
| VLC | ✅ (requires [vlc-protocol](https://github.com/muse90673/vlc-protocol/tree/develop)) | ✅ | ✅ | ✅ (requires [vlc-protocol](https://github.com/muse90673/vlc-protocol/tree/develop)) | ✅ (requires [vlc-protocol](https://github.com/muse90673/vlc-protocol/tree/develop)) |

## Installing the Plugin

1. In Stash, go to **Settings** → **Plugins**
2. Click **Add Source** and fill in the following:
   * **Name**: `esumaka plugin repo`
   * **Source URL**: `https://esumaka.github.io/stash-plugin-repo/main/index.yml`
3. Click **Confirm** to add the source
4. Select `External Player Launcher` from the Available Plugins list and click **Install**
5. Refresh the Stash page for the plugin to take effect

## Usage

- Make sure you have a supported player installed — see [Supported Players](#supported-players)
- Click the player icon at the bottom of a scene card and select your desired player from the dropdown menu
- Alternatively, go to the scene detail page, click the "Players" tab, then click the desired player button
- Your browser may show a dialog like "trying to open xxx?" — click "Open" to proceed

## Warning

This plugin may conflict with other plugins that modify scene cards, which could cause player buttons to disappear or appear in incorrect positions.

## Development

### Requirements

- [Node.js](https://nodejs.org/) >= 20.11.0
- [pnpm](https://pnpm.io/)

### Initialization & Configuration

- Install dependencies:
  - Run `pnpm install --frozen-lockfile`
- Configure environment variables:
  - Copy the `.env.example` file and rename it to `.env`
  - Set `STASH_PLUGINS_DIR` in `.env` to your local Stash plugins directory
  - Set `STASH_SOURCE_INDEX_DIR` in `.env` to your plugin source index repository root (typically the repo's `plugins` folder)

### Build the Plugin

- Run `pnpm build`, or in Visual Studio Code go to **Explorer → NPM Scripts** and click the `build` script.
- The output will be placed in the project's `dist` folder.

### Deploy to Local Stash (for debugging)

- Run `pnpm deploy`, or in Visual Studio Code go to **Explorer → NPM Scripts** and click the `deploy` script.
- The output will be placed in the `STASH_PLUGINS_DIR` folder.
- In Stash, go to **Settings** → **Plugins** and click **Reload Plugins**, then refresh the Stash page.

### Release the Plugin

- Run `pnpm release`, or in Visual Studio Code go to **Explorer → NPM Scripts** and click the `release` script.
- The output will be placed in the `STASH_SOURCE_INDEX_DIR` folder.

## Acknowledgements

Portions of this plugin's code are derived from:
- [bpking1/embyExternalUrl](https://github.com/bpking1/embyExternalUrl) (MIT License)
  - [embyLaunchPotplayer.js](https://github.com/bpking1/embyExternalUrl/blob/main/embyWebAddExternalUrl/embyLaunchPotplayer.js)

## Contributing

Pull Requests and Issues are welcome.

## Changelog

### 1.2.0

- Added player buttons to the scene detail page toolbar
- Added a setting to control the visibility of player buttons in the scene detail page toolbar
- Saving settings on the scene detail page now automatically refreshes the current page so the display location settings take effect immediately
- Refined UI strings and documentation for clearer, more consistent wording

### 1.1.0

- Added the "Display Locations" settings group to independently control the visibility of player buttons on scene cards and scene detail pages
- Reorganized the settings UI into groups (Display Locations / Player Settings) for a cleaner layout
