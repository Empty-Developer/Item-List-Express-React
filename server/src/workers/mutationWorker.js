import {
  clearMutationQueue,
  getMutationQueue,
} from "../queues/mutationQueue.js";

import { selectedItems, selectedOrder } from "../config/db.js";

/**
 * @description worker executes mutation
 * queue every second
 * SELECT add item to selected list
 * DELETE remove item from selected list
 * REORDER update drag&drop order
 */
const processMutationQueue = () => {
  const tasks = getMutationQueue();

  if (tasks.length === 0) {
    return;
  }

  console.log(
    "mutation worker:",
    tasks,
  );

  tasks.forEach((task) => {
    switch (task.type) {
      case "SELECT":
        if (!selectedItems.has(task.id)) {
          selectedItems.add(task.id);

          selectedOrder.push(task.id);
        }

        break;

      case "DELETE":
        selectedItems.delete(task.id);

        const index = selectedOrder.indexOf(task.id);

        if (index !== -1) {
          selectedOrder.splice(index, 1);
        }

        break;

      case "REORDER":
        selectedOrder.length = 0;

        selectedOrder.push(
          ...task.order,
        );

        break;
    }
  });

  clearMutationQueue();
};

// every 1 second
setInterval(() => {
  processMutationQueue();
}, 1000);
