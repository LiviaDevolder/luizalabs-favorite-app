import { Box, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuthStore } from "../../stores";
import { useFavoritesStore } from "../../stores/favoritesStore";
import { MagaluIcon } from "../atoms/MagaluIcon";
import { FavoriteIcon } from "../atoms/FavoriteIcon";
import { ProductSearchBar } from "../molecules/ProductSearchBar";

export const Header = () => {
  const navigate = useNavigate();

  const favoritesCount = useFavoritesStore(
    (state) => state.list?.items.length ?? 0
  );
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Flex
      as="header"
      bg={"primary"}
      p={{ base: 4, md: 3 }}
      borderBottomWidth="1px"
      boxShadow="sm"
    >
      <Flex
        w={"100%"}
        justifyContent="space-between"
        alignItems="center"
        gap={{ base: 4, md: 6 }}
        maxWidth="6xl"
        mx="auto"
        flexWrap="wrap"
      >
        <Flex
          alignItems={"center"}
          flexDir={"column"}
          cursor={"pointer"}
          onClick={() => navigate("/")}
          order={{ base: 1, md: 1 }}
        >
          <MagaluIcon h={"30px"} viewBox="0 0 60 13" color={"white"} />
          <Heading as="h1" size="lg" color="white">
            Favoritos
          </Heading>
        </Flex>

        <Box
          flexGrow={1}
          w={{ base: "100%", md: "auto" }}
          order={{ base: 4, md: 2 }}
        >
          <ProductSearchBar />
        </Box>

        <Flex gap={"16px"} order={{ base: 2, md: 3 }} alignItems={"center"}>
          <Box
            position="relative"
            cursor={"pointer"}
            onClick={() => navigate("/favorites")}
          >
            <FavoriteIcon h={"30px"} viewBox={"0 0 29 25"} color={"white"} />
            {favoritesCount > 0 && (
              <Flex
                position="absolute"
                bottom="-5px"
                right="-5px"
                boxSize="20px"
                borderRadius="full"
                bg="rgb(88, 194, 46)"
                color="white"
                fontSize="xs"
                fontWeight="bold"
                justifyContent="center"
                alignItems="center"
                border="2px solid"
                borderColor={"primary"}
              >
                {favoritesCount}
              </Flex>
            )}
          </Box>
          <Box cursor={"pointer"} onClick={handleLogout}>
            <FiLogOut size={"24px"} color="white" />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
