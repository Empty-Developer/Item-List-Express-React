import React from "react";
import "./ListItems.css";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

interface Item {
  id: number;
  title: string;
}

interface Props {
  items: Item[];
  onClick?: (id: number) => void;
  draggable?: boolean;
  onReorder?: (items: Item[]) => void;
  loading?: boolean;
  loaderRef?: React.RefObject<HTMLDivElement | null>;
  hasMore?: boolean;
}

/*
 * @description this component show items list
 * can work with normal list and drag drop list
 * also have loading for infinity scroll
 */

export default function ListItems({
  items,
  onClick,
  draggable = false,
  onReorder,
  loading = false,
  loaderRef,
  hasMore = true,
}: Props) {
  // handle item position after drag
  const handleDragEnd = (event: any,) => {
    const {active, over} = event;

    // if item not moved
    if (!over || active.id === over.id) return

    // find old item position
    const oldIndex = items.findIndex(
      (item) => item.id === active.id,
    );

    // find new item position
    const newIndex = items.findIndex(
      (item) => item.id === over.id,
    );

    // update local array order

    const newItems = arrayMove(
      items,
      oldIndex,
      newIndex,
    );

    // send new order to parent

    onReorder?.(newItems);
  };

  /*
   * @description render items
   * if draggable use sortable item
   * else show simple item
   */

  const renderItems = () => (
    <>
      {items.length === 0 &&
        !loading &&
        (
          <p>
            No items
          </p>
        )}

      {items.map(
        (item) =>
          draggable
            ? (
              <SortableItem
                key={item.id}
                item={item}
                onClick={onClick}
              />
            )
            : (
              <div
                key={item.id}
                className="item-container"
                onClick={() =>
                  onClick?.(
                    item.id,
                  )}
              >
                <div className="item-panel-text">
                  <p>
                    {item.id}
                  </p>

                  <p>
                    {item.title}
                  </p>
                </div>
              </div>
            ),
      )}

      {hasMore && (
        // loader for next 20 items

        <div
          ref={loaderRef}
          className="loader-container"
        >
          {loading &&
            <div className="loader" />}
        </div>
      )}
    </>
  );

  return (
    <div className="list-wrapper">
      <h2 className="title-h2-list-item">
        Items List
      </h2>

      <div className="list-scroll">
        {draggable
          ? (
            // wrapper for drag and drop
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items.map(
                  (item) => item.id,
                )}
                strategy={verticalListSortingStrategy}
              >
                {renderItems()}
              </SortableContext>
            </DndContext>
          )
          : (
            renderItems()
          )}
      </div>
    </div>
  );
}
