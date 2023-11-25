export function mapPercentageToColor(percentage) {
    // Ensure the percentage is within the range [0, 100]
    const normalizedPercentage = Math.min(100, Math.max(0, percentage));
  
    // Convert starting and ending colors to RGB
    const startColor = hexToRgb("#621AFF");
    const endColor = hexToRgb("#D00018");
  
    // Interpolate between start and end colors
    const interpolatedColor = interpolateColors(startColor, endColor, normalizedPercentage / 100);
  
    // Convert RGB to HEX
    const hexColor = rgbToHex(interpolatedColor[0], interpolatedColor[1], interpolatedColor[2]);
  
    return hexColor;
}
  
// Function to convert HEX to RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

// Function to interpolate between two colors
function interpolateColors(color1, color2, factor) {
    const result = [];
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(color1[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}

// Function to convert RGB to HEX
function rgbToHex(r, g, b) {
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

console.log(mapPercentageToColor(0))
console.log(mapPercentageToColor(25))
console.log(mapPercentageToColor(50.7))

// Example usage
const percentage = 75;
const color = mapPercentageToColor(percentage);
console.log(color); // Output: "#A21675" (interpolated color between the starting and ending colors)

console.log(mapPercentageToColor(100))