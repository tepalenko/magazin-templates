# Local Development Setup for AudioTemplate

When working with the AudioTemplate locally via npm link, you need to ensure wavesurfer.js is available in both projects.

## Setup Instructions

### 1. Install wavesurfer.js in the consuming project (magazin-app-admin)

```bash
cd magazin-app-admin
npm install wavesurfer.js
```

### 2. Link the local templates package

```bash
# In the templates project
cd magazin-templates
npm run build
npm link

# In the consuming project
cd magazin-app-admin
npm link @tepalenko/magazin-templates
```

### 3. Verify the setup

Test that the AudioTemplate component works by:
1. Creating an AUDIO type item in the admin
2. Uploading an audio file using BaseFileSection
3. Viewing the item with the waveform player

## Troubleshooting

### Module not found: wavesurfer.js

If you see this error, ensure wavesurfer.js is installed in the consuming project:
```bash
npm install wavesurfer.js
```

### AudioTemplate not rendering

1. Check that the item has `item_type: IssueItemTypes.AUDIO`
2. Verify `item.audio.src` contains a valid audio URL
3. Ensure the audio file is accessible (check network tab in browser dev tools)

### Waveform not loading

1. Check browser console for CORS errors
2. Verify the audio URL is accessible
3. Try with a different audio file format (MP3 is most compatible)

## Dependencies

- **Peer dependencies**: wavesurfer.js ^7.0.0
- **Dev dependencies**: wavesurfer.js (for building templates)
- **Runtime**: Install wavesurfer.js in consuming projects
