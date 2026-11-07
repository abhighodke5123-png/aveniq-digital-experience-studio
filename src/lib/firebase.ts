import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, type Firestore } from 'firebase/firestore';

const hasValidFirebaseConfig = Boolean(
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_API_KEY &&
  !process.env.FIREBASE_API_KEY.includes('Mock')
);

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDemoMock',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'aveniq-studio.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'aveniq-studio',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'aveniq-studio.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '1029384756',
  appId: process.env.FIREBASE_APP_ID || '1:1029384756:web:abcdef123456',
};

let app: FirebaseApp | undefined;
let db: Firestore | undefined;

export function getFirebaseApp(): FirebaseApp | null {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    return app;
  } catch {
    return null;
  }
}

export function getFirebaseFirestore(): Firestore | null {
  try {
    const fApp = getFirebaseApp();
    if (!fApp) return null;
    if (!db) {
      db = getFirestore(fApp);
    }
    return db;
  } catch {
    return null;
  }
}

export async function logFirebaseEnquiry(payload: Record<string, unknown>): Promise<{ success: boolean }> {
  if (!hasValidFirebaseConfig) {
    return { success: true };
  }

  try {
    const firestore = getFirebaseFirestore();
    if (!firestore) return { success: false };

    const writePromise = addDoc(collection(firestore, 'enquiries'), {
      ...payload,
      createdAt: serverTimestamp(),
      source: 'aveniq-web',
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firebase write timeout')), 1500)
    );

    await Promise.race([writePromise, timeoutPromise]);
    return { success: true };
  } catch (err) {
    console.warn('Firebase telemetry note:', err instanceof Error ? err.message : err);
    return { success: false };
  }
}