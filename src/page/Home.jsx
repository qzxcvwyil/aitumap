import { useMemo } from "react";
import ShowIOS from "./ShowIOS";
import Show from "./Show";

const allowedSections = [
  "firstC1.1",
  "firstC1.2",
  "firstC1.3",
  "secondC1.1",
  "secondC1.2",
  "secondC1.3",
  "thirdC1.1",
  "thirdC1.2",
  "thirdC1.3",
];

const Home = ({ isIOS }) => {
  const { selectedSection, selectedRoom } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");
    const room = params.get("room");

    return {
      selectedSection:
        section && allowedSections.includes(section) ? section : "firstC1.1",
      selectedRoom: room ? room.toUpperCase() : null,
    };
  }, []);

  return isIOS ? (
    <Show
      selectedFloorBlockOption={selectedSection}
      selectedRoom={selectedRoom}
    />
  ) : (
    <Show
      selectedFloorBlockOption={selectedSection}
      selectedRoom={selectedRoom}
    />
  );
};

export default Home;