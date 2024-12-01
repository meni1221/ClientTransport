import { useContext, useEffect, useState } from "react";
import { AuthContext, IUser } from "../providers/AuthProvider";
import useFetch from "../hooks/useFetch";

export default function AdminPage() {
  const {user} = useContext(AuthContext)??{};
  const  {data,GET}  = useFetch("http://localhost:7891/users");
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    GET();
  }, []);

  useEffect(() => {
    if (data) setUsers(data);
    else console.log("No users found");
  }, [data]);
  return
   <>
   <div className="card-list">
    {users&&users.length > 0?(
      users.map((user)=>(
        <div key={user.email} className="user-card">
          <h2>{user.name}</h2>
        <p>
          <strong>email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        </div>
      ):(
        <p>No users available.</p>
    )}
   </div>
  </>
);
}
