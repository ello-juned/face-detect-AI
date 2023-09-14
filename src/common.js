// Skin data
export const featureData = [
  //   { name: "skinColor", label: "Skin Color" },
  { name: "wrinkles", label: "Wrinkles" },
  { name: "acne", label: "Acne" },
  { name: "pores", label: "Pores" },
  { name: "pigmentation", label: "Pigmentation" },
];
// Define mapping functions for skin features
export const mapSkinColor = (value) => {
  console.log("value skin is", value);
  if ((value = 0.0)) return "White";
  if (value > 0.1 || value < 0.2) return "Light";
  return "Dark";
};

export const mapWrinkles = (value) => {
  if (value < 0.4) return 1;
  if (value < 0.7) return 2;
  return 3;
};

// Function to map acne based on a range of values (e.g., 0 to 1)
export const mapAcne = (acneValue) => {
  console.log("acneValue", acneValue);
  if (acneValue < 0.2) {
    return 1;
  } else if (acneValue >= 0.2 && acneValue < 0.5) {
    return 2;
  } else if (acneValue >= 0.5 && acneValue < 0.7) {
    return 3;
  } else {
    return 4;
  }
};

// Function to map pores based on a range of values (e.g., 0 to 1)
export const mapPores = (poresValue) => {
  console.log("poresValue", poresValue);

  if (poresValue < 0.2) {
    return 1; // Tiny pores
  } else if (poresValue >= 0.2 && poresValue < 0.5) {
    return 2; // Small pores
  } else if (poresValue >= 0.5 && poresValue < 0.7) {
    return 3; // Medium pores
  } else {
    return 4; // Large pores
  }
};

// Function to map pigmentation based on a range of values (e.g., 0 to 1)
export const mapPigmentation = (pigmentationValue) => {
  console.log("pigmentationValue", pigmentationValue);

  if (pigmentationValue < 0.1) {
    return 1; // Even skin tone
  } else if (pigmentationValue >= 0.2 && pigmentationValue < 0.5) {
    return 2; // Slight pigmentation
  } else if (pigmentationValue >= 0.5 && pigmentationValue < 0.7) {
    return 3; // Moderate pigmentation
  } else {
    return 4; // Severe pigmentation
  }
};
