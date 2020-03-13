import GridtreeNode from './gridtree-node.js';
export default class GridtreeStore {
	constructor(settings, fn) {
		settings = settings || {};
		this.data = settings.data || [];
		this.children = [];
		this.level = 0;
		this.allchecked = false;
		this.checked = false;
		this.pageSize = settings.pageSize;
		this.pageIndex = settings.pageIndex || 0;
		this.pageTotal = 0;
		this.isList = settings.isList || false;
		this.primarykey = settings.primarykey;
		this.issuceChild(this, this.data, this);
		this.tree = settings.tree;
		if (fn) {
			fn(this);
		}
		//console.log("a");
	}
	issuceChild(obj, data, store) {
		//var data = obj.data;
		if (!data) return;
		obj.children = [];
		var c = data.length;
		//debugger;
		this.pageTotal = 0;
		var start = 0;
		var end = c;
		if (this.isList) {
			this.pageTotal = parseInt(c / this.pageSize);
			if (c % this.pageSize > 0) {
				this.pageTotal++;
			}
			var start = this.pageIndex * this.pageSize;
			var end = start + this.pageSize;
			if (end > c) {
				end = c;
			}
		}
		for (var i = start; i < end; i++) {
			obj.children.push(new GridtreeNode({
				data: data[i],
				store: store,
				parent: obj,
				level: obj.level + 1
			}));
		}
	}
	changepage(page) {
		this.pageIndex = page;
		this.issuceChild(this, this.data, this);
	}
	remove(node) {
		var primarykey = this.primarykey;
		var id = node[primarykey];
		var index = -1;
		var children = this.data;
		if (children) {
			for (var i = 0; i < children.length; i++) {
				if (children[i][primarykey] == id) {
					index = i;
					break;
				}
			}
			if (index != -1) {
				children.splice(index, 1);
				this.children.splice(index, 1);
			}

		}
		if (children.length == 0)
			this.closed = false;
	}
	append(node, index) {
		var data = this.data;
		if (!this.children) {
			Vue.set(this, "children", []);
		}
		if (node instanceof Array) {
			for (var i = 0; i < node.length; i++) {
				var _node = new GridtreeNode({
					data: node[i],
					parent: this,
					store: this,
					level: this.level + 1
				});
				if (typeof index == 'undefined') {

					this.children.push(_node);
					data.push(node[i]);
				} else {
					this.children.splice(index, 0, _node);
					data.splice(index, 0, node[i]);
					index++;
				}
			}
		} else {
			if (this.tree.singleSelection) {
				this.tree.singleSelection.node.selected = false;
			}
			if (this.tree.newObject) {
				this.tree.newObject.selected = false;
			}
			var _node = new GridtreeNode({
				data: node,
				parent: this,
				store: this,
				level: this.level + 1,
				selected: true
			});
			this.tree.newObject = _node;
			if (typeof index == 'undefined') {

				this.children.push(_node);
				data.push(node);
			} else {
				this.children.splice(index, 0, _node);
				data.splice(index, 0, node);
			}
		}
	}
}