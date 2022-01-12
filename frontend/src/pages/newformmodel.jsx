import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Button, Form, Modal, ModalTitle } from 'react-bootstrap';


const SignupComponent2 = () => {
    const [values, setValues] = useState({
        name: '',
        myclass: '',
        marks: '',
        rollno: '',
    });

    const [showModal, setShow] = useState(false);

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setShow(true);


        const { name, myclass, marks, rollno } = values;
        const user = {name, myclass, marks, rollno};

        await axios.post('http://localhost:8000/api/students', user);        
    };

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    const handleClose = () => setShow(false);

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');

    const signupForm = () => {
        return (
            <>
            <div>
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
            {submitted && <div> Success! Thank you for registering</div>}
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <ModalTitle>Success!</ModalTitle>
                </Modal.Header>
                <Modal.Body>Registered</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                </Modal.Footer>

            </Modal>
            </>
        );
    };
    
    return <React.Fragment>
    {showLoading()}
    {signupForm()} 
     </React.Fragment>;

};

export default SignupComponent2;