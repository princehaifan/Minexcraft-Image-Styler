export const toBase64 = (file: File): Promise<{ base64: string, mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // The result includes the data URL prefix (e.g., "data:image/png;base64,").
      // We need to strip this prefix for the Gemini API.
      const base64 = result.split(',')[1];
      const mimeType = result.substring(result.indexOf(':') + 1, result.indexOf(';'));
      if (base64 && mimeType) {
        resolve({ base64, mimeType });
      } else {
        reject(new Error("Failed to parse file data."));
      }
    };
    reader.onerror = error => reject(error);
  });
};
