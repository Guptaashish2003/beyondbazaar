// "use client"
// import Board from "@asseinfo/react-kanban";
// import "@asseinfo/react-kanban/dist/styles.css";

// export default function Page() {
//   const board = {
//     columns: [
//       {
//         id: 1,
//         title: "todo",
//         cards: [{ id: 1, title: "テスト", description: "内容" }]
//       },
//       { id: 2, title: "in progress", cards: [] },
//       { id: 3, title: "done", cards: [] },

//     ]
//   };

//   const onNewCard = (draftCard) => ({
//     id: new Date().getTime(),
//     ...draftCard
//   });

//   const onNewColumn = (draftColumn) => ({
//     id: new Date().getTime(),
//     ...draftColumn
//   });

//   return (
//     <div className="w-11/12">
      

//       <Board 
//         className="w-11/12 flex !flex-wrap"
//         initialBoard={board}
//         allowAddCard={{ on: "top" }}
//         allowRemoveCard
//         allowRenameColumn
//         onCardNew={console.log}
//         onCardRemove={console.log}
//         onColumnNew={console.log}
//         onColumnRemove={console.log}
//         onColumnRename={console.log}
//         onNewCardConfirm={onNewCard}
//         onNewColumnConfirm={onNewColumn}
//       />
//     </div>
//   );
// }


import React from 'react'

export default function page() {
  return (
    <div>
      hello world
    </div>
  )
}

