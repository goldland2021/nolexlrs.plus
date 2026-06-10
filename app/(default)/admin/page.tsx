import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";
import {
  getActiveSupportContact,
  getRoamingRewardButtonEnabled,
  getSupportContactStorageStatus,
  supportContacts
} from "@/lib/support-contact";
import {
  getTokyoRoamingRewardStorageStatus,
  listTokyoRoamingRewardRecordsPaged
} from "@/lib/tokyo-roaming-rewards";
import { listTransfers } from "@/lib/transfers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false }
};

type AdminDashboardPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const STATUS_LABELS: Record<string, string> = {
  pending: "待确认",
  not_served: "未服务",
  served: "已服务"
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  not_served: "bg-blue-100 text-blue-700",
  served: "bg-ink/10 text-ink/50"
};

const STATUS_KEYS = ["pending", "not_served", "served"] as const;

function formatServiceDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00+09:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "Asia/Tokyo"
  });
}

function formatFlightTime(timeStr: string | null) {
  if (!timeStr) return null;
  const d = new Date(timeStr);
  const jst = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const yyyy = jst.getFullYear();
  const mm = String(jst.getMonth() + 1).padStart(2, "0");
  const dd = String(jst.getDate()).padStart(2, "0");
  const hh = String(jst.getHours()).padStart(2, "0");
  const mi = String(jst.getMinutes()).padStart(2, "0");
  return `${yyyy}/${mm}/${dd} ${hh}:${mi}`;
}

function formatFare(jpy: number | null) {
  if (!jpy) return "—";
  return "¥" + jpy.toLocaleString("en-US");
}

function formatRewardTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    year: "numeric"
  });
}

const VALID_FILTERS = ["upcoming", "past", "all"] as const;
type Filter = (typeof VALID_FILTERS)[number];

export default async function AdminDashboardPage({ searchParams }: AdminDashboardPageProps) {
  const cookieStore = await cookies();
  const session = verifyAdminSessionToken(cookieStore.get(adminSessionCookieName)?.value);
  if (!session) redirect("/admin/login");

  const params = (await searchParams) ?? {};
  const tab = typeof params.tab === "string" ? params.tab : "transfers";
  const rawFilter = params.filter;
  const filter: Filter = VALID_FILTERS.find(f => f === rawFilter) ?? "upcoming";

  const contactUpdated = params.updated === "1";
  const roamingUpdated = params.updated === "roaming";
  const hasStorageError = params.error === "support-storage";

  const rewardPage = Math.max(1, parseInt(typeof params.page === "string" ? params.page : "1", 10) || 1);
  const REWARD_PAGE_SIZE = 8;

  const [activeContact, roamingRewardEnabled, rewardResult, transfers] = await Promise.all([
    getActiveSupportContact(),
    getRoamingRewardButtonEnabled(),
    listTokyoRoamingRewardRecordsPaged(rewardPage, REWARD_PAGE_SIZE),
    listTransfers(filter)
  ]);

  const recentRewards = rewardResult.records;
  const rewardTotal = rewardResult.total;
  const rewardTotalPages = Math.max(1, Math.ceil(rewardTotal / REWARD_PAGE_SIZE));

  function flightSortKey(t: { flightTime: string | null; serviceDate: string }) {
    return new Date(t.flightTime ?? t.serviceDate + "T12:00:00+09:00").getTime();
  }
  const sortedTransfers = [
    ...transfers.filter(t => t.status !== "served").sort((a, b) => flightSortKey(a) - flightSortKey(b)),
    ...transfers.filter(t => t.status === "served").sort((a, b) => flightSortKey(a) - flightSortKey(b))
  ];

  const storageStatus = getSupportContactStorageStatus();
  const rewardStorageStatus = getTokyoRoamingRewardStorageStatus();

  const tabs = [
    { key: "transfers", label: "行程管理" },
    { key: "support", label: "客服设置" },
    { key: "promo", label: "促销游戏" }
  ];

  const filters = [
    { key: "upcoming", label: "即将出行" },
    { key: "past", label: "历史行程" },
    { key: "all", label: "全部" }
  ];

  return (
    <main className="min-h-screen bg-sand px-4 py-8 text-ink">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <header className="mb-6 flex items-end justify-between border-b border-clay/60 pb-6">
          <div>
            <p className="text-sm font-semibold text-ember">pickupjp.com Admin</p>
            <h1 className="mt-1 text-2xl font-semibold">后台管理</h1>
          </div>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="h-10 rounded-lg border border-clay/70 bg-white px-4 text-sm font-semibold transition hover:border-ember hover:text-ember"
            >
              Log out
            </button>
          </form>
        </header>

        {/* Tab Navigation */}
        <nav className="mb-6 flex gap-1 rounded-xl border border-clay/50 bg-white p-1 shadow-soft">
          {tabs.map(({ key, label }) => (
            <Link
              key={key}
              href={`/admin?tab=${key}`}
              className={`flex-1 rounded-lg py-2 text-center text-sm font-semibold transition ${
                tab === key ? "bg-ink text-white shadow-soft" : "text-ink/55 hover:text-ink"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ─── TRANSFERS TAB ─── */}
        {tab === "transfers" ? (
          <div>
            {/* 筛选栏 */}
            <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1">
              {filters.map(({ key, label }) => (
                <Link
                  key={key}
                  href={`/admin?tab=transfers&filter=${key}`}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    filter === key
                      ? "bg-ember text-white"
                      : "border border-clay/60 bg-white text-ink/60 hover:text-ink"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <span className="ml-auto shrink-0 text-sm text-ink/40">{sortedTransfers.length} 条</span>
            </div>

            {sortedTransfers.length > 0 ? (
              <>
                {/* ── 手机：卡片列表 ── */}
                <div className="space-y-3 lg:hidden">
                  {sortedTransfers.map((t) => {
                    const flightTime = formatFlightTime(t.flightTime);
                    const isServed = t.status === "served";
                    const tripLabel = t.tripType === "airport_pickup" ? "↓ 接机" : t.tripType === "airport_dropoff" ? "↑ 送机" : t.tripType;
                    return (
                      <div key={t.id} className={`rounded-xl border border-clay/50 bg-white shadow-soft ${isServed ? "opacity-60" : ""}`}>
                        {/* 卡片头部：方向 + 费用 */}
                        <div className="flex items-center justify-between border-b border-clay/40 px-4 py-3">
                          <span className="rounded-full bg-sand px-3 py-0.5 text-sm font-semibold text-ink/70">{tripLabel}</span>
                          <span className="font-semibold text-ink">{formatFare(t.fareJpy)}</span>
                        </div>

                        {/* 乘客信息 */}
                        <div className="border-b border-clay/40 px-4 py-3">
                          <p className="font-medium leading-snug">{t.passengerName}</p>
                          <p className="mt-0.5 text-xs text-ink/50">
                            {t.passengers}人{t.meetGreet ? " · 举牌接机" : ""}
                            {t.luggage ? ` · ${t.luggage}` : ""}
                          </p>
                          {t.customerWhatsapp ? (
                            <a
                              href={`https://wa.me/${t.customerWhatsapp.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-ember"
                            >
                              📱 {t.customerWhatsapp}
                            </a>
                          ) : null}
                        </div>

                        {/* 路线 */}
                        <div className="border-b border-clay/40 px-4 py-3">
                          <p className="text-sm"><span className="font-medium text-ink/40">起：</span>{t.pickupLocation}</p>
                          <p className="mt-0.5 text-sm"><span className="font-medium text-ink/40">终：</span>{t.dropoffLocation}</p>
                        </div>

                        {/* 航班 / 日期 */}
                        <div className="border-b border-clay/40 px-4 py-3">
                          {t.flightNumber ? (
                            <p className="text-sm">
                              <span className="font-semibold">{t.flightNumber}</span>
                              {flightTime ? <span className="ml-2 text-ink/50">{flightTime}</span> : null}
                            </p>
                          ) : (
                            <p className="text-sm text-ink/50">{flightTime ?? formatServiceDate(t.serviceDate)}</p>
                          )}
                        </div>


                        {/* 车型 */}
                        <div className="flex gap-2 border-b border-clay/40 px-4 py-3">
                          {(["hiace", "alphard"] as const).map((v) => (
                            <form key={v} action="/api/admin/transfer-vehicle" method="post" className="flex-1">
                              <input type="hidden" name="transferId" value={t.id} />
                              <input type="hidden" name="vehicle" value={v} />
                              <input type="hidden" name="returnFilter" value={filter} />
                              <button
                                type="submit"
                                className={`h-9 w-full rounded-full text-xs font-semibold transition ${
                                  t.vehicleType === v
                                    ? "bg-ink text-white"
                                    : "border border-clay/50 bg-white text-ink/40 active:bg-sand"
                                }`}
                              >
                                {v === "hiace" ? "海狮" : "阿尔法"}
                              </button>
                            </form>
                          ))}
                        </div>

                        {/* 状态按钮 */}
                        <div className="flex gap-2 px-4 py-3">
                          {STATUS_KEYS.map((s) => (
                            <form key={s} action="/api/admin/transfer-status" method="post" className="flex-1">
                              <input type="hidden" name="transferId" value={t.id} />
                              <input type="hidden" name="status" value={s} />
                              <input type="hidden" name="returnFilter" value={filter} />
                              <button
                                type="submit"
                                className={`h-9 w-full rounded-full text-xs font-semibold transition ${
                                  t.status === s
                                    ? STATUS_COLORS[s]
                                    : "border border-clay/50 bg-white text-ink/40 active:bg-sand"
                                }`}
                              >
                                {STATUS_LABELS[s]}
                              </button>
                            </form>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ── 电脑：表格 ── */}
                <div className="hidden overflow-x-auto rounded-lg border border-clay/50 bg-white shadow-soft lg:block">
                  <table className="w-full min-w-[680px] text-left text-sm">
                    <thead className="bg-sand/70 text-xs uppercase text-ink/50">
                      <tr>
                        <th className="px-4 py-3">接送 / 航班</th>
                        <th className="px-4 py-3">乘客</th>
                        <th className="px-4 py-3">路线</th>
                        <th className="px-4 py-3">车型</th>
                        <th className="px-4 py-3">费用</th>
                        <th className="px-4 py-3">状态</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-clay/40">
                      {sortedTransfers.map((t) => {
                        const flightTime = formatFlightTime(t.flightTime);
                        const isServed = t.status === "served";
                        return (
                          <tr key={t.id} className={`hover:bg-sand/30 ${isServed ? "opacity-55" : ""}`}>
                            <td className="px-4 py-3">
                              <p className="text-xs text-ink/50">
                                {t.tripType === "airport_pickup" ? "↓ 接机" : t.tripType === "airport_dropoff" ? "↑ 送机" : t.tripType}
                              </p>
                              <p className="mt-1 font-medium">{t.flightNumber ?? "—"}</p>
                              <p className="mt-0.5 text-xs text-ink/50">
                                {flightTime ?? formatServiceDate(t.serviceDate)}
                              </p>
                            </td>
                            <td className="max-w-[200px] px-4 py-3">
                              <p className="truncate font-medium leading-5">{t.passengerName}</p>
                              <p className="mt-0.5 text-xs text-ink/50">
                                {t.passengers}人{t.meetGreet ? " · 举牌" : ""}
                                {t.luggage ? ` · ${t.luggage}` : ""}
                              </p>
                              {t.customerWhatsapp ? (
                                <a
                                  href={`https://wa.me/${t.customerWhatsapp.replace(/\D/g, "")}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="mt-0.5 inline-block text-xs text-ember hover:underline"
                                >
                                  {t.customerWhatsapp}
                                </a>
                              ) : null}
                            </td>
                            <td className="max-w-[180px] px-4 py-3">
                              <p className="truncate text-xs"><span className="font-medium text-ink/40">起：</span>{t.pickupLocation}</p>
                              <p className="mt-0.5 truncate text-xs"><span className="font-medium text-ink/40">终：</span>{t.dropoffLocation}</p>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col gap-1">
                                {(["hiace", "alphard"] as const).map((v) => (
                                  <form key={v} action="/api/admin/transfer-vehicle" method="post">
                                    <input type="hidden" name="transferId" value={t.id} />
                                    <input type="hidden" name="vehicle" value={v} />
                                    <input type="hidden" name="returnFilter" value={filter} />
                                    <button
                                      type="submit"
                                      className={`w-full rounded-full px-2 py-0.5 text-xs font-semibold transition ${
                                        t.vehicleType === v
                                          ? "bg-ink text-white"
                                          : "border border-clay/50 bg-white text-ink/35 hover:text-ink/60"
                                      }`}
                                    >
                                      {v === "hiace" ? "海狮" : "阿尔法"}
                                    </button>
                                  </form>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3 font-semibold">{formatFare(t.fareJpy)}</td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col gap-1">
                                {STATUS_KEYS.map((s) => (
                                  <form key={s} action="/api/admin/transfer-status" method="post">
                                    <input type="hidden" name="transferId" value={t.id} />
                                    <input type="hidden" name="status" value={s} />
                                    <input type="hidden" name="returnFilter" value={filter} />
                                    <button
                                      type="submit"
                                      className={`w-full rounded-full px-2 py-0.5 text-xs font-semibold transition ${
                                        t.status === s
                                          ? STATUS_COLORS[s]
                                          : "border border-clay/50 bg-white text-ink/35 hover:text-ink/60"
                                      }`}
                                    >
                                      {STATUS_LABELS[s]}
                                    </button>
                                  </form>
                                ))}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="rounded-lg border border-clay/50 bg-white p-10 text-center text-sm text-ink/50 shadow-soft">
                {filter === "upcoming" ? "暂无即将出行的行程。" : filter === "past" ? "暂无历史行程记录。" : "暂无行程记录。"}
              </div>
            )}

          </div>
        ) : null}

        {/* ─── SUPPORT TAB ─── */}
        {tab === "support" ? (
          <div>
            {contactUpdated ? (
              <div className="mb-6 rounded-lg border border-green-200 bg-white p-5 text-sm text-green-700 shadow-soft">
                WhatsApp 客服号码已更新。
              </div>
            ) : null}

            {hasStorageError ? (
              <div className="mb-6 rounded-lg border border-ember/30 bg-white p-5 shadow-soft">
                <h2 className="text-base font-semibold text-ember">设置保存失败</h2>
                <p className="mt-2 text-sm leading-6 text-ink/65">
                  请检查 Vercel 的 SUPABASE_URL、SUPABASE_SERVICE_ROLE_KEY 环境变量，以及 site_settings 表是否存在。
                </p>
              </div>
            ) : null}

            {!storageStatus.configured ? (
              <div className="mb-6 rounded-lg border border-ember/30 bg-white p-5 shadow-soft">
                <h2 className="text-base font-semibold text-ember">Supabase 未配置</h2>
                <p className="mt-2 text-sm leading-6 text-ink/65">
                  需要配置 Supabase 环境变量，切换的号码才能在部署后持久生效。
                </p>
              </div>
            ) : null}

            <section className="mb-6">
              <h2 className="mb-4 text-lg font-semibold">WhatsApp 客服号码</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {supportContacts.map((contact) => {
                  const isActive = contact.id === activeContact.id;
                  return (
                    <article key={contact.id} className="rounded-lg border border-clay/60 bg-white p-6 shadow-soft">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-ink/55">{contact.label}</p>
                          <p className="mt-3 text-2xl font-semibold">{contact.displayPhone}</p>
                        </div>
                        {isActive ? (
                          <span className="rounded-full bg-ember/10 px-3 py-1 text-xs font-semibold text-ember">
                            Active
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
                          {isActive ? "当前激活" : "切换到此号码"}
                        </button>
                      </form>
                    </article>
                  );
                })}
              </div>
            </section>

            <p className="text-sm leading-6 text-ink/55">
              所有网站上的 WhatsApp 按钮通过 /api/whatsapp 跳转，只有当前激活的号码会被展示给客人。
            </p>
          </div>
        ) : null}

        {/* ─── PROMO TAB ─── */}
        {tab === "promo" ? (
          <div>
            {roamingUpdated ? (
              <div className="mb-6 rounded-lg border border-green-200 bg-white p-5 text-sm text-green-700 shadow-soft">
                Tokyo Roaming 促销按钮设置已更新。
              </div>
            ) : null}

            {hasStorageError ? (
              <div className="mb-6 rounded-lg border border-ember/30 bg-white p-5 shadow-soft">
                <h2 className="text-base font-semibold text-ember">设置保存失败</h2>
                <p className="mt-2 text-sm leading-6 text-ink/65">
                  请检查 Supabase 环境变量配置。
                </p>
              </div>
            ) : null}

            <section className="mb-6 rounded-lg border border-clay/60 bg-white p-6 shadow-soft">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-ink/55">Tokyo Roaming 促销</p>
                  <h2 className="mt-2 text-xl font-semibold">首页小车奖励按钮</h2>
                  <p className="mt-2 text-sm leading-6 text-ink/60">
                    控制首页「Get Quote on WhatsApp」旁的 ¥2,000 奖励小车按钮是否显示。
                  </p>
                </div>
                <span
                  className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                    roamingRewardEnabled ? "bg-ember/10 text-ember" : "bg-ink/10 text-ink/60"
                  }`}
                >
                  {roamingRewardEnabled ? "显示中" : "已隐藏"}
                </span>
              </div>
              <form action="/api/admin/roaming-reward" method="post" className="mt-5">
                <input type="hidden" name="enabled" value={roamingRewardEnabled ? "false" : "true"} />
                <button
                  type="submit"
                  className="h-11 rounded-lg bg-ink px-5 text-sm font-semibold text-white transition hover:bg-ember"
                >
                  {roamingRewardEnabled ? "隐藏促销按钮" : "显示促销按钮"}
                </button>
              </form>
            </section>

            <section className="rounded-lg border border-clay/60 bg-white p-6 shadow-soft">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-ink/55">Tokyo Roaming Rewards</p>
                  <h2 className="mt-2 text-xl font-semibold">近期奖励记录</h2>
                  <p className="mt-2 text-sm leading-6 text-ink/60">
                    客人通过 WhatsApp 申请奖励时，核对此处的奖励编号和领取时间。
                  </p>
                </div>
                <span className="rounded-full bg-ink/10 px-3 py-1 text-xs font-semibold text-ink/60">
                  表: {rewardStorageStatus.table}
                </span>
              </div>

              {recentRewards.length > 0 ? (
                <>
                  <div className="overflow-hidden rounded-lg border border-clay/50">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-sand/70 text-xs uppercase text-ink/50">
                        <tr>
                          <th className="px-4 py-3">奖励编号</th>
                          <th className="px-4 py-3">领取时间</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-clay/40">
                        {recentRewards.map((reward) => (
                          <tr key={reward.id}>
                            <td className="px-4 py-3 font-semibold text-ember">{reward.code}</td>
                            <td className="px-4 py-3 text-ink/70">{formatRewardTime(reward.awardedAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-ink/50">
                      第 {rewardPage} / {rewardTotalPages} 页，共 {rewardTotal} 条
                    </span>
                    <div className="flex gap-2">
                      {rewardPage > 1 ? (
                        <Link
                          href={`/admin?tab=promo&page=${rewardPage - 1}`}
                          className="h-9 rounded-lg border border-clay/60 bg-white px-4 text-sm font-semibold text-ink/70 transition hover:border-ink hover:text-ink"
                        >
                          ← 上一页
                        </Link>
                      ) : null}
                      {rewardPage < rewardTotalPages ? (
                        <Link
                          href={`/admin?tab=promo&page=${rewardPage + 1}`}
                          className="h-9 rounded-lg border border-clay/60 bg-white px-4 text-sm font-semibold text-ink/70 transition hover:border-ink hover:text-ink"
                        >
                          下一页 →
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-lg bg-sand/70 p-5 text-sm leading-6 text-ink/60">
                  暂无奖励记录。
                </div>
              )}
            </section>
          </div>
        ) : null}

      </div>
    </main>
  );
}
