<template>
	<span :class="['er-button',customClass,isLoading?'er-button-loading':'',isDisabled?'er-button-disabled':'']">
		<span class="er-button-style" :style="erstyle" @click="clickA()">
			<a :href="href" :target="target" v-show="!isLoading"><slot></slot></a>
		</span>
		<slot name="addition"></slot>
	</span>
</template>
<script>
  export default {
    name: "ErButton",
    props: {
      href: {
        type: String,
        default() {
          return "javascript:void(0);"
        }
      },
      target: {
        type: String,
        default() {
          return ""
        }
      },
      erstyle: {
        type: Array,
        default() {
          return null
        }
      },
      customClass: {
        type: String,
        default() {
          return "default"
        }
      },
      isLoading: {
        type: Boolean,
        default() {
          return false
        }
      },
      isDisabled: {
        type: Boolean,
        default() {
          return false
        }
      }
  },
    methods:{
      clickA(){
        this.$emit("click");
      }
    }
  }
</script>
