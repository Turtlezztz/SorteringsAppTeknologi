import { PhotoFile } from "react-native-vision-camera";

export async function analyzeImage(photoFile: PhotoFile): Promise<any> {
    console.log("1")
    const response =  await fetch("file://" + photoFile.path);
    console.log("2")

    const fileData = await response.blob();
    console.log("Blob received:", fileData);

    const file = new File([fileData], "image.jpg", { type: fileData.type || "image/jpeg" });
    console.log("File created:", file);

    const formData = new FormData();
    formData.append("image", file);
    console.log("FormData prepared.");

    console.log(formData)

    try {
        console.log("Starting fetch...");
        const response = await fetch('https://12tal.mintmc.dk/analyze', {
            method: 'POST',
            body: formData,
        });
        console.log("Fetch response:", response);

        const data = await response.json();
        console.log("Response JSON:", data);
    } catch (error) {
        console.error("Fetch error:", error);
    }


}