import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  item: {
    id: number;
    title: string;
  };
  onClick?: (id: number) => void;
}

/*
 * @description this component is one draggable item
 * use sortable from dnd kit for change item position
 */
export default function SortableItem({
  item,
  onClick,
}: Props) {
  // get drag functions and styles from dnd kit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: item.id,});

  // apply position changes when drag item

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="item-container"
      onClick={() => onClick?.(item.id)}
    >
      <div
        className="item-panel-text"
        {// drag works only from this block
        ...attributes}
        {...listeners}
      >
        <p>
          {item.id}
        </p>
        <p>
          {item.title}
        </p>
      </div>
    </div>
  );
}
