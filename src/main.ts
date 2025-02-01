import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http'; // ✅ Importar `provideHttpClient`

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient() ,provideRouter(routes, withEnabledBlockingInitialNavigation()), provideFirebaseApp(() => initializeApp({"projectId":"cs-parking-lot","appId":"1:489002743323:web:058403a0efbb6fd12d2abe","storageBucket":"cs-parking-lot.firebasestorage.app","apiKey":"AIzaSyCvSQpU9mITb42smlujaxI_8FJPYpoemjw","authDomain":"cs-parking-lot.firebaseapp.com","messagingSenderId":"489002743323","measurementId":"G-649W5G1NDY"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ]
})
  .catch(err => console.error(err));
