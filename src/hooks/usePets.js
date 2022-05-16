import { useContext } from "react";
import PetsContext from "../contexts/PetsContext";

export default function usePets() {
  return useContext(PetsContext);
}
