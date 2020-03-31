import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import Btn from "./components/Button";
import InputField from "./components/InputField";
import Collapsible from "./components/Collapsible";
import PantherImg from "./images/pinkPanther.png";

import { Container, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
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
      <section className={styles.inputFields}>
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
        <Btn
          handleClick={() => addItem()}
          text={"Add item"}
          type="outline-success"
          margin="m-2"
        />
      </section>
    </>
  ) : null;

  const printList = () => {
    if (listVisible) {
      return (
        <>
          <Container>
            <Row>
              {todoItems.map(item => (
                <>
                  <Col className="p-2 col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                    <div className={styles.item}>
                      <h3>{item.name}</h3>
                      {item.info ? (
                        <p>
                          <Collapsible text={item.info} />
                        </p>
                      ) : null}
                      {item.creationDate ? (
                        <p>{`Date created: ${item.creationDate}`}</p>
                      ) : null}
                      {item.completionDate ? (
                        <p>{`Deadline: ${item.completionDate}`}</p>
                      ) : null}
                      {item.image ? (
                        <img
                          className={styles.picture}
                          src={`${item.image}`}
                        ></img>
                      ) : null}
                      <div>
                        <Btn
                          type="danger"
                          handleClick={() => removeItem(item)}
                          text="Delete"
                          btnSize="sm"
                          margin="mt-2"
                        />
                      </div>
                    </div>
                  </Col>
                </>
              ))}
            </Row>
          </Container>
        </>
      );
    }
  };

  return (
    <>
      <header className={styles.header}>
        {/* <div> */}
        <img src={PantherImg} />
        <h3>THE</h3>
        <h2>PINK PANTHER</h2>
        <h2 className={styles.bottom}>LIST</h2>
        {/* </div> */}
      </header>
      <section className={styles.section}>
        <div className={styles.buttons}>
          <Btn
            type="primary"
            handleClick={() => toggleList(!listVisible)}
            text="Show my list"
            margin="m-2"
          />
          <Btn
            type="outline-secondary"
            handleClick={() => toggleVisibility(!fieldsVisible)}
            text="Add new item"
            margin="m-2"
          />
        </div>
        {inputFields}
        {printList()}
      </section>
    </>
  );
}

export default App;
