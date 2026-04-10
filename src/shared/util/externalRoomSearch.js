export function attachExternalRoomSearch() {
  window.aituSearchRoom = (rawRoom) => {
    document
      .querySelectorAll(".room-map-group-search-target")
      .forEach((el) => el.classList.remove("room-map-group-search-target"));

    if (!rawRoom) return "NO_ROOM";

    const room = String(rawRoom).trim().toUpperCase();

    const all = Array.from(document.querySelectorAll("[id], [data-name]"));

    const normalize = (value) => String(value || "").trim().toUpperCase();

    const target = all.find((el) => {
      const id = normalize(el.id);
      const dataName = normalize(el.getAttribute("data-name"));
      const variants = [id, ...dataName.split("|")].filter(Boolean);

      return variants.some((variant) => {
        const last = variant.split(".").pop();
        const roomLast = room.split(".").pop();

        const variantDigits = (last.match(/\d{3}/) || [last])[0];
        const roomDigits = (roomLast.match(/\d{3}/) || [roomLast])[0];

        return (
          variant === room ||
          variant.startsWith(room) ||
          room.startsWith(variant) ||
          last === roomLast ||
          last?.startsWith(roomLast) ||
          roomLast?.startsWith(last) ||
          variantDigits === roomDigits
        );
      });
    });

    if (!target) return `NOT_FOUND:${room}`;

    target.classList.add("room-map-group-search-target");

    try {
      target.scrollIntoView({ block: "center", inline: "center" });
    } catch (_) {}

    return `FOUND:${room}`;
  };

  return window.aituSearchRoom;
}