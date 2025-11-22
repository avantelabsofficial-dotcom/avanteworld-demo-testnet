# Setting the Shared Avatar URL

All users in your application will use the same Ready Player Me avatar. To set the avatar URL:

## Option 1: From Browser Console

1. Open your application in a browser
2. Press F12 to open Developer Tools
3. Go to the Console tab
4. Run this command with your Ready Player Me avatar GLB URL:

```javascript
localStorage.setItem('sharedAvatarUrl', 'https://models.readyplayer.me/YOUR_AVATAR_ID.glb');
```

Replace `YOUR_AVATAR_ID` with the actual ID from your Ready Player Me avatar URL.

Example:
```javascript
localStorage.setItem('sharedAvatarUrl', 'https://models.readyplayer.me/64a1a88ccceb93151f8f55f3.glb');
```

## Option 2: Programmatically

You can call this from your app code:

```typescript
import { setSharedAvatarUrl } from './src/lib/supabase';

setSharedAvatarUrl('https://models.readyplayer.me/YOUR_AVATAR_ID.glb');
```

## Finding Your Avatar URL

1. Go to [readyplayer.me](https://readyplayer.me)
2. Create or edit your avatar
3. Once created, you'll get a shareable link like: `https://readyplayer.me/avatars/YOUR_AVATAR_ID`
4. Download the GLB model or use the direct URL: `https://models.readyplayer.me/YOUR_AVATAR_ID.glb`

## How It Works

- The avatar URL is stored in browser localStorage under `sharedAvatarUrl`
- Every user who loads the app will use this same avatar
- When a user explores a location, they'll see the same character on the map
- The avatar loads automatically when they enter 3D mode

## Troubleshooting

If the avatar doesn't load:
- Check the browser console for errors (F12)
- Make sure the URL is a valid `.glb` file URL
- Verify the URL is publicly accessible
- Try a different avatar URL to test

## Notes

- The avatar persists across page refreshes
- It's stored locally in each user's browser
- To change the avatar for all users, update the URL in localStorage again
- Users on different devices/browsers will have their own cached copy
