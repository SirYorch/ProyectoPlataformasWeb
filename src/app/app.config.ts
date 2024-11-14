import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCvSQpU9mITb42smlujaxI_8FJPYpoemjw",
  authDomain: "cs-parking-lot.firebaseapp.com",
  projectId: "cs-parking-lot",
  storageBucket: "cs-parking-lot.firebasestorage.app",
  messagingSenderId: "489002743323",
  appId: "1:489002743323:web:6c4a53198c2a96a42d2abe",
  measurementId: "G-PZ7WDXYNS9"
};


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp(firebaseConfig)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp(firebaseConfig)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"cs-parking-lot","appId":"1:489002743323:web:058403a0efbb6fd12d2abe","storageBucket":"cs-parking-lot.firebasestorage.app","apiKey":"AIzaSyCvSQpU9mITb42smlujaxI_8FJPYpoemjw","authDomain":"cs-parking-lot.firebaseapp.com","messagingSenderId":"489002743323","measurementId":"G-649W5G1NDY"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
