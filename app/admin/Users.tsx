"use client";

import { useState, useEffect } from "react";
import API from "@/app/API";
import style from "@/app/styles/conf-box.module.css";

interface UsersInterface {
  _id: any;
  name: string;
  email: string;
  isAdmin: boolean;
}
interface Role {
  _id: string;
  name: string;
  isAdmin: boolean;
}

const Users = () => {
  const [users, setUsers] = useState<UsersInterface[]>([]);
  const [changeRole, setChangeRole] = useState<Role>({
    _id: "",
    name: "",
    isAdmin: false,
  });
  const reset = () => {
    setChangeRole({
      _id: '',
      name: '',
      isAdmin: false,
    });
    setUsers([]);
    getUsers();
  };
  const roleReq = (id: string) => {
    const token = localStorage.getItem('session_token');
    fetch(`${API}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changeRole)
    })
      .then(res => res.json())
      .then(console.log)
      .catch(error => console.log(error.message))
      .finally(reset);
  };
  const setRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isAdmin = e.target.value;
    
    if (isAdmin === 'admin')
      setChangeRole(prev => ({ ...prev, isAdmin: true }));
    else
      setChangeRole(prev => ({ ...prev, isAdmin: false }));
  };
  const getUsers = async () => {
    const token = localStorage.getItem("session_token");
    await fetch(API + "/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((error) => console.log(error.message));
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section style={{ flex: 1, marginRight: "2rem" }}>
      <table>
        <thead>
          <tr>
            <th>user name</th>
            <th>email</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 &&
            users.map((e) => (
              <tr key={e._id} onClick={() => setChangeRole(e)}>
                <td style={{ textTransform: "none" }}>{e.name}</td>
                <td style={{ textTransform: "none" }}>{e.email}</td>
                <td className="capitalize">{e.isAdmin ? "admin" : "user"}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {changeRole._id && changeRole._id.length > 0 && (
        <div
          style={{ backgroundColor: "hsl(51.43deg 22.58% 93.92% / 70%)" }}
          className="conf-msg absolute top-0 left-0 w-full h-screen flex justify-center items-center"
        >
          <div className={style.msgBox}>
            <div className={style.msg}>
              <span className="capitalize">choose {changeRole.name}'s role</span>
              <select
                className={style.select}
                style={{ textTransform: 'capitalize' }}
                defaultValue={changeRole.isAdmin ? "admin" : "user"}
                name="isAdmin"
                onChange={e => setRole(e)}
                id="role"
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <div className={style.btns}>
              <span
                className="cursor-pointer rounded-lg"
                style={{
                  padding: "5px 10px",
                  backgroundColor: "hsl(51.43deg 22.58% 93.92%",
                  textTransform: 'capitalize'
                }}
                onClick={() => roleReq(changeRole._id)}
              >
                yes
              </span>
              <span
                className="cursor-pointer rounded-lg"
                style={{
                  padding: "5px 10px",
                  backgroundColor: "hsl(51.43deg 22.58% 93.92%)",
                  textTransform: 'capitalize'
                }}
                onClick={reset}
              >
                no
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Users;
