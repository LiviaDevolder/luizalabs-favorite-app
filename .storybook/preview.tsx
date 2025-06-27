import { ChakraProvider } from "@chakra-ui/react";
import type { Preview } from "@storybook/react-webpack5";
import { theme } from "../src/styles/theme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider value={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default preview;
