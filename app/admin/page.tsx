'use client';

import { useState } from "react";
import Aside from "../components/Aside";
import Users from "./Users";
import Books from "./Books";
import Rentals from "./Rentals";

import '@/app/styles/tables.css'

const Admin = () => {

  const [currOpt, setCurrOpt] = useState<string>("rentals");

  const renderer = () => {
    switch (currOpt) {
      case "users":
        return <Users />;
      case "books":
        return <Books />;
      case "rentals":
        return <Rentals />;
      default:
        return;
    }
  }

  return (
    <main style={{marginTop: 0, flexDirection: "row"}}>
      <Aside getOpt={setCurrOpt} />
      { renderer() }
    </main>
  )
}

export default Admin;
