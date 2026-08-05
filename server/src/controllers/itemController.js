import { items, selectedItems, selectedOrder, customItems } from "../config/db.js";

/**
 * 
 * @description this controller sorts and sends the 
 * entire list of items up to 20
 */
export const getAllItem = (req, res) => {
  try {
    const startItems = Number(req.query.startItems) || 0;
    const endItems = Number(req.query.endItems) || 20;
    const search = req.query.search || "";

    let filteredItems = items;

    // check search: if filtered
    if (search) {
      filteredItems = items.filter((item) =>
        item.id.toString().includes(search)
      );
    }

    const visibleItems = filteredItems.slice(
      startItems, // 0
      startItems + endItems // 20
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
      return res.status(401).json({
        message: 'id not found'
      })
    }

    // check id
    const checkIdItems = items.some((item) => item.id === Number(id))

    // check id custom
    const checkCustomIdItems = customItems.some((item) => item.id === Number(id))

    if (checkIdItems || checkCustomIdItems) {
      return res.status(404).json({
        message: "item already exists"
      })
    }

    // add a new item
    const newItem = {
      id: Number(id),
      title: `Item: ${id}`,
    }

    customItems.push(newItem);

    return res.status(201).json({
      message: "item created",
      item: newItem,
    });

  } catch (error) {
    console.log("error get all items:", error);

    res.status(500).json({
      message: "not found get items!",
    });
  }
}

export const selectItem = (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(401).json({
        message: 'id not found'
      })
    }

    const itemId = Number(id);

    const item = items.find((item) => item.id === itemId) || customItems.find((item) => item.id === itemId);

    if (!item) {
      return res.status(404).json({
        message: "item not found",
      });
    }

    // check selected?
    if (selectedItems.has(itemId)) {
      return res.status(409).json({
        message: "item selected",
      });
    }

    selectedItems.add(itemId);
    selectedOrder.push(itemId);

    return res.status(200).json({
      message: "item selected",
    });

  } catch (error) {
    console.log("error get all items:", error);

    res.status(500).json({
      message: "not found get items!",
    });
  }
}

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
      selected = selected.filter((item) =>
        item.id.toString().includes(search)
      );
    }

    const visibleItems = selected.slice(
      startItems,
      startItems + endItems
    );

    res.status(200).json({
      items: visibleItems,
      total: selected.length,
    });

  } catch (error) {
    console.log("error get all items:", error);

    res.status(500).json({
      message: "not found get items!",
    });
  }
}

export const deleteSelectedItem = (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!selectedItems.has(id)) {
      return res.status(404).json({
        message: "item not selected",
      });
    }

    selectedItems.delete(id);

    const index = selectedOrder.indexOf(id);

    if (index !== -1) {
      selectedOrder.splice(index, 1);
    }

    return res.status(200).json({
      message: "item delete",
    });

  } catch (error) {
    console.log("error get all items:", error);

    res.status(500).json({
      message: "not found get items!",
    });
  }
}

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
    const isSelected = order.every((id) => selectedItems.has(Number(id)));

    if (!isSelected) {
      return res.status(400).json({
        message: "invalid",
      });
    }

    // update arr items
    selectedOrder.length = 0;
    selectedOrder.push(...order.map(Number));

    return res.status(200).json({
      message: "updated",
      order: selectedOrder,
    });


  } catch (error) {
    console.log("error get all items:", error);

    res.status(500).json({
      message: "not found get items!",
    });
  }
}