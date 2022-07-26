import { CloseIcon } from "@chakra-ui/icons";
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
import AddNewModal from "../../components/AddNewModal";

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditMode, setIsEditMode] = useState(false);
  const boxBG = useColorModeValue("gray.300", "blackAlpha.500");
  const [data, setData] = useState([
    {
      name: "Portainer",
      url: "https://portainer.captain-nemo.xyz/",
    },
    {
      name: "Dozzle",
      url: "https://dozzle.captain-nemo.xyz/",
    },
    {
      name: "blog",
      url: "https://blog.captain-nemo.xyz/",
    },
    {
      name: "localhost",
      url: "http://localhost:3000",
    },
    {
      name: "Files",
      url: "https://file.captain-nemo.xyz",
    },
    {
      name: "Google",
      url: "https://www.google.com",
    },
  ]);

  const addNew = ({ name, url }) => {
    setData([...data, { name, url }]);
  };

  const deleteItem = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <Box p={4}>
      <Button mb={6} onClick={onOpen}>
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
      <AddNewModal isOpen={isOpen} onClose={onClose} onSubmit={addNew} />
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
                window.open(item.url, "_blank");
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
                    console.log(`delete ${item.name}`);
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
    </Box>
  );
}