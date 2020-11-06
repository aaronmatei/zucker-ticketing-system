import buildClient from "./../api/build-client"
import axios from "axios"

const LandingPage = (props) => {

    return <h1>{`LandingPage:`}</h1>
};

LandingPage.getInitialProps = async (context) => {
    // const client = buildClient(context)
    // const { data } = await client.get('/api/v1/users/currentuser')
    // return data
    console.log("CONTEXT1", context.store.getState())
    console.log("CONTEXT2", Object.keys(context))
};

export default LandingPage;