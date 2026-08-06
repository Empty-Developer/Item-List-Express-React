const addQueue = new Map();

export const addItemToQueue = (item) => {
  const key = item.id;

  // doble
  if (addQueue.has(key)) {
    return false;
  }

  addQueue.set(key, item);

  return true;
};

// check task exists
export const hasAddTask = (id) => {
  return addQueue.has(id);
};

export const getAddQueue = () => {
  return Array.from(addQueue.values());
};

export const clearAddQueue = () => {
  addQueue.clear();
};
