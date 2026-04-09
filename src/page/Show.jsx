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

const Show = ({ selectedFloorBlockOption, selectedRoom }) => {
  switch (selectedFloorBlockOption) {
    case "firstC1.1":
      return <C1_1_1 selectedRoom={selectedRoom} />;
    case "secondC1.1":
      return <C1_1_2 selectedRoom={selectedRoom} />;
    case "thirdC1.1":
      return <C1_1_3 selectedRoom={selectedRoom} />;

    case "firstC1.2":
      return <C1_2_1 selectedRoom={selectedRoom} />;
    case "secondC1.2":
      return <C1_2_2 selectedRoom={selectedRoom} />;
    case "thirdC1.2":
      return <C1_2_3 selectedRoom={selectedRoom} />;

    case "firstC1.3":
      return <C1_3_1 selectedRoom={selectedRoom} />;
    case "secondC1.3":
      return <C1_3_2 selectedRoom={selectedRoom} />;
    case "thirdC1.3":
      return <C1_3_3 selectedRoom={selectedRoom} />;

    default:
      return <C1_1_1 selectedRoom={selectedRoom} />;
  }
};

export default Show;