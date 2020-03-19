<template>
    <div class="page-main-layout">
        <div class="page-main-layout-path" v-if="$slots.path">
            <slot name="path"></slot>
        </div>

        <div class="page-search-con" v-if="$slots.search&&showSearch">
            <slot name="search"></slot>
        </div>
        <div class="page-button-cons" v-if="showButton">
            <slot name="button"></slot>
            <ul class="page-tool-buttons" v-if="toolbuttons.length>0">
                <li v-for="(item,index) in toolbuttons" :key="index">
                    <slot name="toolbutton" :item="item" :index="index"></slot>
                </li>
            </ul>
            <div class="page-more-buttons" v-if="morebuttons.length>0">
                <span class="er-button default"><span class="er-button-style"><a href="javascript:void(0);" target="">更多 <i class="fa fa-angle-double-down"></i></a></span> </span>
                <ul class="page-more-buttons-con">
                    <li v-for="(item,index) in morebuttons" :key="index">
                        <slot name="morebutton" :item="item" :index="index"></slot>
                    </li>
                </ul>
            </div>
        </div>
        <div class="page-main-layout-body">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {};
    },
    name: "manageLayout",
    props: {
        //工具栏按钮
        toolbuttons: {
            type: Array,
            default: function() {
                return [];
            }
        },
        //更多按钮
        morebuttons: {
            type: Array,
            default: function() {
                return [];
            }
        }, 
        //显示搜索区
        showSearch: {
            type: Boolean,
            default: function() {
                return true;
            }
        },
        //显示按钮区
        showButton: {
            type: Boolean,
            default: function() {
                return true;
            }
        }
    }
};
</script>
