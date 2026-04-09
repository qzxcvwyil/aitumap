export const highlightRoomOnMap = (selectedRoom) => {
  document
    .querySelectorAll(".room-map-group-search-target")
    .forEach((el) => el.classList.remove("room-map-group-search-target"));

  if (!selectedRoom) return;

  const normalizedRoom = selectedRoom.toUpperCase();

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

  const partialByDataName = [...document.querySelectorAll("[data-name]")].find(
    (el) =>
      el.getAttribute("data-name")?.toUpperCase().split("|").includes(normalizedRoom)
  );

  if (partialByDataName) {
    partialByDataName.classList.add("room-map-group-search-target");
  }
};