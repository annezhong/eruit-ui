<template>
    <div :class="['page-left-right',customClass,{'page-left-hidden':!showLeft}]">
        <div class="page-main-left" v-if="showLeft">
            <slot name="left"></slot>
        </div>
        <div class="page-main-right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: "leftRight",
    props: {
        customClass: {
            type: String,
            default: function() {
                return "";
            }
        },
        showLeft: {
            type: Boolean,
            default: function() {
                return true;
            }
        }
    }
};
</script>
