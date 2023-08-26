import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import botImg from "../assets/photo.avif";

function Signup() {
    //the useState hook is used to create and manage state variables in a functional component in React. Each useState call returns an array with two elements: the current state value, and a function to update the state.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [signupUser, { isLoading, error }] = useSignupUserMutation();  //usw sighnupmutation from api/slice
    const navigate = useNavigate();   //use navigate to direct the chat file after signup
 
    //image upload states
    const [image, setImage] = useState(null);
    const [upladingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);


    function validateImg(e) {
        const file = e.target.files[0];
        if (file.size >= 4194304 ) {
            return alert("Max file size is 3 mb");
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); //this code creates a temporary URL for a selected file using the createObjectURL method, and sets the state of a variable called imagePreview to that URL using the setImagePreview function. This allows the React component to display a preview of the selected file to the user.
        }
    }

    async function uploadImage() {
        //The FormData object is a built-in JavaScript object that is used to encode and send data as multipart/form-data, which is commonly used for uploading files to a server.

        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "nurnpixk");
        try {
            setUploadingImg(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/dvmdjhh5v/image/upload", {
                method: "post",
                body: data,
            });
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url;
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    }

    async function handleSignup(e) {
        e.preventDefault();
        if (!image) return alert("Please upload your profile picture");
        const url = await uploadImage(image);
        console.log(url);
        // signup the user
        signupUser({ name, email, password, picture: url }).then(({ data }) => {
            if (data) {
                console.log(data);
                navigate("/chat");
            }
        });
    }

    return (
    <div className="sign">
        <Container>
            <Row>
                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">

                    <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>

                        <h1 className="text-center">Create account</h1>

                        <div className="signup-profile-pic__container">
                            <img src={imagePreview || botImg} className="signup-profile-pic" />
                            <label htmlFor="image-upload" className="image-upload-label">
                                <i className="fas fa-plus-circle add-picture-icon"></i>
                            </label>
                            <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
                        </div>

                        {error && <p className="alert alert-danger">{error.data}</p>}

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Your name" onChange={(e) => setName(e.target.value)} value={name} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {upladingImg || isLoading ? "Signing you up..." : "Signup"}
                        </Button>

                        <div className="py-4">
                            <p className="text-center">
                                Already have an account ? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
                <Col md={5} className="signup__bg"></Col>
            </Row>
        </Container>
        </div>
    );
}

export default Signup;
