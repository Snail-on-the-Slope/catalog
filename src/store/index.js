import Vue from 'vue'
import Vuex from 'vuex'
import items from '../assets/data/items.json'
import materials from '../assets/data/materials.json'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        catalog: [],
        materials: [],
        typeCatalog: [],
        sortPriceType: 'all',
        sortMaterialType: 'all'
    },
    mutations: {
        updateCatalog(state, data) {
            state.catalog = data
        },

        updateMaterial(state, data) {
            state.materials = data
        },

        sortCatalog(state, info) {
            info === "all" ? "" :
                info === "increase" ?
                (
                    state.catalog.sort((a, b) => (a.price.current_price > b.price.current_price) ? 1 : ((b.price.current_price > a.price.current_price) ? -1 : 0)),
                    state.typeCatalog.forEach(array => {
                        if (array)
                            array.sort((a, b) => (a.price.current_price > b.price.current_price) ? 1 : ((b.price.current_price > a.price.current_price) ? -1 : 0))

                    })
                ) :
                (
                    state.catalog.sort((a, b) => (a.price.current_price > b.price.current_price) ? -1 : ((b.price.current_price > a.price.current_price) ? 1 : 0)),
                    state.typeCatalog.forEach(array => {
                        if (array)
                            array.sort((a, b) => (a.price.current_price > b.price.current_price) ? -1 : ((b.price.current_price > a.price.current_price) ? 1 : 0))

                    })
                )
        },

        updateTypeCatalog(state) {
            state.catalog.forEach(currentValue => {
                state.typeCatalog[currentValue.material] ?
                    state.typeCatalog[currentValue.material].push(currentValue) :
                    (state.typeCatalog[currentValue.material] = [currentValue]);
            });
        },
    },

    actions: {
        async fetchCatalog(ctx) {
            try {
                let data = items;
                await ctx.commit("updateCatalog", data);
            } catch (e) {
                console.log("e")
            }
        },

        async fetchMaterial(ctx) {
            try {
                let data = materials;
                await ctx.commit("updateMaterial", data);
            } catch (e) {
                console.log("e")
            }
        },

        async fetchCatalogByType(ctx) {
            try {
                await ctx.commit("updateTypeCatalog");
            } catch (e) {
                console.log("e")
            }
        },

        sortCatalog(ctx, info) {
            ctx.commit("sortCatalog", info);
        }
    },
    getters: {
        catalog: s => s.catalog,
        materials: s => s.materials,
        sortPriceType: s => s.sortPriceType,
        sortMaterialType: s => s.sortMaterialType,
        catalogByType: s => type => s.typeCatalog[type],
    },
    modules: {}
})