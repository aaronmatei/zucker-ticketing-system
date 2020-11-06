import "bootstrap/dist/css/bootstrap.css";
import buildClient from "./../api/build-client";
import axios from "axios";
import { useEffect } from "react";
import Header from "./../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./../redux/actions/user-actions/load-user";
import { Provider } from "react-redux";
import initStore from "./../redux/store";
import withRedux from "next-redux-wrapper";

const AppComponent = props => {

    const { Component, pageProps } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        // load user everytime we render
        dispatch(loadUser());
    }, [dispatch]);

    const { user, loading, auth, error, success, token } = useSelector((state) => state.userrr);


    return (
        <Provider store={initStore}>
            <Header loggedInUser={user} />
            <Component {...pageProps} />

        </Provider>
    );
};

AppComponent.getInitialProps = async ({ Component, ctx }) => {
    const pageProps = Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {};

    return { pageProps };
};

const makeStore = () => initStore;


// AppComponent.getInitialProps = async (appContext) => {
//     const client = buildClient(appContext.ctx);
//     const { data } = await client.get("/api/v1/users/currentuser");
//     let pageProps = {};
//     if (appContext.Component.getInitialProps) {
//         pageProps = await appContext.Component.getInitialProps(appContext.ctx);
//     }
//     return {
//         pageProps,
//         ...data
//     };
// };
export default withRedux(makeStore)(AppComponent);
