import Vue from 'vue'
import Vuex from 'vuex'
import json from '../assets/data/data.json'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        libraries: [],
        librarieById: null,
        typeLibraries: {},
    },
    mutations: {
        updateLibraries(state, data) {
            data.forEach(e => state.libraries.push(e.data.general))
        },
        updateLibrarieById(state, id) {
            state.librarieById = null;
            state.librarieById = state.libraries.filter(
                e => e.id == id
            )[0];
        },
        sortLibraries(state, info) {
            info[0] ?
                (state.libraries.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)),
                    info[1] !== 'all' ? state.typeLibraries[info[1]].sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)) : '') :
                (state.libraries.sort((a, b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0)),
                    info[1] !== 'all' ? state.typeLibraries[info[1]].sort((a, b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0)) : '');
        },
        updateTypeLibraries(state) {
            state.libraries.forEach(currentValue => {
                state.typeLibraries[currentValue.locale.name] ?
                    state.typeLibraries[currentValue.locale.name].push(currentValue) :
                    (state.typeLibraries[currentValue.locale.name] = [currentValue]);
            });
        },
    },
    actions: {
        async fetchLibraries(ctx) {
            let data = json;
            ctx.commit("updateLibraries", data);
        },
        async fetchLibrarieById(ctx, id) {
            await ctx.commit("updateLibrarieById", id);
            return ctx.getters.librarieById ? true : false;
        },
        async fetchLibrarieByType(ctx) {
            ctx.commit("updateTypeLibraries");
        },
        sortLibraries(ctx, info) {
            ctx.commit("sortLibraries", info);
        }
    },
    getters: {
        libraries: s => s.libraries,
        librarieById: s => s.librarieById,
        typeNameLibraries: s => Object.keys(s.typeLibraries),
        librariesByType: s => type => s.typeLibraries[type],
    },
    modules: {}
})