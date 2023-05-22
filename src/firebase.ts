import firebase from 'firebase/compat/app';
import 'firebaseui/dist/firebaseui.css';
import { firebaseConfig } from '@/config/firebaseApp.config';

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;