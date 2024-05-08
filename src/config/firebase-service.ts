import * as admin from 'firebase-admin'

admin.initializeApp({
    //Application Default Credentials (ADC) is able to implicitly determine your credentials, allowing you to use service account credentials when testing or running in non-Google environments. Learn more: https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments

    credential: admin.credential.applicationDefault()
});

export default admin;
