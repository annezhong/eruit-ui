export default class GridtreeNode {
	constructor(settings) {
		settings = settings || {};
		this.data = settings.data || [];
		this.store = settings.store || null;
		this.deleted = false;
		this.expanded = false;
		this.checked = false;
		this.clickchecked = false;
		this.loaded = false;
		this.loading = false;
		this.allchecked = false;
		this.opened=false;
		this.selected = settings.selected;
		if(typeof this.selected == "undefined")
			this.selected = false;
		this.parent = settings.parent;
		this.level = settings.level || 0;
		this.row = {};
		this.children = [];
		for(var item in this.data) {
			if(item !== "children") {
				this.row[item] = this.data[item];
			}
		}
		this.closed = this.row.closed;
		var children = this.data.children;
		this.store.issuceChild(this, children, this.store);
	}
    clear(){
		this.data.children.splice(0,this.data.children.length);
		this.children.splice(0,this.children.length);
	}
	append(node, index) {
        // debugger;
		if(!this.data.children) {
            Vue.set(this.data,"children",[]);
        }
		if(node instanceof Array) {
			for(var i = 0; i < node.length; i++) {
				if(typeof index == 'undefined') {
					this.data.children = this.data.children.concat(node);
					this.children.push(new GridtreeNode({
						data: node[i],
						parent: this,
						store: this.store,
						level: this.level + 1
					}));
				} else {
					this.data.children.splice(index, 0, node);
					this.children.splice(index, 0, new GridtreeNode({
						data: node[i],
						parent: this,
						store: this.store,
						level: this.level + 1
					}));
					index++;
				}
			}
		} else {
			if(this.store.tree.singleSelection) {
				this.store.tree.singleSelection.node.selected = false;
			}
			if(this.store.tree.newObject) {
				this.store.tree.newObject.selected = false;
			}
			var _node = new GridtreeNode({
				data: node,
				parent: this,
				store: this.store,
				level: this.level + 1,
				selected: true
			});

			this.store.tree.newObject = _node;
			if(typeof index == 'undefined') {
				this.data.children.push(node);
				this.children.push(_node);
			} else {
				this.data.children.splice(index, 0, node);
				this.children.splice(index, 0, _node);
			}
		}
		this.closed = true;
		this.expanded = true;
	}
	remove(node) {
		var primarykey = this.store.primarykey;
		var id = node[primarykey];
		var index = -1;
		var children = this.data.children;
		if(children) {
			for(var i = 0; i < children.length; i++) {
				if(children[i][primarykey] == id) {
					index = i;
					break;
				}
			}
			if(index != -1) {
				children.splice(index, 1);
				this.children.splice(index, 1);
			}

		}
		if(children.length == 0)
			this.closed = false;
	}
}
