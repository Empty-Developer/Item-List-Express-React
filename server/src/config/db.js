const items = []

/**
 * @description storage for application state
 * @return {items} initial 1000000 elements
 * @return {selectedItems} set of selected items user`s
 * @return {selectedOrder} arr for drag drop
 * @return {customItems} arr for id user`s, if he add in arr
 */
const selectedItems = new Set()
const selectedOrder = []
const customItems = []

for (let i = 1; i <= 1000000; i++) {
  items.push({
    id: i,
    title: `Item: ${i}`,
  })
}

export {
  items,
  selectedItems,
  selectedOrder,
  customItems,
};