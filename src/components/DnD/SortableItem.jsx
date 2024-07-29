import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="dnd-box">
      {props.type === "form" && (
        <div className="dnd-box__drag drag-form" {...attributes} {...listeners}>
          <img src="../src/assets/img/draggabledots.png" />
        </div>
      )}
      {props.type === "sidebar" && (
        <div
          className="dnd-box__drag drag-sidebar"
          {...attributes}
          {...listeners}
        >
          <i className="xi-drag-handle" />
        </div>
      )}
      {props.children}
    </div>
  );
}
