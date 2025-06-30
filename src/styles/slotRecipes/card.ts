import { defineSlotRecipe } from "@chakra-ui/react";

export const cardSlotRecipe = defineSlotRecipe({
  slots: ["root", "body"],
  base: {
    root: {
      border: "none",
      _hover: {
        boxShadow: "rgba(81, 81, 81, 0.12) 0px 2px 12px",
        transition: "box-shadow 0.4s",
      },
    },
    body: {
      p: "10px",
    },
  },
});
