import { Box, Flex, Heading } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { useColorModeValue } from '../ui/color-mode';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const headerBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bgColor} minH="100vh">
      <Flex
        as="header"
        bg={headerBgColor}
        p={4}
        borderBottomWidth="1px"
        boxShadow="sm"
        justify="center"
      >
        <Heading as="h1" size="lg" color="teal.500">
          LuizaLabs Favorites
        </Heading>
      </Flex>
      <Box as="main" p={{ base: 2, md: 4 }}>
        {children}
      </Box>
    </Box>
  );
};