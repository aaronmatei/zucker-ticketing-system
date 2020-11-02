import { useState, useEffect } from "react";
import Router from "next/router";
import useRequest from "./../../hooks/use-request"

export default () => {
    const [values, setvalues] = useState({
        email: "",
        password: ""

    });

    const { doRequest, errors, success } = useRequest({
        url: "/api/v1/users/signup",
        method: "post",
        body: {
            email: values.email,
            password: values.password,
        },
        onSuccess: () => Router.push("/")
    })

    useEffect(() => { }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setvalues({ ...values, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        doRequest()
    };

    const displayAlert = (type) => {
        switch (type) {
            case "SUCCESS":
                return (
                    <div className="alert alert-success" role="alert">
                        {`You have successfully signed up ${values.email}`}
                    </div>
                );
            case "ERROR":
                return (
                    <div className="alert alert-danger" role="alert">
                        Failed to register you. check errors
                    </div>
                );
            default:
                return <div></div>;
        }
    };

    return (
        <div className="container">
            <div className="col-8 col-md-6 offset-md-3">
                <form action="" onSubmit={onSubmit}>
                    <h1>Sign Up</h1>
                    {success === true && displayAlert("SUCCESS")}
                    {success === false && displayAlert("ERROR")}
                    <div className="form-group">
                        <label htmlFor="">Email Address</label>
                        <input
                            value={values.email}
                            name="email"
                            onChange={handleInputChange}
                            className="form-control"
                            type="text"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input
                            value={values.password}
                            name="password"
                            onChange={handleInputChange}
                            className="form-control"
                            type="password"
                        />
                    </div>
                    {errors}
                    <div>
                        <button className="btn btn-primary">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
