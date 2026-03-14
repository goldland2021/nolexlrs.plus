type ServicesProps = {
  title?: string;
  subtitle?: string;
  services: string[];
  itemNote?: string;
};

export default function Services({
  title = "Airport Transfer Services",
  subtitle = "Reliable, private transport with fixed pricing and meet-and-greet service.",
  services,
  itemNote = "Door-to-door, on time, and stress free."
}: ServicesProps) {
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div key={service} className="card p-6">
              <p className="text-lg font-medium">{service}</p>
              <p className="mt-2 text-sm text-ink/60">{itemNote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}