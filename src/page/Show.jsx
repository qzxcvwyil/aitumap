import { useEffect } from "react";
import {
  C1_1_1,
  C1_2_1,
  C1_3_1,
  C1_1_2,
  C1_2_2,
  C1_3_2,
  C1_1_3,
  C1_2_3,
  C1_3_3,
} from "../shared/ui/separate";

const clearHighlightedRooms = () => {
  document
    .querySelectorAll(".room-map-group-search-target")
    .forEach((el) => el.classList.remove("room-map-group-search-target"));
};

const normalize = (value) => String(value || "").trim().toUpperCase();

const findRoomElement = (selectedRoom) => {
  if (!selectedRoom) return null;

  const room = normalize(selectedRoom);
  const roomLast = room.split(".").pop();
  const roomDigits = (roomLast.match(/\d{3}/) || [roomLast])[0];

  const all = Array.from(document.querySelectorAll("[id], [data-name]"));

  return all.find((el) => {
    const id = normalize(el.id);
    const dataName = normalize(el.getAttribute("data-name"));
    const variants = [id, ...dataName.split("|")].filter(Boolean);

    return variants.some((variant) => {
      const variantLast = variant.split(".").pop();
      const variantDigits = (variantLast.match(/\d{3}/) || [variantLast])[0];

      return (
        variant === room ||
        variant.startsWith(room) ||
        room.startsWith(variant) ||
        variantLast === roomLast ||
        variantLast.startsWith(roomLast) ||
        roomLast.startsWith(variantLast) ||
        variantDigits === roomDigits
      );
    });
  });
};

const Show = ({ selectedFloorBlockOption, selectedRoom }) => {
  useEffect(() => {
    clearHighlightedRooms();

    if (!selectedRoom) return;

    const timer = setTimeout(() => {
      const target = findRoomElement(selectedRoom);

      if (target) {
        target.classList.add("room-map-group-search-target");
        try {
          target.scrollIntoView({
            block: "center",
            inline: "center",
            behavior: "smooth",
          });
        } catch (_) {}
      } else {
        console.log("ROOM NOT FOUND:", selectedRoom);
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [selectedFloorBlockOption, selectedRoom]);

  switch (selectedFloorBlockOption) {
    case "firstC1.1":
      return <C1_1_1 />;
    case "secondC1.1":
      return <C1_1_2 />;
    case "thirdC1.1":
      return <C1_1_3 />;

    case "firstC1.2":
      return <C1_2_1 />;
    case "secondC1.2":
      return <C1_2_2 />;
    case "thirdC1.2":
      return <C1_2_3 />;

    case "firstC1.3":
      return <C1_3_1 />;
    case "secondC1.3":
      return <C1_3_2 />;
    case "thirdC1.3":
      return <C1_3_3 />;

    default:
      return <C1_1_1 />;
  }
};

export default Show;