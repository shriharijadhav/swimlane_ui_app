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
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Move Block</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Select Target Lane</FormLabel>
            <Select
              value={selectedLane}
              onChange={(e) => setSelectedLane(e.target.value)}
            >
              <option value="">Select lane</option>
              {lanes.map((lane, index) => (
                <option key={index} value={index + 1}>
                  {lane.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleMove} mr={3}>
            Move
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MoveBlockModal;
