import type { SlotRecipeConfig } from "@chakra-ui/react";
import { comboboxSlotRecipe } from "./combobox";

const slotRecipes: Record<string, SlotRecipeConfig> = {
  combobox: comboboxSlotRecipe,
};

export default slotRecipes;
