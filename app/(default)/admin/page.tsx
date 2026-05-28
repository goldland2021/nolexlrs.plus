import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";
import {
  getActiveSupportContact,
  getSupportContactStorageStatus,
  supportContacts
} from "@/lib/support-contact";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false
  }
};

type AdminDashboardPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminDashboardPage({ searchParams }: AdminDashboardPageProps) {
  const cookieStore = await cookies();
  const session = verifyAdminSessionToken(cookieStore.get(adminSessionCookieName)?.value);

  if (!session) redirect("/admin/login");

  const params = (await searchParams) ?? {};
  const activeContact = await getActiveSupportContact();
  const storageStatus = getSupportContactStorageStatus();
  const updated = params.updated === "1";
  const hasStorageError = params.error === "support-storage";

  return (
    <main className="min-h-screen bg-sand px-4 py-8 text-ink">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex flex-col gap-4 border-b border-clay/60 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-ember">Airport Admin</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">客服切换后台</h1>
            <p className="mt-2 text-sm text-ink/60">
              前台 WhatsApp 按钮只显示一个入口，实际号码由这里切换。
            </p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="h-10 rounded-lg border border-clay/70 bg-white px-4 text-sm font-semibold transition hover:border-ember hover:text-ember"
            >
              退出登录
            </button>
          </form>
        </header>

        {updated ? (
          <section className="mb-6 rounded-lg border border-green-200 bg-white p-5 text-sm text-green-700 shadow-soft">
            已更新当前 WhatsApp 客服号码。
          </section>
        ) : null}

        {hasStorageError ? (
          <section className="mb-6 rounded-lg border border-ember/30 bg-white p-5 shadow-soft">
            <h2 className="text-lg font-semibold text-ember">客服切换暂时无法保存</h2>
            <p className="mt-2 text-sm leading-6 text-ink/65">
              请确认 Vercel 已配置 SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY，并在 Supabase 建好 site_settings 表。
            </p>
            <pre className="mt-4 overflow-auto rounded-lg bg-sand/70 p-4 text-xs leading-6 text-ink/70">
{`create table if not exists site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);`}
            </pre>
          </section>
        ) : null}

        {!storageStatus.configured ? (
          <section className="mb-6 rounded-lg border border-ember/30 bg-white p-5 shadow-soft">
            <h2 className="text-lg font-semibold text-ember">需要配置 Supabase 才能持久保存</h2>
            <p className="mt-2 text-sm leading-6 text-ink/65">
              当前会使用默认客服号码。上线后请在 Vercel 环境变量中配置 SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY。
            </p>
          </section>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2">
          {supportContacts.map((contact) => {
            const isActive = contact.id === activeContact.id;

            return (
              <article key={contact.id} className="rounded-lg border border-clay/60 bg-white p-6 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-ink/55">{contact.label}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight">{contact.displayPhone}</p>
                  </div>
                  {isActive ? (
                    <span className="rounded-full bg-ember/10 px-3 py-1 text-xs font-semibold text-ember">
                      当前启用
                    </span>
                  ) : null}
                </div>
                <form action="/api/admin/support-contact" method="post" className="mt-6">
                  <input type="hidden" name="contactId" value={contact.id} />
                  <button
                    type="submit"
                    disabled={isActive}
                    className="h-11 w-full rounded-lg bg-ink px-4 text-sm font-semibold text-white transition hover:bg-ember disabled:cursor-not-allowed disabled:bg-ink/25"
                  >
                    {isActive ? "正在使用这个客服" : "一键切换到这个客服"}
                  </button>
                </form>
              </article>
            );
          })}
        </section>

        <section className="mt-6 rounded-lg border border-clay/60 bg-white p-5 text-sm leading-6 text-ink/60 shadow-soft">
          <p>前台所有 WhatsApp 按钮都会打开 /api/whatsapp，再跳转到当前启用的客服号码。</p>
          <p className="mt-2">网站可以保留两个客服资料，但顾客只会看到一个 WhatsApp 联系入口。</p>
        </section>
      </div>
    </main>
  );
}
