import Hero from "@/components/Hero";
import Booking from "@/components/Booking";
import ContactInfo from "@/components/ContactInfo";
import Footer from "@/components/Footer";
import { whatsAppDisplayPhone, whatsAppPhoneNumber } from "@/lib/whatsapp";

export default function TestContactPage() {
  return (
    <div className="min-h-screen bg-sand">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">联系方式测试页面</h1>
        
        <div className="grid gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Hero组件中的联系方式</h2>
            <Hero
              title="测试标题"
              subtitle="测试副标题"
              features={["功能1", "功能2", "功能3", "功能4"]}
              imageSrc="/images/tokyo-airport-transfer.jpg"
              imageAlt="测试图片"
            />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. 独立的ContactInfo组件</h2>
            <div className="grid gap-4 max-w-2xl">
              <ContactInfo />
              <ContactInfo compact />
              <ContactInfo showPhone={false} />
              <ContactInfo showName={false} />
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Booking组件中的联系方式</h2>
            <Booking />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Footer中的联系方式</h2>
            <Footer />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. WhatsApp链接测试</h2>
            <div className="space-y-4">
              <p className="text-ink/70">点击以下链接测试WhatsApp功能：</p>
              <div className="space-y-2">
                <a 
                  href={`https://wa.me/${whatsAppPhoneNumber}?text=Hello%20I%20need%20airport%20transfer`}
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  target="_blank"
                  rel="noreferrer"
                >
                  测试默认消息链接
                </a>
                <p className="text-sm text-ink/50">
                  链接格式: https://wa.me/{whatsAppPhoneNumber}?text=编码后的消息
                </p>
                <p className="text-sm text-ink/50">
                  电话号码: {whatsAppDisplayPhone} → WhatsApp格式: {whatsAppPhoneNumber}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
