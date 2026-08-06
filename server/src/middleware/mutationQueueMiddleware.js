const queue = new Map();

// add task to queue
export const addToQueue = (task) => {
  let key;

  if (task.type === "REORDER") {
    key = `${task.type}-${task.order.join("-")}`;
  } else {
    key = `${task.type}-${task.id}`;
  }

  // check duplicate in queue
  if (queue.has(key)) {
    return false;
  }

  queue.set(key, task);

  return true;
};

// check task exists in queue
export const hasTaskInQueue = (type, id) => {
  const key = `${type}-${id}`;

  return queue.has(key);
};

// get all tasks
export const getQueue = () => {
  return Array.from(queue.values());
};

// clear queue
export const clearQueue = () => {
  queue.clear();
};
