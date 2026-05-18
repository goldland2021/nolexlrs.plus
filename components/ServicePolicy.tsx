type ServicePolicyProps = {
  title?: string;
  subtitle?: string;
  compact?: boolean;
};

export default function ServicePolicy({
  title = "服務政策",
  subtitle = "透明、公平的服務條款",
  compact = false
}: ServicePolicyProps) {
  if (compact) {
    return (
      <div className="rounded-xl border border-clay/60 bg-white/90 p-4">
        <h3 className="font-semibold text-ink mb-2">{title}</h3>
        <ul className="space-y-2 text-sm text-ink/80">
          <li className="flex items-start gap-2">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-ember mt-1 flex-shrink-0" />
            <span><strong>接機:</strong> 免費等候90分鐘（從飛機降落時間算起）</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-ember mt-1 flex-shrink-0" />
            <span><strong>送機:</strong> 免費等候30分鐘</span>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
          
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center">
                  <span className="text-2xl">🛬</span>
                </div>
                <h3 className="text-xl font-semibold">接機服務</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span><strong>免費等候時間:</strong> 90分鐘</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span><strong>計時起點:</strong> 飛機降落時間</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span><strong>可選服務:</strong> 到達口舉牌接機，另加 2,000 日元（需在預約時說明）</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span>選擇舉牌服務時，司機在行李提取區舉牌等候</span>
                </li>
              </ul>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center">
                  <span className="text-2xl">🛫</span>
                </div>
                <h3 className="text-xl font-semibold">送機服務</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span><strong>免費等候時間:</strong> 30分鐘</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span><strong>計時起點:</strong> 約定接載時間</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span><strong>包含服務:</strong> 酒店/地址上門接載</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span>準時到達指定地點，協助行李裝載</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 card p-6">
            <h3 className="text-lg font-semibold mb-4">重要說明</h3>
            <ul className="space-y-3 text-sm text-ink/80">
              <li className="flex items-start gap-3">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-ember/60 mt-1 flex-shrink-0" />
                <span>等候時間從上述計時起點開始計算，超時將收取額外等候費用</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-ember/60 mt-1 flex-shrink-0" />
                <span>航班延誤無需擔心，司機會根據實際降落時間調整等候</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-ember/60 mt-1 flex-shrink-0" />
                <span>建議提前透過WhatsApp告知航班號，以便司機跟蹤航班狀態</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-ember/60 mt-1 flex-shrink-0" />
                <span>所有價格均為固定價格，包含稅費，無隱藏費用</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}