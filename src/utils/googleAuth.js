
let tokenClient;
let accessToken = null;

export const initGoogleAuth = () => {
  return new Promise((resolve) => {
    const waitForGoogle = () => {
      if (window.google?.accounts?.oauth2) {
        tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          scope: "https://www.googleapis.com/auth/drive.file",
          callback: () => {}, // real callback set at login time
        });

        console.log("✅ Google OAuth client initialized");
        resolve(true);
      } else {
        setTimeout(waitForGoogle, 100);
      }
    };

    waitForGoogle();
  });
};

export const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      reject(new Error("Google Auth not initialized"));
      return;
    }

    tokenClient.callback = (tokenResponse) => {
      accessToken = tokenResponse.access_token;
      resolve(accessToken);
    };

    tokenClient.requestAccessToken();
  });
};


export const getGoogleAccessToken = () => accessToken;
