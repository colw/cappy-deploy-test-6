export async function fetchSugar() {
  try {
    const response = await window.fetch("/.netlify/functions/latest");
    const data = await response.json();
    return data.glucose;
  } catch (e) {
    return { sgv: 0, direction: "NONE" };
  }
}

export async function fetchLast24() {
  try {
    const response = await window.fetch("/.netlify/functions/last24");
    const data = await response.json();
    return data.glucoseValues;
  } catch (e) {
    return [{ sgv: 0, direction: "NONE" }];
  }
}
