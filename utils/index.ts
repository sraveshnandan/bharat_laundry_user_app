import axios from "axios";
const encryptEmail = (email: string) => {
  return email.replace(/(.{2})(.*)(?=@)/, "$1****");
};

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371;
  const degToRad = (deg: number) => deg * (Math.PI / 180);

  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};

const getAddressFromCoordinates = async (
  lat?: number,
  lng?: number
): Promise<{
  display_name?: string;
  address: Record<string, string>;
} | null> => {
  try {
    const { data } = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );

    if (data?.display_name) {
      return {
        display_name: data?.display_name,
        address: data?.address,
      };
    }

    return null;
  } catch (error: any) {
    console.log(` Error fetching address: ${error?.message}  `);
    return null;
  }
};

const getAddress = async (lat?: number, lng?: number) => {
  try {
    const key = "pk.0c5cedc2f0e0dbd014b872c360afd042";
    const { data } = await axios.get(
      `https://us1.locationiq.com/v1/reverse?key=${key}&lat=${lat}&lon=${lng}&format=json&`
    );
    return {
      display_name: data.display_name,
      address: data.address,
    };
  } catch (error: any) {
    console.log(`Error fetching address: ${error?.message}  `);
    return null;
  }
};

export {
  encryptEmail,
  getAddress,
  getAddressFromCoordinates,
  getDistanceFromLatLonInKm
};

