/**
 * 在浏览器已加载 Maps JavaScript API 后调用（需 geometry 库以解码 polyline）。
 */

export interface DrivingRouteResult {
  distanceKm: number;
  durationMin: number;
  path: google.maps.LatLngLiteral[];
}

export interface GeocodedAddress {
  lat: number;
  lng: number;
  formattedAddress: string;
}

function decodeOverviewPath(route: google.maps.DirectionsRoute): google.maps.LatLngLiteral[] {
  if (route.overview_path?.length) {
    return route.overview_path.map((ll) => ({ lat: ll.lat(), lng: ll.lng() }));
  }
  const encoded = route.overview_polyline;
  if (encoded && window.google?.maps?.geometry?.encoding) {
    const decoded = window.google.maps.geometry.encoding.decodePath(encoded);
    return decoded.map((ll) => ({ lat: ll.lat(), lng: ll.lng() }));
  }
  return [];
}

export function geocodeAddressGoogleMaps(address: string): Promise<GeocodedAddress | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.google?.maps?.Geocoder) {
      resolve(null);
      return;
    }
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        address,
        componentRestrictions: { country: "jp" },
        region: "jp"
      },
      (results, status) => {
        if (status === "OK" && results?.[0]?.geometry?.location) {
          const loc = results[0].geometry.location;
          resolve({ lat: loc.lat(), lng: loc.lng(), formattedAddress: results[0].formatted_address ?? address });
        } else {
          resolve(null);
        }
      }
    );
  });
}

export function getDrivingRouteGoogleMaps(
  origin: google.maps.LatLngLiteral,
  destination: google.maps.LatLngLiteral
): Promise<DrivingRouteResult | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.google?.maps?.DirectionsService) {
      resolve(null);
      return;
    }
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        region: "jp"
      },
      (result, status) => {
        if (status !== google.maps.DirectionsStatus.OK || !result?.routes?.[0]?.legs?.[0]) {
          resolve(null);
          return;
        }
        const leg = result.routes[0].legs[0];
        const distanceKm = Math.round((leg.distance!.value / 1000) * 10) / 10;
        const durationMin = Math.ceil(leg.duration!.value / 60);
        const path = decodeOverviewPath(result.routes[0]);
        resolve({ distanceKm, durationMin, path });
      }
    );
  });
}
