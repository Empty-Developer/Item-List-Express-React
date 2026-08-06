import { clearQueue, getQueue } from "./mutationQueueMiddleware.js";
import {
  customItems,
  items,
  selectedItems,
  selectedOrder,
} from "../config/db.js";

const processQueue = () => {
  const tasks = getQueue();

  if (tasks.length === 0) {
    return;
  }

  console.log(
    "Processing queue:",
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
  clearQueue();
};

// every second
setInterval(() => {
  processQueue();
}, 1000);
