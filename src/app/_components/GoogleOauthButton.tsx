// See: https://developers.google.com/identity/protocols/oauth2/web-server?hl=zh-tw
export default function GoogleOauthButton() {
  console.log(process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID);
  const clientId = process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID;
  const redirectUri = "http://localhost:3000/oauth/google";
  const responseType = "code";
  const scope = [
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar",
  ].join(" ");

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

  return (
    <>
      <a href={url}>Sign in with Google</a>
    </>
  );
}
