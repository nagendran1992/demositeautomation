import { createCanvas, loadImage } from 'canvas';  // Assuming you're using 'canvas' in Node.js
import jsQR from 'jsqr';  // Import jsQR for QR code decoding

// Function to decode the QR code from base64 data
export async function decodeQRCode(base64QRCode) {
    const canvas = createCanvas(200, 200); // Temporary size (we'll update it later)
    const ctx = canvas.getContext('2d');

    try {
        // Load the image from base64 string
        const image = await loadImage(base64QRCode);

        // Set the canvas size to match the image size
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the image onto the canvas
        ctx.drawImage(image, 0, 0);

        // Get image data from the canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Decode the QR code using jsQR
        const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

        if (qrCode) {
            return qrCode.data;  // Return the decoded QR code data
        } else {
            console.log('No QR code found!');
            return null;  // Return null if no QR code is found
        }
    } catch (error) {
        console.error('Error loading the image or decoding QR code:', error);
        return null;
    }     
}
