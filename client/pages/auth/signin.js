import { useState, useEffect } from "react";
import Router from "next/router";
import useRequest from "./../../hooks/use-request";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "./../../redux/actions/user-actions/signin-action";

export default () => {
    const dispatch = useDispatch();

    const [values, setvalues] = useState({
        email: "",
        password: "",
        errors: [],
    });

    const { user, loading, auth, errors, success, token } = useSelector(
        (state) => state.userrr
    );
    const loginUser = (user) => {
        dispatch(signInUser(user))
            .then((res) => {
                setTimeout(() => Router.push("/", 1000));
                console.log("RES", res);
            })
            .catch((err) => {
                setvalues({ ...values, errors: err });
            });
    };

    // const { doRequest, errors, success } = useRequest({
    //     url: "/api/v1/users/signin",
    //     method: "post",
    //     body: {
    //         email: values.email,
    //         password: values.password,
    //     },
    //     onSuccess: () => Router.push("/")
    // })

    useEffect(() => {
        setvalues({ ...values, errors: errors });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setvalues({ ...values, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        // doRequest()
        loginUser(values);
    };

    const displayAlert = (type) => {
        switch (type) {
            case "SUCCESS":
                return (
                    <div className="alert alert-success" role="alert">
                        {`You have successfully signed in ${values.email}`}
                    </div>
                );
            case "ERROR":
                return (
                    <div className="alert alert-danger" role="alert">
                        Failed to sign you in. check errors
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
                    <h1>Sign In</h1>
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
                    {errors && errors.length > 0 && (
                        <div className="alert alert-danger">
                            <h4>Oops....</h4>
                            <ul className="my-0">
                                {errors.map((err) => (
                                    <li key={err.message}>{err.message}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div>
                        <button className="btn btn-primary">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
