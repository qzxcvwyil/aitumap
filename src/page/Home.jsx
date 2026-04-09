import { useContext, useEffect, useState } from "react";
import { Sidebar, Search, FloorOption } from "../components";
import { MapContext } from "../shared";
import ShowIOS from "./ShowIOS";
import Show from "./Show";

const Home = ({ isIOS }) => {
  const { selectedBlockOption, selectedFloorOption } = useContext(MapContext);

  // Главный фикс: отдельное состояние только для Flutter
  const [forcedSelection, setForcedSelection] = useState("firstC1.1");

  useEffect(() => {
    window.setAtlasSection = (sectionKey) => {
      const allowed = [
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

      if (!allowed.includes(sectionKey)) return;

      setForcedSelection(sectionKey);
      document.title = `forced:${sectionKey}`;
      console.log("FORCED SECTION:", sectionKey);
    };

    return () => {
      delete window.setAtlasSection;
    };
  }, []);

  const currentSelection =
      forcedSelection || (selectedFloorOption + selectedBlockOption);

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
        {currentSelection}
      </div>

      

      {isIOS ? (
        <ShowIOS selectedFloorBlockOption={currentSelection} />
      ) : (
        <Show selectedFloorBlockOption={currentSelection} />
      )}
    </>
  );
};

export default Home;