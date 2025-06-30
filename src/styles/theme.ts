import { createSystem, defaultConfig } from "@chakra-ui/react";
import slotRecipes from "./slotRecipes";

export const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        primary: { value: "#0086FF" },
        secondary: { value: "#FCD002" },
      },
      fonts: {
        heading: { value: "Roboto, sans-serif" },
        body: { value: "Roboto, sans-serif" },
      },
    },
    slotRecipes,
  },
});
