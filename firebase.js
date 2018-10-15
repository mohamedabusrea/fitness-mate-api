const admin = require('firebase-admin');

admin.initializeApp({
                      credential: admin.credential.cert({
                                                          projectId: process.env.PROJECT_ID,
                                                          clientEmail: process.env.CLIENT_EMAIL,
                                                          privateKey: process.env.PRIVATE_KEY,
                                                        }),
                      databaseURL: 'https://fitness-native.firebaseio.com',
                    });

exports.validateToken = async (accessToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(accessToken);

    return decodedToken.uid;
  }
  catch (error) {
    return false;
  }
};
