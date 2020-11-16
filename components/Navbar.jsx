import { useRef } from "react";
import {
  Box,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/core";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/core";
import Link from "@/components/Link";
import { FaSun, FaMoon, FaBars } from "react-icons/fa";
import { useUser } from "@/utils/useUser";
import displayName from "@/utils/displayName";
const Navbar = () => {
  const Icons = useColorModeValue(<FaSun />, <FaMoon />);
  const color = useColorModeValue("gray.800", "white");
  const bgDrawer = useColorModeValue("white", "black");
  const { toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { user, logout } = useUser();
  return (
    <>
      <Box w="full" mx="10px" height="50px">
        <Stack
          px={{ base: 2, md: 0 }}
          h="full"
          m="auto"
          maxW={[null, null, "2xl", "6xl"]}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row">
            <Stack
              spacing={5}
              direction="row"
              d={{ base: "none", lg: "flex" }}
              align="center"
            >
              <Link href="/" route fontWeight="bold" color={color}>
                Home
              </Link>
              <Link route href="/about" color={color}>
                About
              </Link>
            </Stack>
          </Stack>

          <Stack direction="row">
            <Stack
              spacing={5}
              direction="row"
              d={{ base: "none", lg: "flex" }}
              align="center"
            >
              {user ? (
                <>
                  <Link route href="#" color={color}>
                    hi, {displayName(user.displayName)}
                  </Link>
                  <Link route href="#" color={color} onClick={logout}>
                    Logout
                  </Link>
                </>
              ) : (
                <Link route href="/signIn" color={color} onClick={logout}>
                  Sign in
                </Link>
              )}
            </Stack>
            <IconButton
              variant="transparent"
              size="sm"
              onClick={toggleColorMode}
              icon={Icons}
            />
            <IconButton
              d={{ base: "flex", lg: "none" }}
              variant="transparent"
              size="sm"
              onClick={onOpen}
              icon={<FaBars />}
            />
          </Stack>
        </Stack>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent bg={bgDrawer}>
            <DrawerCloseButton />
            <DrawerHeader>Edufair covid edition</DrawerHeader>
            <DrawerBody>
              <Stack>
                <Link p="2" route href="/about" color={color}>
                  About
                </Link>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Navbar;
