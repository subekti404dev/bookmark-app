import { CloseIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Image,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import ItemModal from "../components/ItemModal";
import ThemeToggle from "../components/ThemeToggle";
import useData from "../hooks/useData";

export default function Dashboard() {
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();
  const [isEditMode, setIsEditMode] = useState(false);

  const boxBG = useColorModeValue("gray.300", "blackAlpha.500");
  const { data, onClickSubmit, deleteItem, dataToUpdate, setIndexItemToEdit } =
    useData();

  const onClose = () => {
    setIndexItemToEdit();
    onCloseModal();
  };

  return (
    <Box p={4}>
      <Flex>
        <Flex flex={1}>
          <Button
            mb={6}
            onClick={() => {
              setIndexItemToEdit();
              onOpen();
            }}
          >
            Add
          </Button>
          <Button
            mb={6}
            ml={2}
            onClick={() => {
              setIsEditMode(!isEditMode);
            }}
          >
            {isEditMode ? "Done Edit" : "Edit Mode"}
          </Button>
        </Flex>
        <ThemeToggle />
      </Flex>
      <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={3}>
        {data.map((item, i) => {
          const domain = item.url.split("/")[2];
          const iconUrl = `https://urban-purple-guppy.faviconkit.com/${domain}/128`;
          const defaultIcon = "/default_icon.png";

          return (
            <Box
              key={i}
              bg={boxBG}
              height="80px"
              borderRadius={8}
              cursor="pointer"
              position={"relative"}
              onClick={() => {
                if (isEditMode) {
                  setIndexItemToEdit(i);
                  onOpen();
                } else {
                  window.open(item.url, "_blank");
                }
              }}
            >
              {isEditMode && (
                <Box
                  position={"absolute"}
                  w={5}
                  h={5}
                  right={1}
                  m={1}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  _hover={{ backgroundColor: "red.500", borderRadius: 5 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(i);
                  }}
                >
                  <CloseIcon w={3} h={3} />
                </Box>
              )}
              <Flex
                paddingX={3}
                justifyContent={"center"}
                alignItems={"center"}
                height="80px"
              >
                <Image
                  width={50}
                  height={50}
                  src={iconUrl}
                  fallbackSrc={defaultIcon}
                  borderRadius={8}
                />
                <Box flex={1} marginX={4} fontSize={22}>
                  {item.name}
                </Box>
              </Flex>
            </Box>
          );
        })}
      </SimpleGrid>
      <ItemModal
        isOpen={isOpen}
        onClose={onClose}
        data={dataToUpdate}
        onSubmit={onClickSubmit}
      />
    </Box>
  );
}
