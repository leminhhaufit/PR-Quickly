# GitHub Advanced PR Creator

A lightweight Chrome extension for creating GitHub pull requests quickly from a popup. It helps you select repositories and branches, create a PR through the GitHub API, copy the new PR link, and open it in a new tab.

## Features

- Create pull requests from a Chrome extension popup.
- Load repositories from the authenticated GitHub account.
- Search and select repositories quickly.
- Load base and head branches with pagination support.
- Show open pull requests for the selected repository.
- Refresh branch and pull request lists manually.
- Save a default repository to auto-select when opening the popup.
- Store the GitHub token and API URL with `chrome.storage.sync`.
- Detect GitHub Enterprise hosts such as `*.gevernova.net` and use the matching API endpoint.
- Open the popup in a larger detached window.
- Switch the UI language between Vietnamese and English.

## Requirements

- Google Chrome or a Chromium-based browser.
- A GitHub Personal Access Token (PAT).
- Access to the repositories where you want to create pull requests.

## GitHub Token Permissions

Use a token with permissions that can read repositories and create pull requests.

For classic GitHub PATs, the `repo` scope is usually required for private repositories. For fine-grained tokens, grant access to the target repositories and allow pull request read/write access.

## Installation

1. Open Chrome and go to `chrome://extensions`.
2. Enable `Developer mode`.
3. Click `Load unpacked`.
4. Select this project folder.
5. Pin the extension from the Chrome extensions menu if desired.

## Usage

1. Open the extension popup.
2. Paste your GitHub Personal Access Token and click `Save`.
3. Choose a language from the flag selector in the header.
4. Optionally set a default repository name, such as `owner/repo` or a repository name.
5. Select a repository.
6. Select the base branch and head branch.
7. Enter a pull request title.
8. Click `Create Pull Request`.

After the PR is created, the extension copies the PR URL to the clipboard and opens the PR in a new browser tab.

## GitHub Enterprise Support

When the active tab is on GitHub Enterprise, the extension attempts to detect the host and use the enterprise API endpoint:

```text
https://<host>/api/v3
```

For public GitHub, it uses:

```text
https://api.github.com
```

The last detected API URL is saved and reused.

## Project Structure

```text
.
├── background.js   # Background message handler for GitHub fetch requests
├── manifest.json   # Chrome extension manifest
├── popup.html      # Popup UI and styling
└── popup.js        # Popup behavior, GitHub API calls, storage, and translations
```

## Development

This project uses plain HTML, CSS, and JavaScript. There is no build step.

To check JavaScript syntax:

```bash
node --check popup.js
```

After changing extension files, reload the extension from `chrome://extensions` before testing again.

## Notes

- The token is stored using Chrome sync storage, not in the source code.
- Do not commit personal tokens or generated secrets.
- The extension currently requests host access for GitHub public URLs and `*.gevernova.net` enterprise URLs.
