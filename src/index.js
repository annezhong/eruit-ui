import button from "./components/button/button.vue"
import gridtree from "./components/gridtree/gridtree.vue"
import leftright from "./components/leftright/leftright.vue"
import login from "./components/login/login.vue"
import mainlayout from "./components/mainlayout/mainlayout.vue"
import newslist from "./components/newslist/list.vue"


export default {
    install: function (Vue) {
        var components = [button, gridtree, leftright, login, mainlayout, newslist];
        components.map(component => {
            Vue.component(component.name, component);
        })
    },
    button,
    gridtree,
    leftright,
    login,
    mainlayout,
    newslist
}