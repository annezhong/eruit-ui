<template>
	<div class="er-gridtree el-table el-table--fit el-table--border" :style="{'height':height>0?height+'px':'auto'}">
		<div class="er-gridtree-crumbs" v-if="!!rootName||crumbs.length>0">
			<span @click="clickroot"><i class="el-icon-guide"></i> {{rootName||"根目录"}}</span>
			<template v-for="(item,index) in crumbs">
				<span :key="'crumbs_'+index">
					<i class='el-icon-arrow-right'></i>
					<a @click="clickcrumb(item,index)"><slot name="crumb" :item="item" :index="index">{{item.text||""}}</slot></a>
				</span>
			</template>
		</div>
		
		<div class="el-table__header-wrapper">
			<table cellpadding="0" cellspacing="0" border="0" class="el-table__header" width="100%">
				<colgroup>
					<col width="40" v-if="!!$scopedSlots['open']"></col>
					<col width="40" v-if="showcheckbox"></col>
					<col v-for="(item,index) in columns" :key="index" v-bind:name="rowColumnClass(index)" v-bind:width="item.width" ></col>
					<col v-if="height>0" name="gutter" width="17"></col>
				</colgroup>
				<thead>
					<tr>
						<th v-if="!!$scopedSlots['open']"></th>
						<th v-if="showcheckbox">
							<div class="cell">
								<label class="el-checkbox">
									<span :class="[
								node.allchecked ? 'is-checked':(node.checked?'is-indeterminate':''),
								{'el-checkbox__input':true}]">
										<span v-on:click.stop.self="checkClick" class="el-checkbox__inner"></span>
										<input type="checkbox" class="el-checkbox__original" value=""/>
									</span>
                            </label>
							</div>
						</th>
						<th v-for="(item,index) in columns" :key="index" v-bind:class="columnClass(index)" :style="{'text-align':item.align}">
							<div class="cell">{{item.text}}</div>
						</th>
						<th v-if="height>0" class="gutter" width="17"></th>
					</tr>
				</thead>
			</table>

		</div>
		<div class="el-table__body-wrapper">
			<er-gridtree-row
			 :load-before="loadBefore"
			  @loadsuccess="loadsuccess"
			  :is-list="isList"
			   @clickexpand="clickexpand"
			    :async-type="asyncType" 
				:lazy="lazy" 
				:url="url"
				 :key="item[primarykey]" 
				 :primarykey="primarykey"
				  :index="index"
				   :myslots="$scopedSlots"
				    v-on:clicknode="handleClick"
					 @clickopen="clickopen"
					  @contextmenu="contextmenu"
					   :showcheckbox="showcheckbox"
					    v-on:onchecked="checkback"
						 v-on:onopen="onopennode"
						
						  v-for="(item,index) in node.children" 
						  :node="initRow(item)" 
						  :headcolumn="headcolumn" 
						  :columns="columns">

			</er-gridtree-row>
		</div>
		<div v-if="isList">
			<el-pagination
				background
				layout="prev, pager, next"
				:page-size="pageSize"
				:total="total" @current-change="changePage">
				</el-pagination>
		</div>
	</div>
</template>
<script>
	import GridtreeStore from './gridtree-store.js';
  import ErGridtreeRow from './gridtree-row.vue';
  import axios from "../../common/ErAxios.js"
	export default {
		name: "ErGridtree",
		components: {
			ErGridtreeRow
		},
		data() {
			return {
				total:0,
				node: {
					checked: false,
					children: null
				},
				hascrumbs:false,
				crumbs:[],
				defaultParam:{},
				pageSize:300
			}
		},
		watch: {
			"node.checked": {
				handler: function() {
					//console.log(this.node.checked);
					if(this.node.clickchecked) {
						var children = this.$children;
						if(children) {
							for(var i = 0; i < children.length; i++) {
								children[i].node.checked = this.node.checked;
								children[i].node.clickchecked = true;
								children[i].node.allchecked = this.node.checked;
							}
						}
					}

				},
				deep: true
			},
			"url": function() {
				this.loaded = false;
				this.nodes.splice(0, this.nodes.length);
				this.loader();
			},
			queryParams:{
				deep:true,
				handler:function(){
				//	this.crumbs.splice(0,this.crumbs.length);
				}
			}
		},
		props: {
			primarykey: String,
			url: String,
			height: {
				type: Number,
				default: function() {
					return 0;
				}
			},
			queryParams: {
				type: Object,
				default: function() {
					return {};
				}
			},
			rootName:{
				type:String,
				default:function(){
					return "";
				}
			},
			nodes: {
				type: Array,
				default: function() {
					return [];
				}
			},
			columns: Array,
			headcolumn: String,
			showcheckbox: {
				type: Boolean,
				default: true
			},
			loadBefore:{
				type:Function,
				default:function(){
					return function(param){
						return true;
					}
				}
			},
			lazy:{
				type:Boolean,
				default:function(){
					return true;
				}
			},
			asyncType:{
				type:String,
				default:function(){
					return "get";
				}
			},
			isList:{
				type:Boolean,
				default:function(){
					return false;
				}
			}
		},
		methods: {
			changePage:function(page){
				this.node.changepage(page);
			},
			goroot:function(){
				if(this.isList){
					this.clickroot();
				}
				else{
					this.reloader(0);
				}
			},
			clickroot:function(){
				var v=this.defaultParam;
				if(JSON.stringify(this.defaultParam)=="{}"){
					v=this.queryParams;
				}
				this.clearCrumb();
				Object.assign(this.queryParams,v);
				this.reloader(0);
			},
			clearCrumb:function(){
				this.hascrumbs=false;
				this.crumbs.splice(0,this.crumbs.length);
			},
			loadsuccess:function(res){
				this.$emit("loadsuccess",res);
			},
			clickexpand:function(node,$node){		

				this.$emit("clickexpand",node,$node);
				if(this.isList){
					if(!this.hascrumbs){
						Object.assign(this.defaultParam,this.queryParams);
					}
					this.hascrumbs=true;
					this.crumbs.push(node.row);
					var param=Object.assign({},node.row);					
					if(this.loadBefore(param)){
						Object.assign(this.queryParams,param);
						this.reloader();
						//this.loader(this.url,param);	
					}	
					node=null;				
				}				
			},
			clickcrumb:function(row,index){
				if(index==this.crumbs.length-1) return;
				this.crumbs.splice(index+1,this.crumbs.length-index+1);
				var param=Object.assign({},row);	
				
				if(this.loadBefore(param)){
						this.loader(this.url,param,0);	
					}	
			},
			clickopen:function(node){
				this.$emit("clickopen",node);
			},
			setnodes: function(nodes) {
				this.node = new GridtreeStore({
					data: nodes,
					primarykey: this.primarykey,
					tree: this
				});
				this.singleSelection = null;
				this.$root.singleSelection = null;

				//this.nodes = nodes;
			},
			checkback: function(row) {
				var that = this;
				var all = that.returnChecked(that);
				this.$root.multipleSelection = all;
			},
			onopennode: function(obj) {
				this.$emit("onopen", obj);
			},
			//找开所有节点扩展
			openall: function() {
 				this.opennode(this,true);
			},
			//打开指定节点扩展，all为true打开所有子节点
			opennode: function(obj, all) {
				if(!obj) return;
				obj.node.opened = true;
				if(all) {
					var children = obj.$children;
					if(children) {
						for(var i = 0; i < children.length; i++) {
							this.opennode(children[i], all);
						}
					}
				}
			},
			//关闭所有节点扩展
			closeall: function() {
                this.closenode(this,true);
			},
			//关闭指定节点扩展，all为true关闭所有子节点
			closenode: function(obj, all) {
				if(!obj) return;
				obj.node.opened = false;
				if(all) {
					var children = obj.$children;
					if(children) {
						for(var i = 0; i < children.length; i++) {
							this.closenode(children[i], all);
						}
					}
				}
			},
			returnChecked: function(obj) {
				var rows = [];
				var children = obj.$children;
				if(children) {
					for(var i = 0; i < children.length; i++) {
						if(children[i].node&&children[i].node.checked) {
							rows.push(children[i].node.data);
							rows = rows.concat(this.returnChecked(children[i]));
						}
					}
				}
				return rows;
			},
			columnClass: function(index) {
				return "el-table__body_column_" + index + " is-leaf";
			},
			rowColumnClass: function(index) {
				return "el-table_1_column_" + index;
			},
			handleClick: function(obj, evt) {
			
				//console.log("enterhandleClick");
				if(this.singleSelection == obj) {
					obj.node.selected = false;
					this.singleSelection = null;
					this.$root.singleSelection = null;
				} else {
					if(this.singleSelection) {
						this.singleSelection.node.selected = false;
					}
					this.singleSelection = obj;
					if(obj) {
						this.singleSelection.node.selected = true;
						this.$root.singleSelection = this.singleSelection;
						this.$emit('click', obj, evt);
					}
				}
				if(this.newObject) {
					this.newObject.selected = false;
					this.newObject = null;
				}
			},
			contextmenu:function (data, evt) {
				this.$emit("contextmenu", data.row, evt,data);
			},
			checkClick: function() {
				if(this.node.checked) {
					this.node.checked = false;
				} else {
					this.node.checked = true;
				}
				//是否是点击选中
				this.node.clickchecked = true;
				//console.log(this.node.checked);
			},
			reloader:function(page){
				
				this.loader(this.url,null,page);
			},
			loader: function(url,param,page) {
			//	debugger;
				param=param||this.queryParams;
				//console.log("url",url);
				var that = this;
			
				if(url) {
					that.loaded = false;
					if(this.nodes) {
						that.nodes.splice(0, that.nodes.length);
					}
				}
				url = url || that.url;
				var pageIndex=page||0;
				if(typeof pageIndex =="undefined"&&this.node&&this.isList){
					pageIndex=this.node.pageIndex||0;
				}
				if(!that.loaded && (!that.nodes || that.nodes.length == 0) && url) {
					var that = this;
					that.loaded = true;
					that.loading = true;
					that.expanded = true;
					that.getData(url,param,function(msg){
						that.loading = false;
						if(that._events["loadsuccess"]) {
							that.$emit("loadsuccess", msg);
						}
						var rows = msg.data;
						if(msg) {
							that.node = new GridtreeStore({
								data: rows,
								tree: that,
								pageSize:that.pageSize,
								pageIndex:pageIndex,
								isList:that.isList,
								primarykey: that.primarykey
							},function(stor){
								that.total=rows?rows.length:0;
							});
						}
					});
				}
			},
			getData:function(url,param,fn){
				url = url || that.url;
				axios[this.asyncType](url, param).then(function(msg) {
						fn(msg);
					});
			},
			initRow: function(item) {
				if(!item.children)
					item.children = [];
				if(typeof item.closed == "undefined") {
					item.closed = false;
				}
				return item;
			},
			append: function(row, index) {
				this.node.append(row, index);
			},
			toggleRowSelection:function(row){
				debugger;
				if(this.singleSelection) {
						this.singleSelection.node.selected = false;
					}
				this.singleSelection = row;
				if(row) {
						this.singleSelection.node.selected = true;
						this.$root.singleSelection = this.singleSelection;
					}
				if(this.newObject) {
					this.newObject.selected = false;
					this.newObject = null;
				}
			}
		},
		mounted: function() {
			this.loader();
		},
		created: function() {
			if(this.nodes) {
				this.node = new GridtreeStore({
					data: this.nodes,
					tree: this,
					primarykey: this.primarykey
				});
			}
			//			else{
			//				this.loader();
			//			}
		},
		updated: function() {
			if(this.height > 0) {
				var dom = this.$el;
				var header = dom.firstChild;
				var height = header.offsetHeight;
				var $body = dom.lastChild;
				$body.style.height = (this.height - height) + "px";
				$body.style.overflow = "auto";
			}
		}
	}
</script>
