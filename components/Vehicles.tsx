"use client";

import { useState } from "react";
import Image from "next/image";

type Vehicle = {
  name: string;
  passengers: string;
  image: string;
  alt: string;
  galleryImages?: string[];
};

type VehiclesProps = {
  title?: string;
  subtitle?: string;
  vehicles: Vehicle[];
};

export default function Vehicles({
  title = "Vehicles",
  subtitle = "Spacious, clean vehicles suited for solo travelers, families, and groups.",
  vehicles
}: VehiclesProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const galleryImages = selectedVehicle?.galleryImages ?? [];
  const selectedImage = galleryImages[selectedImageIndex] ?? galleryImages[0];

  function openVehicle(vehicle: Vehicle) {
    setSelectedVehicle(vehicle);
    setSelectedImageIndex(0);
  }

  function closeVehicle() {
    setSelectedVehicle(null);
    setSelectedImageIndex(0);
  }

  function showPreviousImage() {
    setSelectedImageIndex((index) => (index === 0 ? galleryImages.length - 1 : index - 1));
  }

  function showNextImage() {
    setSelectedImageIndex((index) => (index + 1) % galleryImages.length);
  }

  return (
    <section className="section bg-sand">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.name}
              vehicle={vehicle}
              onOpen={vehicle.galleryImages?.length ? () => openVehicle(vehicle) : undefined}
            />
          ))}
        </div>
      </div>

      {selectedVehicle && selectedImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedVehicle.name}
          onClick={closeVehicle}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lift"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-2xl leading-none text-ink shadow-soft transition hover:bg-white"
              onClick={closeVehicle}
            >
              &times;
            </button>
            <div className="relative p-3">
              <Image
                src={selectedImage}
                alt={`${selectedVehicle.name} photo ${selectedImageIndex + 1}`}
                width={1100}
                height={760}
                className="h-[68vh] max-h-[680px] w-full rounded-lg bg-sand object-contain"
              />
              {galleryImages.length > 1 ? (
                <>
                  <button
                    type="button"
                    aria-label="Previous photo"
                    className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-3xl leading-none text-ink shadow-soft transition hover:bg-white"
                    onClick={showPreviousImage}
                  >
                    &lsaquo;
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    className="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-3xl leading-none text-ink shadow-soft transition hover:bg-white"
                    onClick={showNextImage}
                  >
                    &rsaquo;
                  </button>
                </>
              ) : null}
              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/90 px-3 py-2 shadow-soft">
                {galleryImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    aria-label={`Show photo ${index + 1}`}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      index === selectedImageIndex ? "bg-ember" : "bg-clay"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function VehicleCard({
  vehicle,
  onOpen
}: {
  vehicle: Vehicle;
  onOpen?: () => void;
}) {
  const content = (
    <>
      <Image
        src={vehicle.image}
        alt={vehicle.alt}
        width={520}
        height={360}
        className="h-36 w-full object-cover image-warm sm:h-44"
      />
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold sm:text-xl">{vehicle.name}</h3>
          {vehicle.galleryImages?.length ? (
            <span className="shrink-0 rounded-md bg-ember/10 px-2.5 py-1 text-xs font-semibold text-ember">
              {vehicle.galleryImages.length} photos
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-xs text-ink/70 sm:mt-2 sm:text-sm">{vehicle.passengers}</p>
      </div>
    </>
  );

  if (!onOpen) {
    return <div className="card overflow-hidden">{content}</div>;
  }

  return (
    <button
      type="button"
      className="card overflow-hidden text-left transition hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus:ring-2 focus:ring-ember/40"
      onClick={onOpen}
    >
      {content}
    </button>
  );
}
