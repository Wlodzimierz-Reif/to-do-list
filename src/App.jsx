import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import Button from "./components/Button";
import InputField from "./components/InputField";
import styles from "./App.module.scss";

import { firestore } from "./firebase";

function App() {
  const [todoItems, setToDoItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [fieldsVisible, toggleVisibility] = useState(false);
  const [listVisible, toggleList] = useState(false);

  useEffect(() => {
    fetchToDos();
  }, []);

  const fetchToDos = () => {
    firestore
      .collection("todo-items")
      .doc("item-list")
      .get()
      .then(doc => {
        const retreivedItems = doc.data().items;
        setToDoItems(retreivedItems);
      });
  };

  const addItem = () => {
    const newItems = [...todoItems, newItem];

    const newDoc = {
      items: newItems
    };

    firestore
      .collection("todo-items")
      .doc("item-list")
      .set(newDoc)
      .then(() => {
        console.log("well done");
        fetchToDos();
      })
      .catch(err => console.log(err));
  };

  const removeItem = item => {
    const newItems = [...todoItems];
    const position = newItems.indexOf(item);
    newItems.splice(position, 1);

    const newDoc = {
      items: newItems
    };

    firestore
      .collection("todo-items")
      .doc("item-list")
      .set(newDoc)
      .then(() => {
        console.log("Item removed");
        fetchToDos();
      })
      .catch(err => console.log(err));
  };

  const inputFields = fieldsVisible ? (
    <>
      <InputField
        setItem={title => setNewItem({ ...newItem, name: `${title}` })}
        placeholder="Item name"
        type="text"
      />
      <InputField
        setItem={info => setNewItem({ ...newItem, info: `${info}` })}
        placeholder="Additonal information"
        type="text"
      />
      <InputField
        setItem={creationDate =>
          setNewItem({ ...newItem, creationDate: `${creationDate}` })
        }
        placeholder="Creation date"
        type="date"
      />
      <InputField
        setItem={completionDate =>
          setNewItem({ ...newItem, completionDate: `${completionDate}` })
        }
        placeholder="Completion date"
        type="date"
      />
      <InputField
        setItem={image => setNewItem({ ...newItem, image: `${image}` })}
        placeholder="Image URL"
        type="url"
      />
      <Button handleClick={() => addItem()} text={"Add item"} />
    </>
  ) : null;

  const printList = () => {
    if (listVisible) {
      return (
        <>
          {todoItems.map(item => (
            <>
              <div className={styles.item}>
                <h3>{item.name}</h3>
                {item.info ? <p>{`Additional info: ${item.info}`}</p> : null}
                {item.creationDate ? (
                  <p>{`Date created: ${item.creationDate}`}</p>
                ) : null}
                {item.completionDate ? (
                  <p>{`Deadline: ${item.completionDate}`}</p>
                ) : null}
                {item.image ? (
                  <img className={styles.picture} src={`${item.image}`}></img>
                ) : null}
                <Button handleClick={() => removeItem(item)} text="Delete" />
              </div>
            </>
          ))}
        </>
      );
    }
  };

  return (
    <>
      <h1>To Do List</h1>
      <button onClick={() => toggleVisibility(!fieldsVisible)}>
        Add new item
      </button>
      {inputFields}
      {/* <button onClick={() => printList()}>Show my list</button> */}
      <Button handleClick={() => toggleList(!listVisible)} text="Show items" />
      {printList()}
    </>
  );
}

export default App;
