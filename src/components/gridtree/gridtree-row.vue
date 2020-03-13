<script>
import axios from "../../common/ErAxios.js";
export default {
    componentName: "ErGridtreeRow",
    name: "ErGridtreeRow",
    data() {
        return {
            deleted: false,
            expanded: false,
            checked: false,
            clickchecked: false,
            loaded: false,
            loading: false,
            allchecked: false,
            selected: false,
            level: 0
        };
    },
    updated: function() {},
    render: function(createElement) {
        var node = this.node;
        this.row = node.data;
        var row = this.row;
        var id = parseInt(Math.random() * 1e5);
        if (this.primarykey) {
            id = row[this.primarykey];
        }
        id = "node_" + id;
        this.id = id;
        var cols = [];
        var tr = [];
        var coltd = [];
        if (this.showcheckbox) {
            cols.push(
                createElement("col", {
                    attrs: {
                        width: "40"
                    }
                })
            );
            coltd.push(
                createElement("td", [
                    createElement(
                        "div",
                        {
                            attrs: {
                                class: "cell"
                            }
                        },
                        [
                            createElement(
                                "label",
                                {
                                    attrs: {
                                        class: "el-checkbox"
                                    }
                                },
                                [
                                    createElement(
                                        "span",
                                        {
                                            class: [
                                                node.allchecked
                                                    ? "is-checked"
                                                    : node.checked
                                                    ? "is-indeterminate"
                                                    : "",
                                                {
                                                    "el-checkbox__input": true
                                                }
                                            ]
                                        },
                                        [
                                            createElement("span", {
                                                on: {
                                                    click: this.checkClick
                                                },
                                                attrs: {
                                                    class: "el-checkbox__inner"
                                                }
                                            }),
                                            createElement("input", {
                                                attrs: {
                                                    type: "checkbox",
                                                    class:
                                                        "el-checkbox__original"
                                                }
                                            })
                                        ]
                                    )
                                ]
                            )
                        ]
                    )
                ])
            );
        }
        var that = this;
        for (var i = 0; i < this.columns.length; i++) {
            var icon = "";
            var iconclass = "fa ";
            if (node.expanded) {
                iconclass +=
                    " el-tree-node__expand-icon el-icon-caret-right expanded";
            } else {
                iconclass += " el-tree-node__expand-icon el-icon-caret-right";
            }
            var name = this.columns[i].name;

            if (name == this.headcolumn ) {
                if(node.closed){
                icon = createElement("i", {
                    class: iconclass,
                    on: {
                        click: function() {
                            that.expandClick(name);
                        }
                    }
                });
                }
                else{
                    icon=createElement("i",{
                        'class':'empty-icon',
                        domProps:{
                            innerHTML:"&nbsp;"
                        }
                    });
                }
            }
            cols.push(
                createElement("col", {
                    attrs: {
                        name: this.rowColumnClass(i),
                        width: this.columns[i].width
                    }
                })
            );
            var tem = createElement(
                "div",
                {
                    class: this.levelClass(name)
                },
                [
                    icon,
                    createElement("span", {
                        domProps: {
                            innerText: row[name]
                        }
                    })
                ]
            );
            if (this.myslots[name]) {
                //debugger;
                //this.row.children = this.node.data.children;

                tem = this.myslots[name](this);

                coltd.push(
                    createElement(
                        "td",
                        {
                            attrs: {
                                class: this.rowColumnClass(i, name)
                            },
                            style: {
                                textAlign: this.columns[i].align
                            }
                        },
                        [icon, tem]
                    )
                );
            } else {
                coltd.push(
                    createElement(
                        "td",
                        {
                            attrs: {
                                class: this.rowColumnClass(i, name)
                            },
                            style: {
                                textAlign: this.columns[i].align
                            }
                        },
                        [tem]
                    )
                );
            }
        }

        if (this.myslots["open"]) {
            coltd.unshift(
                createElement(
                    "td",
                    {
                        class: {
                            "el-table__expand-icon": true,
                            "el-table__expand-icon--expanded": node.opened
                        },
                        on: {
                            click: this.clickopen
                        }
                    },
                    [
                        createElement("i", {
                            class: "el-icon el-icon-arrow-right"
                        })
                    ]
                )
            );
            cols.unshift(
                createElement("col", {
                    attrs: {
                        width: "40"
                    }
                })
            );
        }
        tr.push(
            createElement(
                "tr",
                {
                    class: {
                        "info-row current-row": node.selected
                    },
                    attrs: {
                        id: id
                    },
                    on: {
                        click: this.handleClick,
                        contextmenu: this.contextmenu,
                        dblclick: function() {
                            that.expandClick(name);
                        }
                    }
                },
                coltd
            )
        );
        if (this.myslots["open"]) {
            if (node.opened) {
                tr.push(
                    createElement("tr", {}, [
                        createElement(
                            "td",
                            {
                                class: "el-table__expaned-cell",
                                attrs: {
                                    colspan:
                                        this.columns.length +
                                        (this.showcheckbox ? 1 : 0) +
                                        1
                                }
                            },
                            [this.myslots["open"](this)]
                        )
                    ])
                );
            }
        }
        if (this.loading) {
            tr.push(createElement("tr"), {}, [
                createElement("td", {
                    attrs: {
                        colspan:
                            this.columns.length +
                            (this.showcheckbox ? 1 : 0) +
                            (this.myslots["open"] ? 1 : 0)
                    },
                    domProps: {
                        innerHTML:
                            '<div class="cell">' +
                            '<div class="el-loading-spinner">' +
                            '<svg class="circular" viewBox="25 25 50 50">' +
                            '<circle class="path" cx="50" cy="50" r="20" fill="none" />' +
                            "</svg></div></div>"
                    }
                })
            ]);
        }

        var childNodes = node.children;
        if (childNodes && childNodes.length > 0) {
            var $children = [];
           
            for (var i = 0; i < childNodes.length; i++) {
                if (typeof childNodes[i].closed == "undefined") {
                    childNodes[i].closed = false;
                }
                $children.push(
                    createElement("er-gridtree-row", {
                        props: {
                            myslots: this.myslots,
                            index: i,
                            node: childNodes[i],
                            primarykey: this.primarykey,
                            columns: this.columns,
                            loadBefore:this.loadBefore,
                            url: this.url,
                            headcolumn: this.headcolumn,
                            showcheckbox: this.showcheckbox,
                            asyncType: this.asyncType,
                            lazy:this.lazy
                        },
                        on: {
                            clicknode: this.clickchildnode,
                            onchecked: this.checkback,
                            contextmenu: this.contextmenuchildnode,
                            loadsuccess:this.loadsuccess
                        }
                    })
                );
            }
            tr.push(
                createElement(
                    "tr",
                    {
                        attrs: {
                            class: "er-gridtree-child"
                        },
                        style: {
                            display: node.expanded ? "" : "none"
                        }
                    },
                    [
                        createElement(
                            "td",
                            {
                                attrs: {
                                    colspan:
                                        this.columns.length +
                                        (this.showcheckbox ? 1 : 0) +
                                        (this.myslots["open"] ? 1 : 0)
                                }
                            },
                            $children
                        )
                    ]
                )
            );
        }

        return createElement(
            "table",
            {
                attrs: {
                    width: "100%",
                    class: "el-table__body",
                    cellpadding: "0",
                    cellspacing: "0",
                    border: "0"
                }
            },
            [createElement("colgroup", cols), createElement("tbody", tr)]
        );
    },
    props: {
        index: Number,

        primarykey: String,
        myslots: {
            type: Object,
            default: function() {
                return {};
            }
        },
        url: String,
        showcheckbox: {
            type: Boolean,
            default: true
        },
        node: {
            default() {
                return {};
            }
        },
        headcolumn: {
            type: String,
            default: ""
        },
        columns: Array,
        loadBefore: {
            type: Function,
            default: function() {
                return function(param) {
                    return ture;
                };
            }
        },
        lazy: {
            type: Boolean,
            default: function() {
                return true;
            }
        },
        asyncType: {
            type: String,
            default: function() {
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
    watch: {
        "node.opened": function() {
            this.$emit("onopen", this);
        },
        "node.allchecked": function() {
            //console.log("allchecked");
            if (!this.node.allchecked) {
                this.$parent.node.allchecked = false;
            } else {
                var sibling = this.$parent.$children;
                var parent = this.$parent;
                var init = 0;
                if (sibling) {
                    for (var i = 0; i < sibling.length; i++) {
                        if (sibling[i].node.allchecked) init++;
                    }
                    if (init == sibling.length) {
                        this.$parent.node.allchecked = true;
                    }
                }
            }
            //console.log(this.$parent);
        },
        "node.checked": function() {
            //console.log("checked");
            if (this.node.clickchecked) {
                var children = this.$children;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        children[i].node.checked = this.node.checked;
                        children[i].node.clickchecked = true;
                        children[i].node.allchecked = this.node.checked;
                    }
                }
            }
            //if(this.checked) { //当前未选中，如果兄弟级全部均未选中，父级则不选中
            var sibling = this.$parent.$children;
            var parent = this.$parent;
            var init = 0;
            if (sibling) {
                for (var i = 0; i < sibling.length; i++) {
                    if (sibling[i].node.checked) init++;
                }
                parent.node.clickchecked = false;
                if (init === 0) {
                    parent.node.checked = false;
                } else if (init == sibling.length) {
                    parent.node.checked = true;
                } else {
                    parent.node.checked = true;
                }
            }
            //console.log(this.$parent);
            //}
        }
    },
    methods: {
        loadsuccess:function(res){
				this.$emit("loadsuccess",res);
			},
        clickopen: function() {
            this.node.opened = !this.node.opened;
            this.$emit("clickopen",this.node);
        },
        checkback: function() {
            this.$emit("onchecked", this);
        },
        rowColumnClass: function(index, item) {
            var c = "el-table_1_column_" + index;
            if (item == this.headcolumn) {
                c += " er-gridtree-head";
            }
            return c;
        },
        levelClass: function(name) {
            //this.node.level = this.$parent.level + 1;
            var c = " er-grid-tree-level" + this.node.level;
            //console.log(c);
            return "cell " + (name === this.headcolumn ? c : "");
        },
        handleClick: function(evt) {
            this.$emit("clicknode", this, evt);
            //evt.stopPropagation();
        },
        contextmenu: function(evt) {
            this.$emit("contextmenu", this, evt);
            //evt.stopPropagation();
        },
        expandClick: function(name) {
            if (this.node.expanded) {
                //展开时
                this.node.expanded = false;
            } else{
                //折叠，但有下级
                this.node.expanded = true;
            }
            
            this.$emit("clickexpand",this.node,this);
            if(this.isList){
                return;
            }
            this.loader();
        },
        clickchildnode: function(obj, evt) {
            this.$emit("clicknode", obj, evt);
            // evt.stopPropagation();
        },
        contextmenuchildnode: function(obj, evt) {
            this.$emit("contextmenu", obj, evt);
            // evt.stopPropagation();
        },
        checkClick: function(evt) {
            if (this.node.checked) {
                this.node.checked = false;
                this.node.allchecked = false;
            } else {
                this.node.checked = true;
                this.node.allchecked = true;
            }
            //是否是点击选中
            this.node.clickchecked = true;
        },
        reloader:function(){
            debugger;
            this.node.loaded=false;
            this.node.clear();
            this.loader();
        },
        loader: function() {
            if (
                !this.node.loaded &&
                (this.node.closed || typeof this.node.close == "undefined") &&
                this.url &&
                this.lazy
            ) {
                var param = Object.assign({}, this.node.row);
                var that = this;
                //console.log(2);
                if (this.loadBefore(param)) {
                    that.node.loaded = true;
                    that.node.loading = true;
                    axios[that.asyncType](that.url, param).then(function(msg) {
                        that.node.loading = false;
                        that.$emit("loadsuccess", msg);
                        if (msg) {
                            that.node.append(msg.data);
                        }
                    });
                }
            }
        },
        columnRender: function(icolumn, index) {
            //console.log(this.myslots);
            if (this.myslots[icolumn]) {
                return this.myslots[icolumn];
            }
        },
        append: function(row, index) {
            this.node.append(row, index);

            //				this.node.expanded = true;
            //				this.node.closed = true;
            //				this.node.loaded = true;
            //				//console.log(3);
            //				if(!this.node.children) this.node.children = [];
            //				this.node.children.push(row);
            //				this.$forceUpdate();
        },
        before: function(row) {
            var parent = this.$parent;
            if (parent) {
                this.$parent.append(row, this.index);
            }
        },
        after: function(row) {
            var parent = this.$parent;
            if (parent) {
                this.$parent.append(row, this.index + 1);
            }
        },
        remove: function() {
            this.$parent.node.remove(this.node.row);
        }
    },
    beforeUpdate: function() {
        //console.log("update");
        //console.log(this.node);
        //console.log(this.node.children);
        if (
            this.$parent.allchecked ||
            (this.$parent.node && this.$parent.node.allchecked)
        ) {
            this.node.checked = true;
            this.node.allchecked = true;
        }
        if (this.node.children && this.node.children.length > 0) {
            //console.log(1);
            this.node.loaded = true;
            this.node.closed = true;
        }
    },
    updated: function() {
        this.$emit("onchecked", this);
    },
    created: function() {
        if (
            this.$parent.allchecked ||
            (this.$parent.node && this.$parent.node.allchecked)
        ) {
            this.node.checked = true;
            this.node.allchecked = true;
        }
        if (this.node.children && this.node.children.length > 0) {
            //console.log(1);
            this.node.loaded = true;
            this.node.closed = true;
        }
    },
    mounted: function() {
        //console.log(this.$parent.node.children.length);
        //console.log(this.node.closed);
        //console.log(this.node.url);
        
        if (this.$parent.node.children.length == 1&&JSON.stringify(this.$parent.node.row)!="{}"&&this.node.closed) {
         
            this.expandClick();
        }
    }
};
</script>
