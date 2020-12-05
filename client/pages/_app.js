import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useEffect } from "react";
import Header from "./../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./../redux/actions/user-actions/load-user";
import { loadTickets } from "./../redux/actions/ticket-actions/load-tickets-action";
import { loadOrders } from "./../redux/actions/order-actions/load-orders-action";
import { Provider } from "react-redux";
import initStore from "./../redux/store";
import withRedux from "next-redux-wrapper";

const AppComponent = (props) => {
  const { Component, pageProps } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    // load user everytime we render
    dispatch(loadUser());
    dispatch(loadTickets());
    dispatch(loadOrders());
  }, [dispatch]);

  const { user, loading, auth, error, success, token } = useSelector(
    (state) => state.userrr
  );

  return (
    <Provider store={initStore}>
      <Header loggedInUser={user} />
      <div className="container">
        <Component loggedInUser={user} {...pageProps} />
      </div>
    </Provider>
  );
};

AppComponent.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  // ctx.store.dispatch(loadTickets());
  // ctx.store.dispatch(loadUser());
  // ctx.store.dispatch(loadOrders());

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
