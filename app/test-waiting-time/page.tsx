import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WaitingTimeBanner from "@/components/WaitingTimeBanner";
import ServicePolicy from "@/components/ServicePolicy";
import Booking from "@/components/Booking";

export default function TestWaitingTimePage() {
  const services = [
    "成田机场 → 东京酒店",
    "羽田机场 → 东京酒店", 
    "东京 → 成田机场",
    "东京 → 羽田机场"
  ];

  return (
    <div className="min-h-screen bg-sand">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">等候时间政策测试页面</h1>
        
        <div className="grid gap-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Hero组件中的等候时间特性</h2>
            <Hero
              title="东京机场接送"
              subtitle="成田机场与羽田机场专车接送。"
              features={[
                "24小时服务",
                "英文司机", 
                "到达口举牌接机",
                "透明固定价格",
                "接机免费等候90分钟（从飞机降落算起）",
                "送机免费等候30分钟"
              ]}
              imageSrc="/images/tokyo-airport-transfer.jpg"
              imageAlt="东京机场接送"
            />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Services组件中的等候时间说明</h2>
            <Services
              title="机场接送服务"
              subtitle="固定价格，举牌接机，安心省心。"
              services={services}
              itemNote="点对点直达，准时安心。"
              locale="zh"
            />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. 等候时间政策横幅</h2>
            <div className="grid gap-4">
              <WaitingTimeBanner locale="zh" />
              <WaitingTimeBanner locale="en" />
              <WaitingTimeBanner locale="ja" />
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. 完整的服务政策组件</h2>
            <ServicePolicy />
            <div className="mt-8 max-w-md">
              <ServicePolicy compact />
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. 预订表单与等候时间提示</h2>
            <div className="mb-8">
              <WaitingTimeBanner locale="zh" />
            </div>
            <Booking />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. 多语言测试</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold mb-3">中文版本</h3>
                <div className="space-y-4">
                  <div className="text-sm p-3 bg-white rounded-lg border">
                    <p className="font-medium">接机服务</p>
                    <p className="text-ember">免费等候90分钟（从飞机降落算起）</p>
                  </div>
                  <div className="text-sm p-3 bg-white rounded-lg border">
                    <p className="font-medium">送机服务</p>
                    <p className="text-ember">免费等候30分钟</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">English Version</h3>
                <div className="space-y-4">
                  <div className="text-sm p-3 bg-white rounded-lg border">
                    <p className="font-medium">Airport Pickup</p>
                    <p className="text-ember">90 min free waiting (from flight landing)</p>
                  </div>
                  <div className="text-sm p-3 bg-white rounded-lg border">
                    <p className="font-medium">Airport Drop-off</p>
                    <p className="text-ember">30 min free waiting</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">日本語版</h3>
                <div className="space-y-4">
                  <div className="text-sm p-3 bg-white rounded-lg border">
                    <p className="font-medium">空港お迎え</p>
                    <p className="text-ember">90分無料待機（飛行機着陸時から）</p>
                  </div>
                  <div className="text-sm p-3 bg-white rounded-lg border">
                    <p className="font-medium">空港お見送り</p>
                    <p className="text-ember">30分無料待機</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. 实施总结</h2>
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-3">已添加等候时间政策的位置：</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember" />
                  <span><strong>Hero区域特性列表</strong> - 所有语言版本</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember" />
                  <span><strong>Services组件</strong> - 根据服务类型显示相应等候时间</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember" />
                  <span><strong>等候时间横幅</strong> - 预订表单前显眼位置</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember" />
                  <span><strong>完整服务政策页面</strong> - 详细说明条款</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember" />
                  <span><strong>多语言支持</strong> - 中文、英文、日文完整翻译</span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-ember/5 rounded-lg">
                <h4 className="font-semibold mb-2">政策内容：</h4>
                <ul className="space-y-1 text-sm">
                  <li>• 接机服务：免费等候90分钟（从飞机降落时间算起）</li>
                  <li>• 送机服务：免费等候30分钟</li>
                  <li>• 透明公平：超时将收取额外等候费用</li>
                  <li>• 航班延误无忧：司机会根据实际降落时间调整</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}