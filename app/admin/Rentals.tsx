"use client";

import { useState, useEffect } from "react";
import API from "../API";

import style from "../styles/rentals.module.css";

interface Rentals {
  _id: string;
  name: string;
  price: string;
  rentStartDate: number;
  rentedFor: string;
  rentEndDate: string;
  phone: string;
}

interface RentalData {
  name: string;
  price: string;
  rentStartDate: string;
  rentedFor: string;
  rentEndDate: string;
  phone: string;
}

const Rentals = () => {
  const [rentals, setRentals] = useState<Rentals[]>([]);

  const [addRental, setAddRental] = useState<Boolean>(false);

  const [rentalId, setRentalId] = useState<string>("");

  const [rentalData, setRentalData] = useState<RentalData>({
    name: "",
    price: "",
    rentStartDate: "",
    rentedFor: "",
    rentEndDate: "",
    phone: "",
  });

  const getRentals = async () => {
    const token = localStorage.getItem("session_token");

    await fetch(API + "/rentals", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => setRentals(json.data))
      .catch((error) => console.log(error.message));
  };

  const addRentals = async () => {
    const token = localStorage.getItem("session_token");
    await fetch(API + "/rentals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rentalData),
    })
      .then((res) => res.json())
      .then(console.log)
      .catch((error) => console.log(error.message))
      .finally(clear);
  };

  const markAsDone = async () => {
    const token = localStorage.getItem("session_token");
    await fetch(`${API}/rentals/${rentalId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(console.log)
      .catch((error) => console.log(error.message))
      .finally(clear);
  };

  const clear = () => {
    setAddRental(false);
    setRentalId("");
    setRentalData({
      name: "",
      price: "",
      rentStartDate: "",
      rentedFor: "",
      rentEndDate: "",
      phone: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRentalData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getRentals();
  }, []);

  return (
    <section className="w-full mr-8">
      <table>
        <thead>
          <tr>
            <th>book name</th>
            <th>rent price</th>
            <th>rented for</th>
            <th>phone</th>
            <th>rent start date</th>
            <th>rent end date</th>
          </tr>
        </thead>
        <tbody>
          {rentals &&
            rentals.length > 0 &&
            rentals.map((e) => (
              <tr key={e._id} onClick={() => setRentalId(e._id)}>
                <td>{e.name}</td>
                <td>{e.price} LE</td>
                <td>{e.rentedFor}</td>
                <td>{e.phone}</td>
                <td>{e.rentStartDate}</td>
                <td>{e.rentEndDate}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {addRental && (
        <div
          style={{ backgroundColor: "hsl(51.43deg 22.58% 93.92% / 70%)" }}
          className="absolute top-0 left-0 w-full h-screen flex justify-center items-center"
        >
          <div className={style.panelCont}>
            <div className={style.panel}>
              <form className="flex flex-col gap-2.5">
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="name">Book Name: </label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="name"
                    id="name"
                    value={rentalData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="price">Price:</label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="price"
                    id="price"
                    value={rentalData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="rentedFor">Rented For: </label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="rentedFor"
                    id="rentedFor"
                    value={rentalData.rentedFor}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="phone">Phone: </label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="phone"
                    id="phone"
                    value={rentalData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="rentStartDate">Rent Start Date: </label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="rentStartDate"
                    id="rentStartDate"
                    value={rentalData.rentStartDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between gap-2.5">
                  <label htmlFor="rentEndDate">Rent End Date: </label>
                  <input
                    className={style.inputField}
                    type="text"
                    name="rentEndDate"
                    id="rentEndDate"
                    value={rentalData.rentEndDate}
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
                onClick={addRentals}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {rentalId && (
        <div
          style={{ backgroundColor: "hsl(51.43deg 22.58% 93.92% / 70%)" }}
          className="absolute top-0 left-0 w-full h-screen flex justify-center items-center"
        >
          <div className={style.panelCont}>
            <div className={style.panel}>
              <div>is this book returned?</div>
              <div className={style.btns}>
                <button onClick={markAsDone} className={style.btn}>
                  yes
                </button>
                <button className={style.btn}>no</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setAddRental(true)} className={style.addNewRental}>
        Add rental
      </button>
    </section>
  );
};

export default Rentals;
