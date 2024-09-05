import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import {
  Box,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
  useToast,
  useMediaQuery,
  Text,
  IconButton,
  Stack,
  Divider,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import MoveBlockModal from './MoveBlockModal';
import Lane from './Lane';

const DragDropContainer = () => {
  const [lanes, setLanes] = useState([
    { name: 'Lane 1', items: [] },
    { name: 'Lane 2', items: [] },
    { name: 'Lane 3', items: [] },
  ]);
  const [blockName, setBlockName] = useState('');
  const [selectedLane, setSelectedLane] = useState(0);
  const [moveBlockData, setMoveBlockData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState({ from: '', to: '', action: 'allow' });
  const toast = useToast();
  const [isMobile] = useMediaQuery('(max-width: 48em)');

  const moveBlock = (blockIndex, sourceLaneIndex, targetLaneIndex) => {
    const sourceLaneIndexStr = (sourceLaneIndex + 1).toString();
    const targetLaneIndexStr = (targetLaneIndex + 1).toString();

    const rule = rules.find(
      (r) => r.from === sourceLaneIndexStr && r.to === targetLaneIndexStr
    );

    if (rule && rule.action === 'deny') {
      toast({
        title: 'Move Denied',
        description: `You are not allowed to move blocks from Lane ${sourceLaneIndex + 1} to Lane ${targetLaneIndex + 1}.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const updatedLanes = [...lanes];
    const [movedItem] = updatedLanes[sourceLaneIndex].items.splice(blockIndex, 1);
    movedItem.history.push(`Moved from ${updatedLanes[sourceLaneIndex].name} to ${updatedLanes[targetLaneIndex].name}`);
    updatedLanes[targetLaneIndex].items.push(movedItem);
    setLanes(updatedLanes);
  };

  const handleAddBlock = () => {
    if (blockName.trim()) {
      const updatedLanes = [...lanes];
      updatedLanes[selectedLane].items.push({
        divName: blockName,
        history: [],
      });
      setLanes(updatedLanes);
      setBlockName('');
    }
  };

  const handleRuleChange = (e) => {
    const { name, value } = e.target;
    setNewRule({ ...newRule, [name]: value });
  };

  const addRule = () => {
    if (newRule.from !== '' && newRule.to !== '') {
      setRules([...rules, newRule]);
      setNewRule({ from: '', to: '', action: 'allow' });
    }
  };

  const onOpenModal = (blockIndex, sourceLaneIndex) => {
    setMoveBlockData({ blockIndex, sourceLaneIndex });
    setIsModalOpen(true);
  };

  const onMoveBlock = (blockIndex, sourceLaneIndex, targetLaneIndex) => {
    moveBlock(blockIndex, sourceLaneIndex, targetLaneIndex);
    setMoveBlockData(null);
  };

  const deleteBlock = (blockIndex, laneIndex) => {
    const updatedLanes = [...lanes];
    updatedLanes[laneIndex].items.splice(blockIndex, 1);
    setLanes(updatedLanes);
  };

  return (
    <ChakraProvider>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Container maxW="container.xl" py={6} px={8} bgGradient="linear(to-r, teal.100, blue.100)">
        <Flex direction={'column'} w={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Heading size="2xl" color="teal.600" mb={4}>
              Swimlane  -Enhanced Drag and Drop UI
            </Heading>
            <Text color="gray.700" fontSize="lg" mb={8}>
              Organize your blocks with dynamic lanes and customizable rules
            </Text>
        </Flex>
          <Flex direction="column-reverse" gap={'20px'} alignItems="center" mb={6}>
           

            {/* Lanes Section */}
            <Flex direction={isMobile ? 'column' : 'row'} mb={6} w="100%" justifyContent="space-between">
              {lanes.map((lane, index) => (
                <Box key={index} w={isMobile ? '100%' : '30%'} mb={isMobile ? 6 : 0} p={4} bg="white" borderRadius="lg" boxShadow="lg">
                  <Lane
                    lane={lane}
                    laneIndex={index}
                    moveBlock={moveBlock}
                    deleteBlock={deleteBlock}
                    onOpenModal={onOpenModal}
                  />
                </Box>
              ))}
            </Flex>

            {/* Add Block Section */}
            <Box bg="purple.400" textColor={'white'} color={'white'} borderRadius="lg" boxShadow="lg" p={6} w="100%">
              <Stack direction={isMobile ? 'column' : 'row'} spacing={6} align="center">
                <FormControl id="block-name">
                  <FormLabel>Block Name</FormLabel>
                  <Input 
                    value={blockName}
                    color={'black'}
                    onChange={(e) => setBlockName(e.target.value)}
                    placeholder="Enter block name"
                    
                  />
                </FormControl>
                <FormControl id="lane-select">
                  <FormLabel>Select Lane</FormLabel>
                  <Select
                    value={selectedLane}
                    onChange={(e) => setSelectedLane(parseInt(e.target.value, 10))}
                  >
                    {lanes.map((lane, index) => (
                      <option key={index} value={index}>
                        {lane.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <IconButton
                  icon={<FaPlus />}
                  colorScheme="teal"
                  onClick={handleAddBlock}
                  aria-label="Add Block"
                />
              </Stack>
            </Box>

            {/* Manage Rules Section */}
            <Box bg="purple.400" borderRadius="lg" boxShadow="lg" p={6} mt={6} w="100%">
              <Heading size="lg" mb={4}>
                Manage Block Movement Rules
              </Heading>
              <Stack direction={isMobile ? 'column' : 'row'} spacing={6}>
                <FormControl id="from-lane">
                  <FormLabel>From Lane</FormLabel>
                  <Select
                    name="from"
                    value={newRule.from}
                    onChange={handleRuleChange}
                  >
                    <option value="">Select Lane</option>
                    {lanes.map((lane, index) => (
                      <option key={index + 1} value={index + 1}>
                        {lane.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="to-lane">
                  <FormLabel>To Lane</FormLabel>
                  <Select
                    name="to"
                    value={newRule.to}
                    onChange={handleRuleChange}
                  >
                    <option value="">Select Lane</option>
                    {lanes.map((lane, index) => (
                      <option key={index + 1} value={index + 1}>
                        {lane.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="action">
                  <FormLabel>Action</FormLabel>
                  <Select
                    name="action"
                    value={newRule.action}
                    onChange={handleRuleChange}
                  >
                    <option value="allow">Allow</option>
                    <option value="deny">Deny</option>
                  </Select>
                </FormControl>

                <IconButton
                  icon={<FaPlus />}
                  colorScheme="teal"
                  onClick={addRule}
                  aria-label="Add Rule"
                />
                
              </Stack>

              {/* Display Rules */}
              <Divider my={4} />
              <Heading size="md" mb={2}>
                Active Rules
              </Heading>
              {rules.length === 0 ? (
                <Text>No rules defined yet</Text>
              ) : (
                rules.map((rule, index) => (
                  <Text key={index}>
                    From Lane {rule.from} to Lane {rule.to}: {rule.action}
                  </Text>
                ))
              )}
            </Box>
          </Flex>
        </Container>

        {moveBlockData && (
          <MoveBlockModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            lanes={lanes}
            onMoveBlock={onMoveBlock}
            blockIndex={moveBlockData.blockIndex}
            sourceLaneIndex={moveBlockData.sourceLaneIndex}
          />
        )}
      </DndProvider>
    </ChakraProvider>
  );
};

export default DragDropContainer;
