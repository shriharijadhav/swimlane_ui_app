import React from 'react';
import { Box, Heading, VStack, Divider, IconButton } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import MovableItem from './MovableItem';

const Lane = ({ lane, laneIndex, moveBlock, deleteBlock, onOpenModal }) => {
  return (
    <Box
      bg="linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
      p={6}
      borderRadius="lg"
      m={4}
      w={{ base: "100%", md: "320px" }} // Responsive width
      boxShadow="2xl"
      position="relative"
      minH="400px"
      _hover={{ transform: "scale(1.03)", transition: "0.3s ease-in-out" }} // Hover effect
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="lg" color="white" fontWeight="bold">
          {lane.name}
        </Heading>
        
      </Box>
      <Divider borderColor="whiteAlpha.800" mb={4} />

      <VStack spacing={4} align="stretch">
        {lane.items.map((item, index) => (
          <MovableItem
            key={index}
            item={item}
            index={index}
            laneIndex={laneIndex}
            onOpenModal={onOpenModal}
            deleteBlock={deleteBlock}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Lane;
