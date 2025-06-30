import type { SlotRecipeConfig } from "@chakra-ui/react";
import { comboboxSlotRecipe } from "./combobox";
import { cardSlotRecipe } from "./card";

const slotRecipes: Record<string, SlotRecipeConfig> = {
  combobox: comboboxSlotRecipe,
  card: cardSlotRecipe,
};

export default slotRecipes;
