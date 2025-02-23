import { PhotoFile } from "react-native-vision-camera";

export async function analyzeImage(photoFile: PhotoFile): Promise<any> {
    try {
        const response = await fetch("file://" + photoFile.path);
        const blob = await response.blob();
        const base64 = await convertBlobToBase64(blob);

        const sortResponse = await fetch('http://192.168.5.126:3000/analyze', {
            method: 'POST',
            body: base64,
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        const data = await sortResponse.json();
        return data.group;
    } catch (error) {
        console.error("Error reading image:", error);
        throw error;
    }
}

function convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}