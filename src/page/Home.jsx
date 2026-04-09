import { useContext, useEffect } from "react";
import { Sidebar, Search, FloorOption } from "../components";
import { MapContext } from "../shared";
import ShowIOS from "./ShowIOS";
import Show from "./Show";

const Home = ({ isIOS }) => {
  const {
    selectedBlockOption,
    selectedFloorOption,
    setSelectedBlockOption,
    setSelectedFloorOption,
  } = useContext(MapContext);

useEffect(() => {
  window.setAtlasSection = (sectionKey) => {
    const match = sectionKey.match(/^(first|second|third)(C1\.1|C1\.2|C1\.3)$/);

    if (!match) return;

    const floor = match[1];
    const block = match[2];

    // 💥 убиваем любые сбросы
    setTimeout(() => {
      setSelectedFloorOption(floor);
      setSelectedBlockOption(block);
    }, 0);

    setTimeout(() => {
      setSelectedFloorOption(floor);
      setSelectedBlockOption(block);
    }, 100);

    setTimeout(() => {
      setSelectedFloorOption(floor);
      setSelectedBlockOption(block);
    }, 300);
  };

  return () => {
    delete window.setAtlasSection;
  };
}, [setSelectedBlockOption, setSelectedFloorOption]);
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 6,
          right: 10,
          zIndex: 9999,
          color: "red",
          fontSize: "12px",
          fontWeight: 700,
        }}
      >
        {selectedFloorOption + selectedBlockOption}
      </div>

      <FloorOption />
      <Search />
      <Sidebar />
      {isIOS ? (
        <ShowIOS
          selectedFloorBlockOption={selectedFloorOption + selectedBlockOption}
        />
      ) : (
        <Show
          selectedFloorBlockOption={selectedFloorOption + selectedBlockOption}
        />
      )}
    </>
  );
};

export default Home;