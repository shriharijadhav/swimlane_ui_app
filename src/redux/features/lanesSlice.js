import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lanes: [
    { name: 'Lane 1', items: [] },
    { name: 'Lane 2', items: [] },
    { name: 'Lane 3', items: [] },
  ],
  rules: [],
};

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
    moveBlock: (state, action) => {
      const { blockIndex, sourceLaneIndex, targetLaneIndex } = action.payload;

      // Ensure indices are valid
      if (state.lanes[sourceLaneIndex] && state.lanes[targetLaneIndex]) {
        // Remove block from source lane
        const [movedItem] = state.lanes[sourceLaneIndex].items.splice(blockIndex, 1);

        // Add block to target lane
        if (movedItem) {
          movedItem.history.push(`Moved from ${state.lanes[sourceLaneIndex].name} to ${state.lanes[targetLaneIndex].name}`);
          state.lanes[targetLaneIndex].items.push(movedItem);
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
  },
});

export const { addBlock, moveBlock, deleteBlock, addRule } = lanesSlice.actions;
export default lanesSlice.reducer;
