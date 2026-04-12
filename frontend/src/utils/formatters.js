/**
 * Utility functions - Hàm tiện ích
 */

// Format thông số kỹ thuật từ key sang label dễ đọc
export function formatSpecLabel(key) {
  const labels = {
    maxInputVoltage: "Max. Input Voltage",
    mppVoltageRange: "MPP Voltage Range",
    maxInputCurrent: "Max. Input Current",
    ratedOutputPower: "Rated Output Power",
    maxOutputCurrent: "Max. Output Current",
    frequency: "Grid Frequency",
    thd: "THD",
    operatingTemp: "Operating Temperature",
    weight: "Weight",
    dimensions: "Dimensions",
    warranty: "Warranty",
    capacity: "Total Capacity",
    usableCapacity: "Usable Capacity",
    batteryType: "Battery Type",
    ratedPower: "Rated Power",
    peakPower: "Peak Power",
    voltage: "Nominal Voltage",
    certifications: "Certifications",
    batteryVoltageRange: "Battery Voltage Range",
    maxChargeCurrent: "Max. Charge Current",
  };
  return labels[key] || key.replace(/([A-Z])/g, " $1").trim();
}

// Format ngày tháng
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Truncate text
export function truncateText(text, maxLength = 150) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

// Category label mapping
export function getCategoryLabel(categoryId) {
  const labels = {
    "pv-inverters": "PV Inverters",
    "energy-storage": "Energy Storage",
    "hybrid-inverters": "Hybrid Inverters",
  };
  return labels[categoryId] || categoryId;
}

// Slugify string
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
