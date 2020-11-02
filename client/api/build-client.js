import axios from 'axios'

export default ({ req }) => {
    if (typeof window === 'undefined') {
        // we are on the server 
        return axios.create({
            baseURL: 'http://ingress-nginx.ingress-nginx-controller.svc.cluster.local',
            headers: req.headers
        })
    } else {
        // we are in browser 
        return axios.create({
            baseURL: "/"
        })
    }
}