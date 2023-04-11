export const getGoogleUrl = (from: string) => {
  console.log('from', from);
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const options = {
    // redirect_uri: 'http://localhost:3000/google',
    redirect_uri: 'http://localhost:3000/auth',
    client_id: '961099427161-g8qa0hnq7tk0hup5cj3c45475j23v72n.apps.googleusercontent.com',
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};
