export default {
	props: {
		list: { //静态数据
			type: Array,
			default: function() {
				return [];
			}
		},
		customClass: { //自定义样式名
			type: String,
			default: function() {
				return "";
			}
		},
		listStyle: { //自定义列表样式
			type: Array,
			default: function() {
				return [];
			}
		},
		itemStyle: { //自定义列表项样式
			type: Array,
			default: function() {
				return [];
			}
		},
		listpageSize: { //分页每页条目数
			type: [Number],
			default: function() {
				return 20;
			}
		},
		listpageSizes: { //每页显示个数选择器的选项设置
			type: Array,
			default: function() {
				return [10, 20, 30, 40];
			}
		},
		listcurrentPage: { //当前页数
			type: [Number, String],
			default: function() {
				return 1;
			}
		},
		listtotal: { //总条目数
			type: [Number, String],
			default: function() {
				return 0;
			}
		},
		pagelayout: { //分页组件布局，子组件名用逗号分隔
			type: [Number, String],
			default: function() {
				return "total, sizes, prev, pager, next, jumper";
			}
		},
		//显示数量，不显示分页时有效
		showNum: {
			type: [Number, String],
			default: function() {
				return 5;
			}
		},
		showMoreType: {
			type: [Number, String], /////可选参数1,2；1代表数字分页，2代表底部显示加载更多按钮，3表示无限滚动
			default: function() {
				return 1;
			}
		},
		showpage: { //	显示分页
			type: Boolean,
			default: function() {
				return false;
			}
		},
		staticMore: { ////静态数据显示更多
			type: Boolean,
			default: function() {
				return false;
			}
		},
		selected:{/////默认选中项
            type: Number,
            default: function() {
                return 0;
            }
		},
        openselected:{/////启用选中状态
            type: Boolean,
            default: function() {
                return false;
            }
        }
	},
	watch: {
		list: function(n) {
			this.ErAsyncRows = n;
		},
		listtotal: function(n) {
			this.pagetotal = parseInt(n);
		},
		listcurrentPage:function (n) {
			this.cpage=parseInt(n);
		}
	},
	created: function() {//2019-10-28 anne 将原来的mounted更换为created 必免重复赋值
		if(!this.ErAsyncUrl) { //当无异步请求时取静态数据
			this.ErAsyncRows = this.list;
		}
	},
	methods: {
        loadList(){////无限滚动加载数据
            if(this.showpage && this.showMoreType == '3') {
               this.clickLoadMore();
            }
		},
		showMoreButton() { ////显示点击加载更多按钮
			if(this.showpage && this.showMoreType == '2') {
				if(this.ErAsyncUrl) {
					if(this.ErAsyncParames.rows) {
						return this.ErAsyncParames.rows <= this.ErAsyncRows.length;
					} else if(this.ErAsyncParames.parames && this.ErAsyncParames.parames.rows) {
						return this.ErAsyncParames.parames.rows <= this.ErAsyncRows.length;
					}
				} else if(this.staticMore) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
		showMorePage() { /////显示分页
			if(this.showpage && this.showMoreType == '1') {
				if(this.ErAsyncUrl) {
					return true;
					//                  if(this.ErAsyncParames.rows){
					//                      return this.ErAsyncParames.rows<=this.ErAsyncRows.length;
					//                  }else if(this.ErAsyncParames.parames&&this.ErAsyncParames.parames.rows){
					//                      return this.ErAsyncParames.parames.rows<=this.ErAsyncRows.length;
					//                  }
				} else if(this.staticMore) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
		handleSizeChange: function(rows) {
			if(this.ErAsyncUrl) {
				this.ErAsyncParames.rows = rows;
				this.ErAsyncParames.page = 1;
				if(this.ErAsyncParames.parames) {
					if(typeof this.ErAsyncParames.parames == "string") {
						this.ErAsyncParames.parames = JSON.parse(this.ErAsyncParames.parames);
					}
					this.ErAsyncParames.parames.rows = rows;
					this.ErAsyncParames.parames.page = 1;
				}
			}
			this.$emit("sizechange", rows);
		},
		handleCurrentChange: function(page) {
			if(this.ErAsyncUrl) {
				this.ErAsyncParames.page = page;
				if(this.ErAsyncParames.parames) {
					if(typeof this.ErAsyncParames.parames == "string") {
						this.ErAsyncParames.parames = JSON.parse(this.ErAsyncParames.parames);
					}
					this.ErAsyncParames.parames.page = page;
				}
			}
			this.$emit("currentchange", page);
		},
		clickLoadMore: function() {
			var that = this;
			that.ErRowsAdd = true;
			// var oldRows=this.ErAsyncRows.concat([]);
			if(this.ErAsyncUrl) {
				if(this.ErAsyncParames.parames) {
					Object.assign(this.ErAsyncParames.parames, {
						page: this.ErAsyncParames.parames.page + 1
					});
				} else {
					Object.assign(this.ErAsyncParames, {
						page: this.ErAsyncParames.page + 1
					});
				}
			}
			that.$emit("loadmore");
		},
		isshowList(index) { ////列表行是否显示
			if(this.showpage) {
				return true;
			} else {
				return(!this.showpage && this.showNum > index) || this.showpage || this.showNum == 0;
			}
		},
		clickItem: function(item) {
			this.$emit("clickitem", item);
		}
	}
}