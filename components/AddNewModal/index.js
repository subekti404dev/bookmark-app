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
import { useState } from "react";

export default function AddNewModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const reset = () => {
    setName("");
    setUrl("");
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Name"
            variant="filled"
            mb={3}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="https://example.com"
            variant="filled"
            mb={3}
            onChange={(e) => setUrl(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            disabled={!name || !url}
            onClick={() => {
              if (onSubmit) {
                onSubmit({ name, url: url.trim() });
                reset();
                onClose();
              }
            }}
          >
            Add
          </Button>
         
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
