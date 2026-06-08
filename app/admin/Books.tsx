"use client";

import { useState, useEffect } from "react";
import API from "../API";

import style from "../styles/panel.module.css";

interface Books {
  _id: string;
  name: string;
  author: string;
  price: number;
  discount: number;
  category: string;
}

const Books = () => {
  const [books, setBooks] = useState<Books[]>([]);

  const [addBook, setAddBook] = useState<Boolean>(false);

  const [selectedBook, setSelectedBook] = useState<Books>({
    _id: "",
    name: "",
    author: "",
    category: "",
    price: 0,
    discount: 0,
  });

  const selectBook = (book: Books) => {
    setSelectedBook(book);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedBook((prev) => ({ ...prev, [name]: value }));
  };

  const getAllBooks = async () => {
    const token = localStorage.getItem("session_token");
    await fetch(API + "/books", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => setBooks(json.data))
      .catch((error) => console.log(error.message));
  };

  const clear = () => {
    setSelectedBook({
      _id: "",
      name: "",
      author: "",
      category: "",
      price: 0,
      discount: 0,
    });
    setAddBook(false);
  };

  const sendReq = async (method: string) => {
    const token = localStorage.getItem("session_token");
    await fetch(`${API}/books/${selectedBook._id}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body:
        method === "DELETE"
          ? ""
          : JSON.stringify({
              name: selectedBook.name,
              author: selectedBook.author,
              price: selectedBook.price,
              discount: selectedBook.discount,
              category: selectedBook.category,
            }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((error) => console.log(error.message))
      .finally(clear);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <section className="w-full mr-8">
      <table>
        <thead>
          <tr>
            <th>book name</th>
            <th>author</th>
            <th>category</th>
            <th>price</th>
            <th>discount</th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.length > 0 &&
            books.map((e) => (
              <tr onClick={() => selectBook(e)} key={e._id}>
                <td>{e.name}</td>
                <td>{e.author}</td>
                <td>{e.category}</td>
                <td>{e.price} LE</td>
                <td>{e.discount} %</td>
              </tr>
            ))}
        </tbody>
      </table>
      {selectedBook._id && selectedBook._id.length > 0 && (
        <div
          style={{ backgroundColor: "hsl(51.43deg 22.58% 93.92% / 70%)" }}
          className="absolute top-0 left-0 w-full h-screen flex justify-center items-center"
        >
          <div className={style.panelCont}>
            <div className={style.panel}>
              <form className="flex flex-col gap-2.5">
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="name">Name: </label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="name"
                    id="name"
                    value={selectedBook.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="authour">Author:</label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="author"
                    id="author"
                    value={selectedBook.author}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="category">Category: </label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="category"
                    id="category"
                    value={selectedBook.category}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="price">Price: </label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="price"
                    id="price"
                    value={selectedBook.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="discount">Discount: </label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="discount"
                    id="discount"
                    value={selectedBook.discount}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className={style.btns}>
              <button onClick={clear} className={style.btn}>
                Cancel
              </button>
              <button
                style={{
                  backgroundColor: "hsl(193.19deg 90% 95%)",
                }}
                className={style.btn}
                onClick={() => sendReq("PATCH")}
              >
                Update
              </button>
              <button
                style={{
                  backgroundColor: "hsl(0 70% 45% / 1)",
                  color: "#ffffff",
                }}
                className={style.btn}
                onClick={() => sendReq("DELETE")}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {addBook && (
        <div
          style={{ backgroundColor: "hsl(51.43deg 22.58% 93.92% / 70%)" }}
          className="absolute top-0 left-0 w-full h-screen flex justify-center items-center"
        >
          <div className={style.panelCont}>
            <div className={style.panel}>
              <form className="flex flex-col gap-2.5">
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="name">Name: </label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="name"
                    id="name"
                    value={selectedBook.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="authour">Author:</label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="author"
                    id="author"
                    value={selectedBook.author}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="category">Category: </label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="category"
                    id="category"
                    value={selectedBook.category}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="price">Price: </label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="price"
                    id="price"
                    value={selectedBook.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="discount">Discount: </label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="discount"
                    id="discount"
                    value={selectedBook.discount}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className={style.btns}>
              <button onClick={clear} className={style.btn}>
                Cancel
              </button>
              <button
                style={{
                  backgroundColor: "hsl(193.19deg 90% 95%)",
                }}
                className={style.btn}
                onClick={() => sendReq("POST")}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setAddBook(true)} className={style.addNewBook}>
        Add New Book
      </button>
    </section>
  );
};

export default Books;
