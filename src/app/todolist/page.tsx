"use client";
import clsx from "clsx";
import React from "react";
import uniqid from "uniqid";

type StatusType = "NEW" | "INPROGRESS" | "DONE";
const STATUS = {
  NEW: "NEW",
  INPROGRESS: "INPROGRESS",
  PAUSE: "PAUSE",
  DONE: "DONE",
};
interface TodoType {
  id: string;
  label: string;
  status: string;
}

const TodoList = () => {
  const [newTodo, setNewTodo] = React.useState<string>("");
  const [list, setList] = React.useState<TodoType[]>([
    { id: "1", label: "🎬 watch series.", status: STATUS.DONE },
    { id: "2", label: "📄 Write Docs", status: STATUS.INPROGRESS },
    { id: "3", label: "🎨 Design Figma ", status: STATUS.NEW },
  ]);

  const scrollRef = React.useRef<null | HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current)
      scrollRef?.current.scrollIntoView({ behavior: "smooth" });
  }, [list]);

  const handleAdd = () => {
    const num = uniqid();

    newTodo.length > 0 &&
      setList([...list, { id: num, label: newTodo, status: STATUS.NEW }]);
    setNewTodo("");
  };
  const handleChange = (index: string, status: string) => {
    setList(list.map((e) => (e.id === index ? { ...e, status } : e)));
  };
  const handleRemove = (index: string) => {
    setList((prevList) => prevList.filter((tache) => tache.id !== index));
  };
  return (
    <>
      <div className="h-[65vh] w-full">
        <div className="h-full w-full px-0 flex flex-col items-center justify-center bg-teal-lightes">
          <div className=" h-[95%] bg-blue-950/30 rounded shadow p-6 m-4 w-full lg:w-3/4">
            <div className="mb-4">
              <h1 className="text-grey-darkest">Liste des taches </h1>
              <div className="flex mt-4">
                <input
                  className="shadow dark:bg-slate-300/70 font-mono font-bold appearance-none border dark:text-slate-800 rounded w-full py-2 px-3 mr-4 text-grey-darker"
                  value={newTodo}
                  placeholder="Nouvelle tache"
                  onKeyDown={(key) =>
                    (key.code === "Enter" || key.code === "NumpadEnter") &&
                    handleAdd()
                  }
                  onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                  className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal hover:dark:bg-blue-800"
                  onClick={handleAdd}
                >
                  Ajout
                </button>
              </div>
            </div>

            <div className=" h-5/6  overflow-auto p-5">
              {list.map((element) => (
                <div key={element.id} className="flex mb-4 items-center">
                  <p
                    className={clsx(
                      "w-full text-grey-darkest",
                      element.status === "DONE" &&
                        "line-through  dark:text-slate-600",
                      element.status === "PAUSE" && " dark:text-blue-300",
                      element.status === "INPROGRESS" && " dark:text-green-700",
                      element.status === "NEW" && " dark:text-green-300"
                    )}
                  >
                    {element.label}
                  </p>
                  {/* buttons */}
                  {["NEW", "PAUSE"].includes(element.status) && (
                    <button
                      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green hover:dark:bg-blue-800"
                      onClick={(_) =>
                        handleChange(element.id, STATUS.INPROGRESS)
                      }
                    >
                      Start
                    </button>
                  )}
                  {element.status === "INPROGRESS" && (
                    <button
                      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green hover:dark:bg-blue-800"
                      onClick={(_) => handleChange(element.id, STATUS.PAUSE)}
                    >
                      Pause
                    </button>
                  )}
                  {element.status === "INPROGRESS" && (
                    <button
                      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green hover:dark:bg-blue-800"
                      onClick={(_) => handleChange(element.id, STATUS.DONE)}
                    >
                      Done
                    </button>
                  )}
                  <button
                    className="flex-no-shrink p-2 ml-2 border-2 rounded hover:dark:bg-blue-800 text-red border-red hover:text-white hover:bg-red"
                    onClick={(_) => handleRemove(element.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div ref={scrollRef}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
