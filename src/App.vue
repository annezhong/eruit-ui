<template>
    <div id="app">
        <newslist type="3" :list="list" :showaddition="true">
            <template slot-scope="props" slot="image">
                <img :src="props.item.img"/>
            </template>
            <template slot-scope="props" slot="title">
                <a>{{props.item.name}}</a>
            </template>
            <template slot-scope="props" slot="addition">
                <span>{{props.item.info}}</span>
            </template>
        </newslist>
    </div>
</template>

<script>
import newslist from "./components/newslist/list.vue";
export default {
    name: "app",
    components: {newslist
    },
    data() {
        return {
            list:[{
                name:"门户管理子系统",
                info:"门户展现样式、风格栏目、布局管理",
                img:"http://localhost:8090/src/components/image/boy.jpg"
            }],
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


