import GoogleOauthButton from "./_components/GoogleOauthButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GoogleOauthButton />
    </main>
  );
}
