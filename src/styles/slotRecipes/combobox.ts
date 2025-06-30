import { defineSlotRecipe } from "@chakra-ui/react";

export const comboboxSlotRecipe = defineSlotRecipe({
  slots: ["root", "input"],
  base: {
    root: {
      bgColor: "white",
    },
    input: {
      p: "4px 8px",
      borderRadius: "0px",
      color: "#777777",
    },
  },
});
