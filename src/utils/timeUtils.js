export const getTimeFromSlot = (slot) => {
    const mapping = {
      wakeUp: [7, 0],
      morning: [9, 0],
      noon: [12, 0],
      evening: [18, 0],
      bedTime: [21, 30],
    };
    return mapping[slot] || [8, 0];
  };
  