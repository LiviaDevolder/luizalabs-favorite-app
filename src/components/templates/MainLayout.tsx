import { Box, Flex, Heading } from "@chakra-ui/react";
import { type ReactNode } from "react";
import { MagaluIcon } from "../atoms/MagaluIcon";
import { FavoriteIcon } from "../atoms/FavoriteIcon";
import { useFavoritesStore } from "../../stores/favoritesStore";
import { ProductSearchBar } from "../molecules/ProductSearchBar";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuthStore } from "../../stores";
import { Header } from "../organisms/Header";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box bg={"gray.100"} minH="100vh">
      <Header />
      <Box as="main" py={{ base: 2, md: 4 }} maxWidth="6xl" mx={"auto"}>
        {children}
      </Box>
    </Box>
  );
};
