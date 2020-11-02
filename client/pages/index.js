import buildClient from "./../api/build-client"

const LandingPage = ({ loggedInUser }) => {
    console.log("Logged in User", loggedInUser)
    // axios.get("/api/v1/users/currentuser")
    return <h1>Landing page</h1>;
};

LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context)
    const { data } = await client.get('/api/v1/users/currentuser')
    return data
};

export default LandingPage;