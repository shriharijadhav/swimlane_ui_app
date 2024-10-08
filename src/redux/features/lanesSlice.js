import { createSlice } from '@reduxjs/toolkit';

// Function to load state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('lanesState');
    if (serializedState === null) {
      return {
        lanes: [
          { name: 'Lane 1', items: [] },
          { name: 'Lane 2', items: [] },
          { name: 'Lane 3', items: [] },
        ],
        rules: [],
      }; // Default initialState if nothing is in localStorage
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from localStorage:", err);
    return {
      lanes: [
        { name: 'Lane 1', items: [] },
        { name: 'Lane 2', items: [] },
        { name: 'Lane 3', items: [] },
      ],
      rules: [],
    };
  }
};

// Function to save state to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('lanesState', serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage:", err);
  }
};

const initialState = loadFromLocalStorage();

const lanesSlice = createSlice({
  name: 'lanes',
  initialState,
  reducers: {
    addBlock: (state, action) => {
      const { laneIndex, blockName } = action.payload;
      state.lanes[laneIndex].items.push({
        divName: blockName,
        history: [],
      });
    },
    moveBlock(state, action) {
      const { blockIndex, sourceLaneIndex, targetLaneIndex, targetBlockIndex } = action.payload;
    
      // Ensure indices are valid
      if (state.lanes[sourceLaneIndex] && state.lanes[targetLaneIndex]) {
        // Handle movement within the same lane
        if (sourceLaneIndex === targetLaneIndex  ) {
          // Reorder blocks within the same lane
          const [movedItem] = state.lanes[sourceLaneIndex].items.splice(blockIndex, 1);
          state.lanes[sourceLaneIndex].items.splice(targetBlockIndex, 0, movedItem);
          // Update history for reordering
          if(state.lanes[targetLaneIndex].items.length>1){    
            movedItem.history.push({
              action: 'Movement',
              detail: `Reordered from position ${blockIndex+1} to position ${targetBlockIndex+1} in ${state.lanes[sourceLaneIndex].name}`,
              timestamp: new Date().toISOString(),
            });
          }
          
        } else {
          // Handle movement between different lanes
          const [movedItem] = state.lanes[sourceLaneIndex].items.splice(blockIndex, 1);
          if (movedItem) {
            movedItem.history.push({
              action: 'Movement',
              detail: `Moved from ${state.lanes[sourceLaneIndex].name} to ${state.lanes[targetLaneIndex].name}`,
              timestamp: new Date().toISOString(),
            });
            state.lanes[targetLaneIndex].items.push(movedItem);
          }
        }
      }
    },
    deleteBlock: (state, action) => {
      const { blockIndex, laneIndex } = action.payload;
      state.lanes[laneIndex].items.splice(blockIndex, 1);
    },
    addRule: (state, action) => {
      state.rules.push(action.payload);
    },
    deleteRule:(state,action)=>{
      state.rules.splice(action.payload, 1);
    },
    editMyBlockName: (state, action) => {
      const { index, laneIndex, newName } = action.payload;
      const tempName = state.lanes[laneIndex].items[index].divName;
      state.lanes[laneIndex].items[index].divName = newName;

      const now = new Date();
      const timestamp = now.toISOString(); // ISO format for date and time

      state.lanes[laneIndex].items[index].history.push({
        action: 'Edit',
        detail: `Changed from ${tempName} to ${newName}`,
        timestamp,
      });
    },
  },
});

// Middleware to persist the state to localStorage after every action
const persistStateMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  saveToLocalStorage(storeAPI.getState().lanes);
  return result;
};

export const { addBlock, moveBlock, deleteBlock, editMyBlockName, addRule,deleteRule } = lanesSlice.actions;
export default lanesSlice.reducer;
export { persistStateMiddleware };
