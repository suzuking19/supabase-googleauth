import { createClient } from "@/utils/supabase/server";
import { signOut } from "@/utils/actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const session = await supabase.auth.getUser();

  if (!session.data.user) {
    redirect("/auth");
  }

  console.log(session);

  const {
    data: {
      user: { user_metadata, app_metadata },
    },
  } = session;

  const { name, email, user_name, avatar_url } = user_metadata;

  const userName = user_name
    ? `@${user_name}`
    : "User Nameは設定されていません";

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium text-gray-900">プロフィール</h1>
            <form action={signOut}>
              <button type="submit">サインアウト</button>
            </form>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-100 h-20"></div>
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="absolute -top-10 left-6">
              <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-sm">
                {avatar_url ? (
                  <Image
                    src={avatar_url}
                    alt="プロフィール画像"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-xl font-medium">
                      {name ? name.charAt(0).toUpperCase() : "U"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-16">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    表示名
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-900 font-medium">
                      {name || "名前が設定されていません"}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ユーザー名
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-700">{userName}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-700">{email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ユーザーID
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-700 font-mono text-sm">
                      {session.data.user.id}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    認証プロバイダー
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-700">
                      {app_metadata?.provider || "不明"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  アカウント情報
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-700">
                        認証済み
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 ml-6">
                      {app_metadata?.provider
                        ? `${app_metadata.provider}認証でログイン中`
                        : "認証済み"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-700">
                        最終ログイン
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 ml-6">
                      {new Date(
                        session.data.user.last_sign_in_at || ""
                      ).toLocaleDateString("ja-JP")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
