export const highlightRoomOnMap = (selectedRoom) => {
  document
    .querySelectorAll(".room-map-group-search-target")
    .forEach((el) => el.classList.remove("room-map-group-search-target"));

  if (!selectedRoom) return;

  const normalizedRoom = selectedRoom.toUpperCase().trim();

  const exactById = document.getElementById(normalizedRoom);
  if (exactById) {
    exactById.classList.add("room-map-group-search-target");
    return;
  }

  const exactByDataName = document.querySelector(
    `[data-name="${normalizedRoom}"]`
  );
  if (exactByDataName) {
    exactByDataName.classList.add("room-map-group-search-target");
    return;
  }

  const allNamed = [...document.querySelectorAll("[id], [data-name]")];

  const normalizeValue = (value) => (value || "").toUpperCase().trim();

  const targetLastPart = normalizedRoom.split(".").pop(); // например 223 или 223P
  const targetDigits = targetLastPart.match(/\d{3}/)?.[0] || targetLastPart;

  const partialMatch = allNamed.find((el) => {
    const id = normalizeValue(el.id);
    const dataName = normalizeValue(el.getAttribute("data-name"));

    const variants = [id, ...dataName.split("|")].filter(Boolean);

    return variants.some((variant) => {
      const variantLastPart = variant.split(".").pop(); // например 223P
      const variantDigits = variantLastPart.match(/\d{3}/)?.[0] || variantLastPart;

      return (
        variant === normalizedRoom ||
        variant.startsWith(normalizedRoom) ||
        normalizedRoom.startsWith(variant) ||
        variantLastPart === targetLastPart ||
        variantLastPart.startsWith(targetLastPart) ||
        targetLastPart.startsWith(variantLastPart) ||
        variantDigits === targetDigits
      );
    });
  });

  if (partialMatch) {
    partialMatch.classList.add("room-map-group-search-target");
  }
};