import "./App.css";

import { useEffect, useRef, useState } from "react";

import {
  useAddItemMutation,
  useDeleteItemMutation,
  useGetItemsQuery,
  useGetSelectedQuery,
  useReorderMutation,
  useSelectItemMutation,
} from "./redux/api/itemsApi";

import { Input } from "./components/ui/input/Input";
import { Button } from "./components/ui/button/Button";

import Box from "./components/shared/box/Box";
import ItemList from "./components/shared/listItems/ListItems";

function App() {
  // search values for both lists
  const [leftSearch, setLeftSearch] = useState("");
  const [rightSearch, setRightSearch] = useState("");

  // values from input before search
  const [leftSearchValue, setLeftSearchValue] = useState("");
  const [rightSearchValue, setRightSearchValue] = useState("");

  // new item id
  const [newId, setNewId] = useState("");

  // how many items load
  const [leftLimit, setLeftLimit] = useState(20);
  const [rightLimit, setRightLimit] = useState(20);

  const leftObserver = useRef<HTMLDivElement | null>(null);
  const rightObserver = useRef<HTMLDivElement | null>(null);

  // delay search request
  useEffect(() => {
    const timer = setTimeout(() => {
      setLeftSearch(leftSearchValue);

      // reset list after new search
      setLeftLimit(20);
    }, 500);

    return () => clearTimeout(timer);
  }, [leftSearchValue]);

  // delay search request
  useEffect(() => {
    const timer = setTimeout(() => {
      setRightSearch(rightSearchValue);

      // reset list after new search
      setRightLimit(20);
    }, 500);

    return () => clearTimeout(timer);
  }, [rightSearchValue]);

  const {
    data: itemsData,
    isFetching: isFetchingItems,
  } = useGetItemsQuery({
    startItems: 0,
    endItems: leftLimit,
    search: leftSearch,
  });

  const {
    data: selectedData,
    isFetching: isFetchingSelected,
  } = useGetSelectedQuery({
    startItems: 0,
    endItems: rightLimit,
    search: rightSearch,
  });

  const [selectItem] = useSelectItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  const [addItem] = useAddItemMutation();
  const [reorder] = useReorderMutation();

  // load more items from left list
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isFetchingItems &&
          (itemsData?.items.length ?? 0) <
            (itemsData?.total ?? 0)
        ) {
          setLeftLimit(
            (prev) => prev + 20,
          );
        }
      },
      {
        threshold: 0.1,
      },
    );

    const current = leftObserver.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [
    isFetchingItems,
    itemsData?.items.length,
    itemsData?.total,
  ]);

  // load more items from selected list
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isFetchingSelected &&
          (selectedData?.items.length ?? 0) <
            (selectedData?.total ?? 0)
        ) {
          setRightLimit(
            (prev) => prev + 20,
          );
        }
      },
      {
        threshold: 0.1,
      },
    );

    const current = rightObserver.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [
    isFetchingSelected,
    selectedData?.items.length,
    selectedData?.total,
  ]);

  // add custom item
  const addNewItem = () => {
    const id = Number(newId);

    if (!id) return

    addItem(id);
    setNewId("");
  };

  // save new order after drag
  const handleReorder = (items: any[]) => {
    reorder(items.map((item) => item.id));
  };

  return (
    <div className="container">
      {/* left box with all items */}
      <Box>
        <div className="panel-component">
          <Input
            value={leftSearchValue}
            onChange={setLeftSearchValue}
            placeholder="Search ID"
          />
        </div>
        <ItemList
          items={itemsData?.items ?? []}
          onClick={(id) => selectItem(id)}
          loading={isFetchingItems}
          loaderRef={leftObserver}
          hasMore={(itemsData?.total ?? 0) > (itemsData?.items.length ?? 0)}
        />
        <input
          className="input-ui-component"
          type="number"
          placeholder="New id"
          value={newId}
          onChange={(e) => setNewId(e.target.value)}
        />
        <Button
          title="ADD"
          onClick={addNewItem}
        />
      </Box>
      {/* right box with selected items */}
      <Box>
        <div className="panel-component">
          <Input
            value={rightSearchValue}
            onChange={setRightSearchValue}
            placeholder="Search ID"
          />
        </div>
        <ItemList
          items={selectedData?.items ?? []}
          onClick={(id) => deleteItem(id)}
          draggable
          onReorder={handleReorder}
          loading={isFetchingSelected}
          loaderRef={rightObserver}
          hasMore={(selectedData?.total ?? 0) > (selectedData?.items.length ?? 0)}
        />
      </Box>
    </div>
  );
}

export default App;
