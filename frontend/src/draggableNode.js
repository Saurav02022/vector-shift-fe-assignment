// components/DraggableNode.js
// Reusable draggable node component for toolbar

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      className="cursor-grab min-w-[80px] h-[50px] flex items-center justify-center rounded-lg bg-slate-800 border border-slate-600 hover:border-violet-500 hover:bg-slate-700 transition-all duration-200 px-4"
      draggable
    >
      <span className="text-white text-sm font-medium">{label}</span>
    </div>
  );
};
