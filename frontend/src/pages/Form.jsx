import React from 'react';
import axios from 'axios';

const Form = () => {
  
  const [formValue, setformValue] = React.useState({
    name: '',
    myclass: '',
    marks: '',
    rollno: ''
  });

  const handleSubmit = (event) => {
    event.PreventDefault();
    const handleSubmit = async() => {
        // store the states in the form data
        const loginFormData = new FormData();
        loginFormData.append("name", formValue.name)
        loginFormData.append("myclass", formValue.myclass)
        loginFormData.append("marks", formValue.marks)
        loginFormData.append("rollno", formValue.rollno)
      
        try {
          // make axios post request
          const response = await axios({
            method: "post",
            url: "http://localhost:8000/api/students",
            data: loginFormData,
            headers: { "Content-Type": "application/json" },
          },
          console.log(formValue));
        } catch(error) {
          console.log(error)
        }
      }
  }

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Student Form</p>
      <div>
      <input
        type="name"
        name="name"
        placeholder="enter the name"
        value={formValue.name}
        onChange={handleChange}

      />
      </div>
      <input
        type="myclass"
        name="myclass"
        placeholder="enter the class"
        value={formValue.myclass}
        onChange={handleChange}
      />
      <input
        type="marks"
        name="marks"
        placeholder="enter the marks"
        value={formValue.marks}
        onChange={handleChange}
      />
      <input
        type="rollno"
        name="rollno"
        placeholder="enter the Roll No."
        value={formValue.rollno}
        onChange={handleChange}
      />
      <button
        type="submit"
      >
        Submit
      </button>
    </form>
  )
};

export default Form;