const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({ region: 'ap-south-1' });

// Create Rekognition service object
const rekognition = new AWS.Rekognition();

/**
 * Function to compare two faces using Rekognition
 * @param {Buffer} sourceImage - Binary data of the source image (Buffer format)
 * @param {Buffer} targetImage - Binary data of the target image (Buffer format)
 */
async function compareFaces(sourceImage, targetImage) {
    const params = {
        SourceImage: { Bytes: sourceImage },
        TargetImage: { Bytes: targetImage },
         SimilarityThreshold: 90 // Adjust this based on your accuracy requirements
    };

    try {
        const result = await rekognition.compareFaces(params).promise();

        // Check if any faces matched
        if (result.FaceMatches.length > 0) {
            result.FaceMatches.forEach((match, index) => {
                console.log(`Match ${index + 1}:`);
                console.log(`- Similarity: ${match.Similarity}%`);
                console.log(`- Bounding Box:`, match.Face.BoundingBox);
            });
        } else {
            console.log("No matches found.");
        }

        return result.FaceMatches; 
    } catch (error) {
        console.error("Error comparing faces:", error);
        throw error;
    }
}

module.exports = { compareFaces };
