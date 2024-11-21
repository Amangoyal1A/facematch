const fs = require('fs');
const { compareFaces } = require('./faceMatch.js');

(async () => {
    try {
        // Read images from disk
        const sourceImage = fs.readFileSync('./srk1.jpg'); // Replace with your image path
        const targetImage = fs.readFileSync('./srk2.jpg'); // Replace with your image path

        // Compare the two faces
        const matches = await compareFaces(sourceImage, targetImage);

        if (matches.length > 0) {
            console.log("Faces matched successfully:", matches);
        } else {
            console.log("No matching faces found.");
        }
    } catch (error) {
        console.error("Error during face matching:", error);
    }
})();
