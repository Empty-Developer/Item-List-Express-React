import items from "../config/db.js";

export const getAllItem = async (req, res) => {
  try {
    const startItems = Number(req.query.startItems) || 0
    const endItems = Number(req.query.endItems) || 20

    const visibleItems = items.slice(
      startItems,
      endItems + startItems
    )

    res.status(200).json({
      items: visibleItems,
    });

  } catch (error) {

    console.log("error get all items: ", error);

    return res.status(500).json({
      message: "not found get items!",
    });
  }
};

export const postItems = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}
