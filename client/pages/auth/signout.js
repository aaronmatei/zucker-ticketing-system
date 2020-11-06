import { useEffect } from "react";
import Router from "next/router";
import { signUserOut } from "./../../redux/actions/user-actions/signout-action";
import { useDispatch, useSelector } from "react-redux";

export default () => {
    const dispatch = useDispatch();
    const { user, loading, auth, errors, success, token } = useSelector(
        (state) => state.userrr
    );

    const logoutUser = (user) => {
        dispatch(signUserOut(user))
            .then((res) => {
                console.log("SIGN OUT RES", res);
                Router.push("/");
            })
            .catch((err) => {
                console.log("SIGN OUT ERR", err);
            });

    }

    useEffect(() => {
        logoutUser(user)
    }, [dispatch]);

    return (
        <div>
            {errors.length > 0 && (
                <div className="alert alert-danger">
                    <h4>Oops....</h4>
                    <ul className="my-0">
                        {errors.map((err) => (
                            <li key={err.message}>{err.message}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
