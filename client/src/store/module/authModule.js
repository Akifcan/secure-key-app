import axios from 'axios'
import { decodedJwt } from '../../utils/index'

const state = {
    user: null
}
const getters = {
    user: state => state.user
}
const mutations = {
    setUser: (state, user) => state.user = user
}
const actions = {
    authorize(vuexContext, token) {
        vuexContext.commit('setUser', decodedJwt(token).obj)
        localStorage.userId = decodedJwt(token).obj.id
        localStorage.userToken = token
        return true;
    }
}
export default {
    namespaced: true, state, getters, mutations, actions
}