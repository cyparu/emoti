import Vue from "vue";
import Vuex from "vuex";;
import { AuthModule, IAuthState } from "./auth.store";
import { EmotiModule, IEmotiState } from "./emoti.store";
import { CounterModule } from "./counter.store";
import { db } from "../server/firebase.config";


Vue.use(Vuex);

interface IRootState {
    isLoaded: boolean;
    auth?: IAuthState;
    emoti?: IEmotiState;
}

const store:Vuex.Store<IRootState> = new Vuex.Store<IRootState>({
    state: {
        isLoaded: false,
    },

    actions: {
        "SetLoaded": ({commit}, loaded:boolean):void => {
            commit("SetLoaded", loaded);
        }
    },

    mutations: {
        "SetLoaded": (state:IRootState, loaded:boolean):void => {
            state.isLoaded = loaded;
        }
    },

    modules: {
        counter: new CounterModule<IRootState>(),
        auth: new AuthModule(),
        emoti: new EmotiModule(db)
    }
});

// const authModule: AuthModule<IRootState> = new AuthModule(store, ["auth"]);
// store.registerModule([auth], authModule);

export {store as default, IRootState};
