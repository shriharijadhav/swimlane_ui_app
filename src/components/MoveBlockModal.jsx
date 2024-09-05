import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  Box,
  Text,
} from '@chakra-ui/react';

const MoveBlockModal = ({ isOpen, onClose, lanes, onMoveBlock, blockIndex, sourceLaneIndex }) => {
  const [selectedLane, setSelectedLane] = useState('');

  const handleMove = () => {
    if (selectedLane !== '') {
      onMoveBlock(blockIndex, sourceLaneIndex, parseInt(selectedLane, 10) - 1);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent
        bg="purple.300"
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        maxW="sm"
      >
        <ModalHeader fontSize="lg" fontWeight="bold">
          Move Block
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text fontSize="sm" mb={2} color="gray.600">
              Choose the target lane to move the block.
            </Text>
            <FormControl>
              <FormLabel>Select Target Lane</FormLabel>
              <Select
                value={selectedLane}
                onChange={(e) => setSelectedLane(e.target.value)}
                placeholder="Select lane"
                variant="outline"
                borderColor="purple.400.300"
                focusBorderColor="teal.500"
              >
                {lanes.map((lane, index) => (
                  <option key={index} value={index + 1}>
                    {lane.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            onClick={handleMove}
            mr={3}
            _hover={{ bg: 'teal.600' }}
            _focus={{ boxShadow: 'none' }}
          >
            Move
          </Button>
          <Button
            variant="outline"
            colorScheme="gray"
            onClick={onClose}
            _hover={{ bg: 'gray.100' }}
            _focus={{ boxShadow: 'none' }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MoveBlockModal;
