export const tokenConfig = (getState = null, optionalParams = null) => {
    const token = getState ? getState().userrr.token : null;
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        params: {},
    };

    if (token) {
        config.headers["x-auth-token"] = token;
    }

    if (optionalParams) {
        config.params = optionalParams;
    }

    return config;
};
