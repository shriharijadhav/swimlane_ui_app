import React, { useState, useRef } from 'react';
import { useDrag } from 'react-dnd';
import {
  Box, Text, Tooltip, IconButton, Popover, PopoverTrigger, PopoverContent, PopoverHeader,
  PopoverBody, Tabs, TabList, TabPanels, Tab, TabPanel, Input, Button, useDisclosure
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import { EditIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { editMyBlockName } from '../redux/features/lanesSlice';

const MovableItem = ({ item, index, laneIndex, deleteBlock }) => {
  const [editBlockIndex, setEditBlockIndex] = useState(null);
  const [editLaneIndex, setEditLaneIndex] = useState(null);
  const [newName, setNewName] = useState(item.divName);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const editHistoryMessages = item.history.filter((item) => item.action === 'Edit');
  const movementHistoryMessages = item.history.filter((item) => item.action === 'Movement');

  const [{ isDragging }, drag] = useDrag({
    type: 'BLOCK',
    item: { index, laneIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const formatDateInIST = (isoDateString) => {
    const date = new Date(isoDateString);
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' };
    const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Kolkata' };
    const timePart = new Intl.DateTimeFormat('en-IN', timeOptions).format(date);
    const datePart = new Intl.DateTimeFormat('en-IN', dateOptions).format(date);
    return `${timePart}, ${datePart}`;
  };

  const editBlockDetails = (index, laneIndex) => {
    setEditBlockIndex(index);
    setEditLaneIndex(laneIndex);
    setNewName(item.divName);
    onClose();  // Ensure popover is closed when in edit mode

    // Focus on input after edit mode is activated
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleSave = () => {
    dispatch(editMyBlockName({ index, laneIndex, newName }));
    setEditBlockIndex(null);
    setEditLaneIndex(null);
    onClose(); // Close popover after saving
  };

  const handleCancel = () => {
    setEditBlockIndex(null);
    setEditLaneIndex(null);
    onClose(); // Close popover after cancelling
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box
          ref={drag}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgGradient="linear(to-r, #7928CA, #FF0080)"
          p={5}
          mb={3}
          borderRadius="lg"
          opacity={isDragging ? 0.7 : 1}
          cursor="grab"
          boxShadow="lg"
          transition="transform 0.2s ease"
          _hover={{ transform: "scale(1.05)", cursor: 'pointer' }}
          w="100%"
          onClick={onOpen} // Open popover only on clicking the item box itself
        >
          {editBlockIndex === index && editLaneIndex === laneIndex ? (
            <Box display="flex" gap={'2'} flexDirection={'column'} w="100%" justifyContent="space-between">
              <Input
                ref={inputRef} // Attach the ref to the input field
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onClick={(e) => e.stopPropagation()} // Stop propagation to prevent popover
                placeholder="Enter new block name"
                size="sm"
                width="100%"
              />
              <Box display={'flex'} gap={'5'} justifyContent={'right'}>
                <Button size="sm" colorScheme="gray" variant={'outline'} onClick={(e)=>{ e.stopPropagation();handleCancel()}} >Cancel</Button>
                <Button size="sm" colorScheme="blue" onClick={(e)=>{ e.stopPropagation();handleSave()}}>Save</Button>
              </Box>
            </Box>
          ) : (
            <Box display="flex" justifyContent="space-between" alignItems="center" w={'100%'}>
              {/* Left Section with Block Name */}
              <Box display="flex" flexDirection="column">
                <Text color="white" fontWeight="bold" fontSize="lg">
                  {item.divName}
                </Text>
              </Box>

              {/* Right Section with Edit and Delete Buttons */}
              <Box display="flex" gap={2}>
                {/* Edit Button */}
                <Tooltip label="Edit Block" aria-label="Edit Tooltip">
                  <IconButton
                    size="sm"
                    icon={<EditIcon />}
                    aria-label="Edit Block"
                    colorScheme="blue"
                    onClick={(e) => { e.stopPropagation(); editBlockDetails(index, laneIndex); }} // Prevent triggering popover open
                  />
                </Tooltip>

                {/* Delete Button */}
                <Tooltip label="Delete Block" aria-label="Delete Tooltip">
                  <IconButton
                    size="sm"
                    icon={<FiTrash2 />}
                    aria-label="Delete Block"
                    colorScheme="red"
                    onClick={(e) => { e.stopPropagation(); deleteBlock(index, laneIndex); }} // Prevent triggering popover open
                  />
                </Tooltip>
              </Box>
            </Box>
          )}
        </Box>
      </PopoverTrigger>

      {/* Popover Content */}
      <PopoverContent rounded={'lg'} overflow={'hidden'} bg={'gray.200'} color="black" w="300px">
        <PopoverHeader   bgGradient={'linear(to-r, red.200, blue.200)'} fontWeight="bold">History</PopoverHeader>
        <PopoverBody  bgGradient={'linear(to-r, red.100, blue.100)'}>
          <Tabs variant="enclosed">
            <TabList w={'100%'}>
              <Tab w={'100%'} _selected={{ bgGradient: 'linear(to-r, teal.400, blue.500)', color: 'white' }}>Edit History</Tab>
              <Tab w={'100%'} _selected={{ bgGradient: 'linear(to-r, teal.400, blue.500)', color: 'white' }}>Movement History</Tab>
            </TabList>

            <TabPanels>
              <TabPanel bgGradient={'linear(to-r, teal.100, blue.200)'}>
                {editHistoryMessages.length === 0 ? (
                  <Text>No edit history for this block.</Text>
                ) : (
                  editHistoryMessages.map((history, idx) => (
                    <Box borderBottom={'1px solid gray'} key={idx}>
                      <Text>{history.detail}</Text>
                      <Text>at {formatDateInIST(history.timestamp)}</Text>
                    </Box>
                  ))
                )}
              </TabPanel>

              <TabPanel bgGradient={'linear(to-r, teal.100, blue.200)'}>
                {movementHistoryMessages.length === 0 ? (
                  <Text>No movement history for this block.</Text>
                ) : (
                  movementHistoryMessages.map((history, idx) => (
                    <Box borderBottom={'1px solid gray'} key={idx}>
                      <Text>{history.detail}</Text>
                      <Text>at {formatDateInIST(history.timestamp)}</Text>
                    </Box>
                  ))
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default MovableItem;
