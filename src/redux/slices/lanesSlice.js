import { createSlice } from '@reduxjs/toolkit';

const lanesSlice = createSlice({
  name: 'lanes',
  initialState: [
    { name: 'Lane 1', items: [] },
    { name: 'Lane 2', items: [] },
    { name: 'Lane 3', items: [] },
  ],
  reducers: {
    addBlock(state, action) {
      const { laneIndex, blockName } = action.payload;
      state[laneIndex].items.push({
        divName: blockName,
        history: [],
      });
    },
    moveBlock(state, action) {
      const { blockIndex, sourceLaneIndex, targetLaneIndex } = action.payload;
      const [movedItem] = state[sourceLaneIndex].items.splice(blockIndex, 1);
      movedItem.history.push(`Moved from ${state[sourceLaneIndex].name} to ${state[targetLaneIndex].name}`);
      state[targetLaneIndex].items.push(movedItem);
    },
    deleteBlock(state, action) {
      const { blockIndex, laneIndex } = action.payload;
      state[laneIndex].items.splice(blockIndex, 1);
    },
  },
});

export const { addBlock, moveBlock, deleteBlock } = lanesSlice.actions;
export default lanesSlice.reducer;
