import * as Y from 'yjs';
import { IndexeddbPersistence } from 'y-indexeddb';
import { WebrtcProvider } from 'y-webrtc';

export const ROOM_NAME = 'redocly-pair-programming';

export const ydoc = new Y.Doc();

export const persistence = new IndexeddbPersistence(ROOM_NAME, ydoc);
export const provider = new WebrtcProvider(ROOM_NAME, ydoc);

export const files = ydoc.getMap<Y.Text>('files');

/**
 * Awareness identity
 */
const randomColor = () => `hsl(${Math.floor(Math.random() * 360)},70%,60%)`;

provider.awareness.setLocalStateField('user', {
  name: `User-${Math.floor(Math.random() * 1000)}`,
  color: randomColor(),
});
