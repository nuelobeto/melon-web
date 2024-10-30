import axios from 'axios';

const cloud_name = import.meta.env.VITE_CLOUDINARY_NAME;
const preset_key = import.meta.env.VITE_CLOUDINARY_PRESET_KEY;

export const uploadToCloudinary = async (file: File | undefined) => {
  const formData = new FormData();
  formData.append('file', file!);
  formData.append('upload_preset', preset_key);
  formData.append('folder', 'melon');

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
    formData,
  );

  return {
    name: response.data.original_filename,
    format: response.data.format,
    url: response.data.secure_url,
  };
};

export function formatDateToCustomTimestamp(date: Date | string): string {
  // Convert the date to a Date object if it is a string
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const day = dateObj.getDate();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  // Handle the ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th'; // 11th to 20th
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const hours = dateObj.getHours() % 12 || 12; // Convert 24-hour time to 12-hour time
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const ampm = dateObj.getHours() >= 12 ? 'pm' : 'am';

  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

  return `${dayWithSuffix} ${month} ${year} | ${hours}:${minutes}${ampm}`;
}
