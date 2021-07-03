import React, { useState } from "react";
import { addItem } from "../actions/itemActions";
import { useDispatch } from "react-redux";

const TodoModal = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      name
    }

    dispatch(addItem(newTodo));

    toggle();

  }

  return (
    <div className="item-modal">
      <button
        className="modal-btn btn"
        onClick={() => toggle()}
      >Add Item</button>

      <div className={"modal " + (isOpen ? "show" : "hide")}>
        <div className="modal-close">
          <button className="modal-close-btn" onClick={() => toggle()}>&times;</button>
        </div>
        <div className="modal-header">
          Add New Todo
        </div>
        <div className="modal-body">  
          <form onSubmit={(e) => onSubmit(e)}>
            <label htmlFor="item">Todo</label>
            <input
              className="item-input"
              name="name" 
              type="text"
              id="item"
              value={name}
              placeholder="Add item..."
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="add-btn btn"
            >Add Todo</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default TodoModal;