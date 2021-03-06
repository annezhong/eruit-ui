import button from "./components/button/button.vue"
import gridtree from "./components/gridtree/gridtree.vue"
import leftright from "./components/leftright/leftright.vue"
import login from "./components/login/login.vue"
import manageLayout from "./components/manageLayout/mainlayout.vue"
import newslist from "./components/newslist/list.vue"
function install(Vue) {
    var components = [button, gridtree, leftright, login, manageLayout, newslist];
    components.map(component => {
        Vue.component(component.name, component);
    })
}

export {
    install,
    button,
    gridtree,
    leftright,
    login,
    manageLayout,
    newslist
}