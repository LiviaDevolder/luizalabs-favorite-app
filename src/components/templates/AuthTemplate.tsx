import type { ReactNode } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

interface AuthTemplateProps {
  children: ReactNode;
  title: string;
}

export const AuthTemplate = ({ children, title }: AuthTemplateProps) => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const boxBgColor = useColorModeValue("white", "gray.700");

  return (
    <Flex minH="100vh" align="center" justify="center" bg={bgColor}>
      <Box
        p={8}
        maxW="md"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={boxBgColor}
        w="100%"
      >
        <Box mb={6}>
          <Heading as="h1" size="lg" color="primary">
            {title}
          </Heading>
        </Box>

        {children}
      </Box>
    </Flex>
  );
};
