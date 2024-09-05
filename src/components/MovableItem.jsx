import React from 'react';
import { useDrag } from 'react-dnd';
import { Box, Text, Tooltip, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, IconButton } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';

const MovableItem = ({ item, index, laneIndex, onOpenModal, deleteBlock }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'BLOCK',
    item: { index, laneIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      // Handle the end of dragging here if needed
    },
  });

  React.useEffect(() => {
    if (isDragging) {
      onOpenModal(index, laneIndex);
    }
  }, [isDragging, index, laneIndex, onOpenModal]);

  return (
    <Popover>
      <PopoverTrigger>
        <Box
          ref={drag}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgGradient="linear(to-r, #7928CA, #FF0080)" // Gradient background for modern look
          p={5}
          mb={3}
          borderRadius="lg"
          opacity={isDragging ? 0.7 : 1}
          cursor="grab"
          boxShadow="lg"
          transition="transform 0.2s ease"
          _hover={{ transform: "scale(1.05)", cursor: 'pointer' }} // Apply hover effect and pointer cursor
          w="100%"
        >
          {/* Left Section with Block Name */}
          <Box display="flex" flexDirection="column">
            <Text color="white" fontWeight="bold" fontSize="lg">
              {item.divName}
            </Text>
          </Box>

          {/* Right Section with Delete Button */}
          <Box display="flex" gap={2}>
            {/* Delete Button */}
            <Tooltip label="Delete Block" aria-label="Delete Tooltip">
              <IconButton
                size="sm"
                icon={<FiTrash2 />}
                aria-label="Delete Block"
                colorScheme="red"
                onClick={() => deleteBlock(index, laneIndex)}
              />
            </Tooltip>
          </Box>
        </Box>
      </PopoverTrigger>
      
      {/* Popover Content */}
      <PopoverContent bg="white" color="black" w="200px">
        <PopoverHeader fontWeight="bold" border="0">
          Block History
        </PopoverHeader>
        <PopoverBody>
          {item.history.length > 0 ? (
            item.history.map((entry, idx) => (
              <Text key={idx} mb={1}>
                {entry}
              </Text>
            ))
          ) : (
            <Text>No history available</Text>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default MovableItem;
