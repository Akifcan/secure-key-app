import axios from 'axios'
import { API, HEADERS } from '../constants'

const state = {
    apps: [],
    app: null
}
const getters = {
    apps: state => state.apps,
    app: state => state.app
}
const mutations = {
    setApps: (state, apps) => state.apps = apps,
    setApp: (state, app) => state.app = app
}
const actions = {
    async createApp(vuexContext, { appName, appDescription, appApiKey }) {
        try {
            const response = await axios.post(`${API}/app/`,
                JSON.stringify({ name: appName, apiKey: appApiKey, description: appDescription }),
                {
                    headers: HEADERS
                })
            return [true, response.data.message]
        } catch (error) {
            return [false, error.response.data.message]
        }
    },

    async listApps(vuexContext) {
        try {
            const response = await axios.get(`${API}/app/`, {
                headers: HEADERS
            })
            vuexContext.commit('setApps', response.data)
            console.log(vuexContext.getters.apps);
        } catch (error) {
            console.log(error.response);
            //redirect not found page
        }
    },

    async listApp(vuexContext, id) {
        try {
            const response = await axios.get(`${API}/app/${id}`, {
                headers: HEADERS
            })
            console.log(response.data);
            vuexContext.commit('setApp', response.data)
        } catch (error) {
            //redirect not found page
        }
    },

    async updateApp(vuexContext, payload) {
        try {
            const response = await axios.put(`${API}/app/${payload.id}`, JSON.stringify(payload.body), {
                headers: HEADERS
            })
            console.log(response.data);
            return [true, response.data.message]
        } catch (error) {
            console.log(error.response);
            return [false, error.response.data.message]
        }
    },

    async updateIpList(vuexContext, payload) {
        try {
            const response = await axios.post(`${API}/app/${payload.path}/${payload.id}`, JSON.stringify(payload.body), {
                headers: HEADERS
            })
            console.log(payload.path);
            if (payload.path == 'add-to-block-list') {
                vuexContext.state.app.blockList.push(payload.body.ipAddress)
            } else if (payload.path == 'add-to-allow-list') {
                vuexContext.state.app.allowList.push(payload.body.ipAddress)
            } else if (payload.path == 'remove-to-block-list') {
                vuexContext.state.app.blockList.splice(payload.body.ipAddress, 1)
            } else if (payload.path == 'remove-to-allow-list') {
                vuexContext.state.app.allowList.splice(payload.body.ipAddress, 1)
            }
            return [true, response.data.message]
        } catch (error) {
            console.log(error.response);
            return [false, error.response.data.message]
        }
    }


}
export default {
    namespaced: true, state, getters, mutations, actions
}