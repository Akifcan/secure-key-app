import axios from 'axios'
import { decodedJwt } from '../../utils/index'

const state = {
    user: null
}
const getters = {

}
const mutations = {
    setUser: (state, user) => state.user = user
}
const actions = {
    authorize(vuexContext, token) {
        vuexContext.commit('setUser', decodedJwt(token).obj)
        localStorage.userToken = token
        console.log(vuexContext.state.user);
        return true;
    }
}
export default {
    namespaced: true, state, getters, mutations, actions
}