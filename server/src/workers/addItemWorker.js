import { clearAddQueue, getAddQueue } from "../queues/addItemQueue.js";
import { customItems } from "../config/db.js";
/*
  collects new user items
  and inserts them every 10 seconds
*/
const processAddQueue = () => {
  const tasks = getAddQueue();

  if (tasks.length === 0) {
    return;
  }

  console.log(
    "add worker:",
    tasks,
  );

  tasks.forEach((item) => {
    const exists = customItems.some(
      (i) => i.id === item.id,
    );

    if (!exists) {
      customItems.push(item);
    }
  });

  clearAddQueue();
};

// every 10 seconds
setInterval(() => {
  processAddQueue();
}, 10000);
