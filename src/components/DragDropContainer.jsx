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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import MoveBlockModal from './MoveBlockModal';
import Lane from './Lane';
import { useDispatch, useSelector } from 'react-redux';
import { addBlock, moveBlock, deleteBlock, addRule, deleteRule } from '../redux/features/lanesSlice'; 
import { DeleteIcon } from '@chakra-ui/icons';

const DragDropContainer = () => {
  const dispatch = useDispatch();
  const lanes = useSelector((state) => state.lanes.lanes);
  const rules = useSelector((state) => state.lanes.rules);

  const [blockName, setBlockName] = useState('');
  const [selectedLane, setSelectedLane] = useState(0);
  const [moveBlockData, setMoveBlockData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRule, setNewRule] = useState({ from: '', to: '', action: 'allow' });
  const toast = useToast();
  const [isMobile] = useMediaQuery('(max-width: 48em)');

  const handleAddBlock = () => {
    if (blockName.trim()) {
      dispatch(addBlock({ laneIndex: selectedLane, blockName }));
      setBlockName('');
    }
  };

  const handleRuleChange = (e) => {
    const { name, value } = e.target;
    setNewRule({ ...newRule, [name]: value });
  };

  const addRuleHandler = () => {
    if (newRule.from !== '' && newRule.to !== '') {
      dispatch(addRule(newRule));
      setNewRule({ from: '', to: '', action: 'allow' });
    }
  };

  const moveBlockHandler = (blockIndex, sourceLaneIndex, targetLaneIndex) => {
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

    dispatch(moveBlock({ blockIndex, sourceLaneIndex, targetLaneIndex }));
  };

  const deleteBlockHandler = (blockIndex, laneIndex) => {
    dispatch(deleteBlock({ blockIndex, laneIndex }));
  };

  const onOpenModal = (blockIndex, sourceLaneIndex) => {
    setMoveBlockData({ blockIndex, sourceLaneIndex });
    setIsModalOpen(true);
  };

  const onMoveBlock = (blockIndex, sourceLaneIndex, targetLaneIndex) => {
    moveBlockHandler(blockIndex, sourceLaneIndex, targetLaneIndex);
    setMoveBlockData(null);
  };

  return (
    <ChakraProvider>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Container maxW="container.xl" py={6} px={8} bgGradient="linear(to-r, teal.100, blue.100)">
          <Flex direction={'column'} w={'100%'} justifyContent={'center'} alignItems={'center'}>
            <Heading size="2xl" color="teal.600" mb={4}>
              Swimlane - Enhanced Drag and Drop UI
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
                    moveBlock={moveBlockHandler}
                    deleteBlock={deleteBlockHandler}
                    onOpenModal={onOpenModal}
                  />
                </Box>
              ))}
            </Flex>

            {/* Manage Rules Section */}
            <Box bg="purple.300" borderRadius="lg" boxShadow="lg" p={6} mt={6} w="100%">
              <Accordion allowToggle>
                <AccordionItem border="none">
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        _expanded={{ bg: 'purple.200', color: 'white' }}
                        p={4}
                        borderRadius="lg"
                        mb={4}
                      >
                        <Box flex="1" textAlign="left">
                          <Heading size="lg">Manage Block Movement Rules<Text as={'span'} fontSize={'lg'} p={'0 10px'}>(click to expand)</Text></Heading>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <Stack direction={isMobile ? 'column' : 'row'} justifyContent={'center'} alignItems={'center'} spacing={6}>
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
                          <Button p={'10px 30px'} colorScheme="teal"
                          onClick={addRuleHandler}
                          aria-label="Add Rule"

                          >
                          Add Rule
                        </Button>
                          
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
                            <Box display={'flex'} gap={'2'} justifyContent={'center'} alignItems={'center'} w={'max-content'}>
                              <Text key={index}>
                              From Lane {rule.from} to Lane {rule.to}: {rule.action}
                            </Text>
                            <IconButton onClick={()=>{dispatch(deleteRule(index))}} title='Delete Rule' colorScheme='red' icon={<DeleteIcon/>}/>
                            </Box>
                          ))
                        )}
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </Box>

            {/* Add Block Section */}
            <Box bg="purple.300" textColor={'white'} color={'white'} borderRadius="lg" boxShadow="lg" p={6} w="100%">
              <Stack direction={isMobile ? 'column' : 'row'} justifyContent={'center'} alignItems={'center'} spacing={6} align="center">
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
                    onChange={(e) => setSelectedLane(Number(e.target.value))}
                  >
                    <option value="">Select Lane</option>
                    {lanes.map((lane, index) => (
                      <option key={index} value={index}>
                        {lane.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <Button p={'10px 30px'} colorScheme="teal" onClick={handleAddBlock}>
                  Add Block
                </Button>
              </Stack>
            </Box>
          </Flex>

          {/* Move Block Modal */}
          <MoveBlockModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            blockIndex={moveBlockData?.blockIndex}
            sourceLaneIndex={moveBlockData?.sourceLaneIndex}
            onMoveBlock={onMoveBlock}
            lanes={lanes}
          />
        </Container>
      </DndProvider>
    </ChakraProvider>
  );
};

export default DragDropContainer;
