import { createContext, useState } from "react";

export const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [selectedBlockOption, setSelectedBlockOption] = useState("C1.1");
  const [selectedFloorOption, setSelectedFloorOption] = useState("first");

  return (
    <MapContext.Provider
      value={{
        selectedBlockOption,
        setSelectedBlockOption,
        selectedFloorOption,
        setSelectedFloorOption,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;