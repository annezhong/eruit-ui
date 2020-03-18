import axios from "axios/index";
// if(typeof window!="undefined"&&!window["CS_SYS_C"]&&window["SYSTEM"]){
//     window["CS_SYS_C"]=window["SYSTEM"];
// }
// if(typeof CS_S_C=="undefined"){
//     window.CS_S_C=window["SITE"];
// }
// if(typeof CS_SYS_C=="undefined"){
//     window.CS_SYS_C=window["SYSTEM"];
// }
// var  baseURL=typeof CS_SYS_C!=="undefined"?CS_SYS_C["51197"]:"";
// if(typeof window!="undefined"&&window["CS_S_C"]&&window["CS_S_C"]["JCZD_BM"]){
// 	var JCZD_BM=window["CS_S_C"]["JCZD_BM"];
//     if(window.RELEASECONFIG&&window.RELEASECONFIG[JCZD_BM]){
//         baseURL=window.RELEASECONFIG[JCZD_BM]["51197"]
// 	}
// }
var baseURL = "";
var instance = axios.create({
	baseURL: baseURL,
	changeOrigin: true,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});
export default {
	data: function () {
		return {
			ErAsyncRows: [], //结果为数组
			ErAsyncData: {}, //结果为对象
			pagetotal: 0,
			ErRowsAdd: false////定义是否追加新增的数据
		}
	},
	props: {
		//是否自动完成异步请求
		ErAsyncAuto: {
			type: Boolean,
			default: function () {
				return true;
			}
		},
		//异频请求地址
		ErAsyncUrl: {
			type: String,
			default() {
				return "";
			}
		},
		//异步请求参数
		ErAsyncParames: {
			type: Object,
			default() {
				return {
					page: 1, //请求页码
					rows: 20 //请求条目数
				};
			}
		},
		ErAsyncType: {
			type: String,
			default() {
				return "get"; //异步请求类型默认为get
			}
		},
		axiosHead: {
			type: Object,
			default() {
				return {
					withCredentials: true,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}
			}
		}
	},
	watch: {
		"ErAsyncParames": {
			deep: true,
			handler: function () {
				if (this.ErAsyncAuto) {
					this.ErAsyncInit();
				}
			}
		},
		"ErAsyncUrl": {
			deep: true,
			handler: function () {
				if (this.ErAsyncAuto) {
					this.ErAsyncInit();
				}
			}
		},
		ErAsyncRows:{
			deep:true,
			handler: function () {
				if (window["ComponentBeforeUpdate"]) {
					window["ComponentBeforeUpdate"](this.$el);
				}
				this.$nextTick(function () {
					if (window["ComponentUpdated"]) {
						window["ComponentUpdated"](this.$el);
					}
				});
			}
		}
	},
	mounted: function () {
		if (this.ErAsyncAuto) {
			this.ErAsyncInit();
		}
	},
	created() {
		if (typeof window !== "undefined") {
			if (!this.$axios) {
				this.$axios = window.axios;
			}
		} else {
			if (this.ErAsyncAuto) {
				this.ErAsyncInit();
			}
		}
	},
	methods: {
		_randomKey: function () {
			return "key_" + parseInt(Math.random() * 1e6);
		},
		ErReload: function () {
			this.ErAsyncInit();
		},
		ErAsyncGet: function (_url, param, success, _error) {
			var that = this;
			if (_url) {
				that.$emit("async-before", param);
				var _param = {};
				for (var item in param) {
					var v = param[item];
					if (typeof v == "object") {
						_param[item] = JSON.stringify(v);
					}
					else {
						_param[item] = v;
					}
				}
				instance.get(_url, {
					params: _param
				})
					.then(function (msg) {
						if (typeof msg.data == "string") {
							msg.data = msg.data.replace(/\\/g, "/").replace(/[\r\n]/g, "");
							try {
								msg.data = JSON.parse(msg.data);
							} catch (ex) {
								console.log("转换异步请求时出错", ex.messag);
							}
						}
						that.$emit("async-success", msg.data); //2019-10-28 Anne 放在前面在async-success可以修改res中的数据，比如搜索引擎的分页
						if (typeof success == "function") {
							success.call(that, msg.data);
						}
						that.$emit("async-success1", msg.data);
					})
					.catch(function (msg) {
						if (typeof _error == "function") {
							_error.call(that, msg);
						}
						that.$emit("async-error", msg);
					});
			}
		},
		ErAsyncPost: function (_url, param, success, _error) {
			var that = this;
			var _param = "";
			if (_url) {
				that.$emit("async-before", param);
				if (typeof param == "object") {
					for (var item in param) {
						if (_param) _param += "&";
						var v = param[item];
						if (typeof v == "object") {
							v = JSON.stringify(v);
						}
						_param += item + "=" + encodeURIComponent(v);
					}
				} else {
					_param = param;
				}
				instance.post(_url, _param, that.axiosHead).then(function (msg) {
					if (typeof msg.data == "string") {
						msg.data = msg.data.replace(/\\/g, "/").replace(/[\r\n]/g, "");
						try {
							msg.data = JSON.parse(msg.data);
						} catch (ex) {
							console.log("转换异步请求时出错", ex.messag);
						}
					}
					that.$emit("async-success", msg.data);
					if (typeof success == "function") {
						success.call(that, msg.data);
					}
					that.$emit("async-success1", msg.data);
				})
					.catch(function (msg) {
						if (typeof _error == "function") {
							console.log("异频请失败", msg);
							_error.call(that, msg);
						}
						that.$emit("async-error", msg);
					});
			}
		},
		_ErSetArray: function (rows) {
			if (!this.ErRowsAdd) {
				this.ErAsyncRows.splice(0, this.ErAsyncRows.length);
			} else {
				if (rows.length == 0) {
					this.$message.error("没有更多数据了哦");
					this.showMoreType = 0;
				}
			}
			for (var i = 0; i < rows.length; i++) {
				this.ErAsyncRows.push(rows[i]);
			}
			console.log("ErAsyncRows", this.ErAsyncRows);
		},
		ErAsyncInit: function () {
			var that = this;
			function formatterData(result) {
				if (result instanceof Array) {
					that._ErSetArray(result);
				} else if ((typeof result) == "object" && (typeof result.state) != "undefined") {
					if (result.state == "0000") {
						if (result.rows) {
							that._ErSetArray(result.rows);
							that.pagetotal = parseInt(result.total || 0);
						} else if (result.data) {
							if (result.data instanceof Array) {
								that._ErSetArray(result.data);
							} else {
								that.ErAsyncData = result.data;
							}
						}
					} else {
						console.log("请求结果", result.msg);
					}
				} else if (result.rows instanceof Array) {
					that._ErSetArray(result.rows);
					if (result.total) {
						that.pagetotal = parseInt(result.total || 0);
					}
				} else if (typeof result == "object") {
					that.ErAsyncData = result;
				}
				//console.log("this", that);
			}
			if (this.ErAsyncType == "get") {
				this.ErAsyncGet(this.ErAsyncUrl, this.ErAsyncParames, function (msg) {
					formatterData(msg);
					setTimeout(function () {
						if (typeof updateTopIframe == "function") {
							updateTopIframe();
						}
					})
				}, function (msg) {

				});
			} else {
				this.ErAsyncPost(this.ErAsyncUrl, this.ErAsyncParames, function (msg) {
					formatterData(msg);
					setTimeout(function () {
						if (typeof updateTopIframe == "function") {
							updateTopIframe();
						}
					})
				}, function (msg) {

				});
			}
		}
	}
}