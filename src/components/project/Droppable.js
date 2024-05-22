import { Droppable } from "react-beautiful-dnd";
import ConnectedItemComponent from "./ConnectedItemComponent"; // 커넥션된 아이템 컴포넌트 불러오기

<Droppable droppableId="droppableId">
  {(provided) => (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      <ConnectedItemComponent /> {/* 아이템 컴포넌트 배치 */}
      {provided.placeholder}
    </div>
  )}
</Droppable>;
