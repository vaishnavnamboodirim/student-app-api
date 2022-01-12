import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Post = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [post, SetPost] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/student/${_id}`);
        SetPost(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);
  return (
    <div>
      <h1>{post.name}</h1>
      <p>{post.marks}</p>
      <p>{post.myclass}</p>
      <p>{post.rollno}</p>
      <br />
      <button onClick={() => navigate('/newform')}>Go back</button>
      </div>
  );
};

export default Post;