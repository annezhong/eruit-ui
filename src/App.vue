<template>
    <div id="app">
        <leftright>
            <template v-slot:left></template>
            <template v-slot:right>
                <mainlayout :toolbuttons="toolbuttons">
                    <template v-slot:path>当前路径：</template>
                    <template v-slot:search>搜索栏</template>
                    <template v-slot:toolbutton="{item}">
                        <a>{{item.name}}</a>
                    </template>
                </mainlayout>
            </template>
        </leftright>
    </div>
</template>

<script>
import mainlayout from "./components/mainlayout.vue";
import leftright from "./components/leftright.vue";
export default {
    name: "app",
    components: {
        leftright,
        mainlayout
    },
    data() {
        return {
            toolbuttons: [
                {
                    name: "按钮1"
                },
                {
                    name: "按钮2"
                }
            ]
        };
    }
};
</script>


