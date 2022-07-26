import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ItemModal({ data, isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState("add");

  useEffect(() => {
    if (data) {
      setName(data.name);
      setUrl(data.url);
      setMode("edit");
    }
  }, [data]);

  const reset = () => {
    setName("");
    setUrl("");
    setMode("add");
  };

  const onCloseModal = () => {
    reset();
    onClose();
  };

  const onSubmitModal = () => {
    if (onSubmit) {
      onSubmit({ name, url: url.trim() });
      onCloseModal();
    }
  };

  const isEditMode = mode === "edit";
  const disableSubmit = !name || !url;

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditMode ? "Edit" : "Add"} Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Name"
            variant="filled"
            mb={3}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !disableSubmit) {
                onSubmitModal();
              }
            }}
            value={name}
          />
          <Input
            placeholder="https://example.com"
            variant="filled"
            mb={3}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !disableSubmit) {
                onSubmitModal();
              }
            }}
            value={url}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            disabled={disableSubmit}
            onClick={onSubmitModal}
          >
            {isEditMode ? "Update" : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
