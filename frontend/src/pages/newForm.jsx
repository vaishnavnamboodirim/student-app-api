import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Form } from 'react-bootstrap';


const SignupComponent = () => {
    const [values, setValues] = useState({
        name: '',
        myclass: '',
        marks: '',
        rollno: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, myclass, marks, rollno } = values;
        const user = {name, myclass, marks, rollno};

        await axios.post('http://localhost:8000/api/students', user);        
    };

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');

    const signupForm = () => {
        return (
            <Form onSubmit={handleSubmit}>
                <div >
                    <input
                        value={values.name}
                        onChange={handleChange('name')}
                        type="text"
                        
                        placeholder="Type your name"
                    />
                </div>

                <div >
                    <input
                        value={values.myclass}
                        onChange={handleChange('myclass')}
                        type="text"
                        
                        placeholder="Type your class"
                    />
                </div>

                <div >
                    <input
                        value={values.marks}
                        onChange={handleChange('marks')}
                        type="text"
                        
                        placeholder="Type your marks"
                    />
                </div>

                <div>
                    <input
                        value={values.rollno}
                        onChange={handleChange('rollno')}
                        type="text"
                    
                        placeholder="Type your rollno"
                    />
                </div>

                <div>
                <button>Signup</button>
                </div>
            </Form>
        );
    };
    
    return <React.Fragment>
    {showLoading()}
    {signupForm()} 
     </React.Fragment>;

};

export default SignupComponent;