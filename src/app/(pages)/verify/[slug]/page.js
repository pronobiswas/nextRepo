

export default async function VerifyPage({ params }) {
    const { slug } = await params;

    let success = false;
    let message = "";

    // try {
    //     const res = await fetch(
    //         `${process.env.DOMAIN_NAME}/verify/${slug}`,
    //         {
    //             method: "GET",
    //             cache: "no-store",
    //         }
    //     );

    //     const data = await res.json();

    //     success = data.success;
    //     message = data.message;
    // } catch (error) {
    //     success = false;
    //     message = "Something went wrong. Please try again.";
    // }

    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
                <div className="flex justify-center mb-6">
                    {success ? (
                        <div className="w-20 h-20 text-green-500" />
                    ) : (
                        <div className="w-20 h-20 text-red-500" />
                    )}
                </div>

                <h1
                    className={`text-3xl font-bold text-center mb-3 ${success ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {success ? "Verification Successful!" : "Verification Failed"}
                </h1>

                <p className="text-center text-slate-600 mb-6">
                    {message}
                </p>

                {success && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                        <p className="text-green-700 font-medium">
                            ✅ Your email has been verified successfully.
                        </p>
                        <p className="text-sm text-green-600 mt-2">
                            You can now log in to your account.
                        </p>
                    </div>
                )}

                {!success && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                        <p className="text-red-700 font-medium">
                            ❌ This verification link is invalid or has expired.
                        </p>
                    </div>
                )}

                /login
                Go to Login
            
        </div>
    </main >
  );
}