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