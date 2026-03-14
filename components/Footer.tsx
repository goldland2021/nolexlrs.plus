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
            <p>WhatsApp replies within minutes.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
