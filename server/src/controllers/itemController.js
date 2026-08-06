import {
  customItems,
  items,
  selectedItems,
  selectedOrder,
} from "../config/db.js";

import {
  addToMutationQueue,
  hasMutationTask,
} from "../queues/mutationQueue.js";

import { addItemToQueue, hasAddTask } from "../queues/addItemQueue.js";

/**
 * @description this controller sorts and sends the
 * entire list of items up to 20
 */
export const getAllItem = (req, res) => {
  try {
    const startItems = Number(req.query.startItems) || 0;
    const endItems = Number(req.query.endItems) || 20;
    const search = req.query.search || "";

    let filteredItems = [...items, ...customItems].filter(
      (item) => !selectedItems.has(item.id),
    );

    // check search: if filtered
    if (search) {
      filteredItems = filteredItems.filter((item) =>
        item.id.toString().includes(search)
      );
    }

    const visibleItems = filteredItems.slice(
      startItems, // 0
      startItems + endItems, // 20
    );

    res.status(200).json({
      items: visibleItems,
      total: filteredItems.length,
    });
  } catch (error) {
    console.log("error get all items:", error);

    res.status(500).json({
      message: "not found get items!",
    });
  }
};

export const postItems = (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "id not found",
      });
    }

    const itemId = Number(id);

    if (!Number.isInteger(itemId)) {
      return res.status(400).json({
        message: "invalid id",
      });
    }

    // check id
    const checkIdItems = items.some(
      (item) => item.id === itemId,
    );

    // check id custom
    const checkCustomIdItems = customItems.some(
      (item) => item.id === itemId,
    );

    if (
      checkIdItems ||
      checkCustomIdItems ||
      hasAddTask(itemId)
    ) {
      return res.status(409).json({
        message: "item already exists",
      });
    }

    // add a new item
    const newItem = {
      id: itemId,
      title: `Item: ${itemId}`,
    };

    addItemToQueue(newItem);

    return res.status(202).json({
      message: "item added to queue",
      item: newItem,
    });
  } catch (error) {
    console.log("error post items:", error);

    res.status(500).json({
      message: "not found post items!",
    });
  }
};

export const selectItem = (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "id not found",
      });
    }

    const itemId = Number(id);

    if (!Number.isInteger(itemId)) {
      return res.status(400).json({
        message: "invalid id",
      });
    }

    const item = items.find((item) => item.id === itemId) ||
      customItems.find((item) => item.id === itemId);

    if (!item) {
      return res.status(404).json({
        message: "item not found",
      });
    }

    // check selected?
    if (
      selectedItems.has(itemId) ||
      hasMutationTask("SELECT", itemId)
    ) {
      return res.status(409).json({
        message: "item selected",
      });
    }

    addToMutationQueue({
      type: "SELECT",
      id: itemId,
    });

    return res.status(202).json({
      message: "item added to queue",
    });
  } catch (error) {
    console.log("error select item:", error);

    res.status(500).json({
      message: "not found select item!",
    });
  }
};

export const getSelectedItem = (req, res) => {
  try {
    const startItems = Number(req.query.startItems) || 0;
    const endItems = Number(req.query.endItems) || 20;
    const search = req.query.search || "";

    let selected = selectedOrder
      .map((id) => {
        return (
          items.find((item) => item.id === id) ||
          customItems.find((item) => item.id === id)
        );
      })
      .filter(Boolean);

    if (search) {
      selected = selected.filter((item) => item.id.toString().includes(search));
    }

    const visibleItems = selected.slice(
      startItems,
      startItems + endItems,
    );

    res.status(200).json({
      items: visibleItems,
      total: selected.length,
    });
  } catch (error) {
    console.log("error get selected items:", error);

    res.status(500).json({
      message: "not found selected items!",
    });
  }
};

export const deleteSelectedItem = (req, res) => {
  try {
    const id = Number(req.params.id);

    if (
      !selectedItems.has(id) &&
      !hasMutationTask("SELECT", id)
    ) {
      return res.status(404).json({
        message: "item not selected",
      });
    }

    addToMutationQueue({
      type: "DELETE",
      id,
    });

    return res.status(202).json({
      message: "delete added to queue",
    });
  } catch (error) {
    console.log("error delete selected item:", error);

    res.status(500).json({
      message: "not found delete item!",
    });
  }
};

export const reorderItems = (req, res) => {
  try {
    const { order } = req.body;

    // check found arr or not
    if (!Array.isArray(order)) {
      return res.status(400).json({
        message: "not found get arr",
      });
    }

    // check about all items selected
    const isSelected = order.every(
      (id) => selectedItems.has(Number(id)),
    );

    if (!isSelected) {
      return res.status(400).json({
        message: "invalid",
      });
    }

    // update arr items
    addToMutationQueue({
      type: "REORDER",

      order: order.map(Number),
    });

    return res.status(202).json({
      message: "reorder added to queue",
    });
  } catch (error) {
    console.log("error reorder items:", error);

    res.status(500).json({
      message: "not found reorder items!",
    });
  }
};
