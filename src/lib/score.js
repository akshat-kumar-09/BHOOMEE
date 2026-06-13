/* 333 score helpers. Total = Earth (111) + People (111) + Momentum (111). */

export const tierFor = (total) =>
  total < 110 ? { label: "Critical", color: "#A83A2A", bg: "#FAEDEA" }
  : total < 150 ? { label: "Struggling", color: "#9A6A1A", bg: "#F8F0DC" }
  : total < 195 ? { label: "Working", color: "#2D6B22", bg: "#EAF2E5" }
  : { label: "Rising", color: "#1E5F8C", bg: "#E6EFF6" };

export const dirMeta = {
  rising: { label: "Rising", arrow: "↑", color: "#2D6B22" },
  stalling: { label: "Stalling", arrow: "→", color: "#9A6A1A" },
  declining: { label: "Declining", arrow: "↓", color: "#A83A2A" },
};
