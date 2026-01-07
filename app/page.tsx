import { auth, signIn, signOut } from "@/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl border rounded-lg p-8 space-y-6 text-center">
        <h1 className="text-2xl font-semibold">Circulet</h1>

        <p className="text-gray-600">
          A campus-focused platform to share, rent, or sell pre-owned items.
        </p>

        {!session && (
          <>
            <p className="text-sm text-gray-500">
              Log in with your college email to get started.
            </p>

            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button className="px-4 py-2 bg-black text-white rounded">
                Sign in with Google
              </button>
            </form>
          </>
        )}

        {session && (
          <>
            <p className="text-sm text-gray-600">
              Logged in as <strong>{session.user.email}</strong>
            </p>

            <p>
              Profile update:{" "}
              {session.user.isProfileComplete ? "Done" : "not done"}
            </p>

            <p>{session.user.gradYear ?? "grad year not set"}</p>
            <p>{session.user.username ?? "username not set"}</p>
            <p>{session.user.id}</p>
            <p>{session.user.role}</p>
            <p>{session.user.phone ?? "phone number not set"}</p>

            <div className="flex flex-col gap-3">
              <a href="/onboarding" className="px-4 py-2 border rounded">
                Go to onboarding
              </a>

              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button className="px-4 py-2 border rounded text-red-600">
                  Sign out
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
