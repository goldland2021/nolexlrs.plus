export default function Footer() {
  return (
    <footer className="border-t border-clay/60 bg-white">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold">Tokyo Airport Transfer</p>
            <p className="text-sm text-ink/60">Private airport pickups in Tokyo.</p>
          </div>
          <div className="text-sm text-ink/60">
            <p>Available 24/7. English speaking drivers.</p>
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.707 12.293a.999.999 0 00-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a.999.999 0 000-1.414l-4-4a.999.999 0 00-1.414 0L3.581 5.005c-.38.38-.594.902-.586 1.435.023 1.424.4 6.37 4.298 10.268s8.844 4.274 10.269 4.298h.028c.528 0 1.027-.208 1.405-.586l2.712-2.712a.999.999 0 000-1.414l-4-4z"/>
              </svg>
              WhatsApp: +81 8092776072 (ハヤシ)
            </p>
            <p>Instant replies on WhatsApp.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
