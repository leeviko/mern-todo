import React, { useEffect, useState } from 'react';
import { getItems, deleteItem, completeItem } from "../actions/itemActions";
import { useDispatch, useSelector } from "react-redux";


import TodoModal from "./TodoModal";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.item.items);

  useEffect(() => {
    dispatch(getItems());
  }, [])

  const onDelete = (id) => {
    dispatch(deleteItem(id));
  }

  const onCheck = (id, isComplete) => {
    dispatch(completeItem(id, !isComplete));
  }

  return (
    <div className="todos content">
      <div className="todos-container">
        <h1 className="title">Todos</h1>
        <TodoModal />
        <div className="todo-list">
          <div className="todo-list-container">
            <div className="todo-list-wrapper">
              {
                todos.map(({ _id, name, completed }) => (
                  <div key={_id} className="item">
                    <span className="item-name">{name}</span>
                    <input 
                      className="item-complete" 
                      type="checkbox" 
                      onChange={() => onCheck(_id, completed)}
                      checked={completed} 
                    />
                    <button 
                      className="item-del" 
                      onClick={() => onDelete(_id)}
                    >
                      &times;
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todos
