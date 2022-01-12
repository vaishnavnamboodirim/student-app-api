import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/students");
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);
  return (
    <>
      {posts.map((el) => (
        <article key={el._id}>
          <Link to={`/post/${el._id}`}>
            <h1>{el.name}</h1>
          </Link>
          <p>{el.rollno}</p>
        </article>
      ))}
    </>
  );
};

export default Home;