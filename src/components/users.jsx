import React, {useState} from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (id) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== id));
    };

    const renderPhrase = (number) => {
        if (number > 1 && number < 5 && number % 10 > 1 && number % 10 < 5) {
            return "человека";
        } else {
            return "человек";
        }
    };

    return users.length ? (
        <>
            <h4>
                <span className="badge bg-primary">
                  {users.length} {renderPhrase(users.length)} тусанет с тобой сегодня
                </span>
            </h4>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => {
                    return (
                        <tr key={user._id}>
                            <th scope="row">{user.name}</th>
                            <td>
                                {user.qualities.map((qual) => (
                                    <span
                                        key={qual._id}
                                        className={`badge bg-${qual.color} m-1`}
                                    >
                      {qual.name}
                    </span>
                                ))}
                            </td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </>
    ) : (
        <h4>
            <span className="badge bg-danger">
                Никто не тусанет с тобой сегодня
            </span>
        </h4>
    );
};
export default Users;
