<template>
	<div :class="['er-news-list',customClass]" :style="listStyle" v-infinite-scroll="loadList" :infinite-scroll-disabled="!(showpage&&showMoreType=='3')" >
		<template v-if="type=='1'">
			<div :class="[{'er-news-list-texts':true,'er-slid':slidopen},slidopen?'er-slid-'+slidDirection:'',(slidopen&&slidMode=='move')?'':'slidFadeIn']" :slid-mode="slidMode" :slid-vertical-num="slidVerticalNum" :slid-direction="slidDirection" :slid-speed="slidSpeed" :slid-interval="slidInterval" :cols="cols">
				<div :class="{'er-slid-interval':!!slidInterval&&slidShowArrow,'er-news-list-texts-ul':true,'er-slid-scroll':slidopen}">
					<div class="er-slid-scroll-con"><div @click="clickitem(item,index)" @mouseover="mouseoveritem(item,index)" :class="['list',openselected&&index==selected?'selected':'']" v-for="(item,index) in ErAsyncRows" :key="id?item[id]:_randomKey()" :style="itemStyle.concat(colstyle)" v-if="isshowList(index)">
							<div class="er-news-list-con" :style="panelStyle">
								<div class="textright2" v-if="showdate&&$scopedSlots.right">
									<slot name="right" :item="item" :index="index"></slot>
								</div>
								<div class="text" v-if="$scopedSlots.title">
									<slot name="title" :item="item" :index="index"></slot>
								</div>
							</div>
						</div>
					</div>
				</div>				
				<template v-if="slidopen&&slidShowArrow&&slidDirection=='horizontal'&&!!slidInterval">
					<div class="er-slit-prev">
						<a><i :class="['fa',slidArrowLeft]"></i></a>
					</div>
					<div class="er-slit-next">
						<a><i :class="['fa',slidArrowRight]"></i></a>
					</div>
				</template>
				<template v-if="slidopen&&slidShowArrow&&slidDirection=='vertical'&&!!slidInterval">
					<div class="er-slit-up">
						<a><i :class="['fa',slidArrowUp]"></i></a>
					</div>
					<div class="er-slit-down">
						<a><i :class="['fa',slidArrowDown]"></i></a>
					</div>
				</template>
				<template v-if="slidopen&&slidShowPagination&&!!slidInterval">
					<div :class="['er-slid-pagination',indicatorDirection]"></div>
				</template>
			</div>
		</template>
		<template v-else-if="type=='2'">
			<div :class="[{'er-slid':slidopen},slidopen?'er-slid-'+slidDirection:'',(slidopen&&slidMode=='move')?'':'slidFadeIn']" :slid-mode="slidMode" :slid-vertical-num="slidVerticalNum" :slid-direction="slidDirection" :slid-speed="slidSpeed" :slid-interval="slidInterval" :cols="cols">
				<div :class="{'er-slid-interval':!!slidInterval&&slidShowArrow,'er-news-list-body':true,'er-slid-scroll':slidopen}">
					<div class="er-slid-scroll-con">	<div @click="clickitem(item,index)" @mouseover="mouseoveritem(item,index)" :class="['er-news-list-box',openselected&&index==selected?'selected':'']" v-for="(item,index) in ErAsyncRows" :key="id?item[id]:_randomKey()" :style="itemStyle.concat(colstyle)" v-if="isshowList(index)">
							<div class="er-news-list-con" :style="panelStyle">
								<div class="pic" v-if="showphoto&&$scopedSlots.image" :style="[imageStyle].concat(imgStyle)">
									<div class="pic-ratio" :style="[imageRatioStype]">
										<div class="pic-con">
											<slot name="image" :item="item" :index="index"></slot>
										</div>
									</div>

								</div>
								<div class="er-news-list-box-title">
									<div class="title">
										<div class="textright" v-if="showdate&&$scopedSlots.right">
											<slot name="right" :index="index" :item="item"></slot>
										</div>
										<div class="textleft" v-if="$scopedSlots.title">
											<slot name="title" :index="index" :item="item"></slot>
										</div>
									</div>
									<div class="news" v-if="showdetail&&$scopedSlots.detail">
										<slot name="detail" :index="index" :item="item"></slot>
									</div>
									<div class="addition" v-if="showaddition&&$scopedSlots.addition">
										<slot name="addition" :index="index" :item="item"></slot>
									</div>
								</div>
								<!--新增内容，默认为false-->
								<div class="er-news-list-addcontent" v-if="showaddcontent&&$scopedSlots.addcontent">
									<slot name="addcontent" :index="index" :item="item"></slot>
								</div>
							</div>

						</div>
						</div>
					</div>
			
				<template v-if="slidopen&&slidShowArrow&&slidDirection=='horizontal'&&!!slidInterval">
					<div class="er-slit-prev">
						<a><i :class="['fa',slidArrowLeft]"></i></a>
					</div>
					<div class="er-slit-next">
						<a><i :class="['fa',slidArrowRight]"></i></a>
					</div>
				</template>
				<template v-if="slidopen&&slidShowArrow&&slidDirection=='vertical'&&!!slidInterval">
					<div class="er-slit-up">
						<a><i :class="['fa',slidArrowUp]"></i></a>
					</div>
					<div class="er-slit-down">
						<a><i :class="['fa',slidArrowDown]"></i></a>
					</div>
				</template>
				<template v-if="slidopen&&slidShowPagination&&!!slidInterval">
					<div :class="['er-slid-pagination',indicatorDirection]"></div>
				</template>
			</div>
		</template>
		<template v-else-if="type=='3'">
			<div :class="[{'er-slid':slidopen},slidopen?'er-slid-'+slidDirection:'',(slidopen&&slidMode=='move')?'':'slidFadeIn']" :slid-mode="slidMode" :slid-vertical-num="slidVerticalNum" :slid-direction="slidDirection" :slid-speed="slidSpeed" :slid-interval="slidInterval" :cols="cols">
				<div :class="{'er-slid-interval':!!slidInterval&&slidShowArrow,'er-news-list-body':true,'er-slid-scroll':slidopen}">
					<div class="er-slid-scroll-con">	<div @click="clickitem(item,index)" @mouseover="mouseoveritem(item,index)" :class="['er-news-list-box',openselected&&index==selected?'selected':'']" v-for="(item,index) in ErAsyncRows" :key="id?item[id]:_randomKey()" :style="itemStyle.concat(colstyle)" v-if="isshowList(index)">
							<div class="er-news-list-con" :style="panelStyle">
								<div class="er-news-list-box-photo " v-if="showphoto&&$scopedSlots.image" :style="imgStyle">
									<div class="tu" :style="[imageStyle]">
										<div :style="[imageRatioStype]" class="tu_ratio">
											<div class="tu-con">
												<slot name="image" :item="item" :index="index"></slot>
											</div>
										</div>
									</div>
								</div>
								<div class="er-news-list-box-title">
									<div class="title">
										<div class="textright" v-if="showdate&&$scopedSlots.right">
											<slot name="right" :index="index" :item="item"></slot>
										</div>
										<div class="textleft" v-if="$scopedSlots.title">
											<slot name="title" :index="index" :item="item"></slot>
										</div>
									</div>
									<div class="news" v-if="showdetail&&$scopedSlots.detail">
										<slot name="detail" :index="index" :item="item"></slot>
									</div>
									<div class="addition" v-if="showaddition&&$scopedSlots.addition">
										<slot name="addition" :index="index" :item="item"></slot>
									</div>
								</div>
								<!--新增内容，默认为false-->
								<div class="er-news-list-addcontent" v-if="showaddcontent&&$scopedSlots.addcontent">
									<slot name="addcontent" :index="index" :item="item"></slot>
								</div>
							</div>
							</div>
						</div>
					</div>
				
				<template v-if="slidopen&&slidShowArrow&&slidDirection=='horizontal'&&!!slidInterval">
					<div class="er-slit-prev">
						<a><i :class="['fa',slidArrowLeft]"></i></a>
					</div>
					<div class="er-slit-next">
						<a><i :class="['fa',slidArrowRight]"></i></a>
					</div>
				</template>
				<template v-if="slidopen&&slidShowArrow&&slidDirection=='vertical'&&!!slidInterval">
					<div class="er-slit-up">
						<a><i :class="['fa',slidArrowUp]"></i></a>
					</div>
					<div class="er-slit-down">
						<a><i :class="['fa',slidArrowDown]"></i></a>
					</div>
				</template>
				<template v-if="slidopen&&slidShowPagination&&!!slidInterval">
					<div :class="['er-slid-pagination',indicatorDirection]"></div>
				</template>
			</div>
		</template>
		<template v-else-if="type=='4'" :slid-vertical-num="slidVerticalNum" :slid-direction="slidDirection" :slid-speed="slidSpeed" :slid-interval="slidInterval" :cols="cols">
			<div :class="[{'er-slid':slidopen},slidopen?'er-slid-'+slidDirection:'']">
				<div :class="{'er-slid-interval':!!slidInterval&&slidShowArrow,'er-news-list-body':true,'er-slid-scroll':slidopen}">
					<div class="er-slid-scroll-con">	<div @click="clickitem(item,index)" @mouseover="mouseoveritem(item,index)" :class="['er-news-list-Line',openselected&&index==selected?'selected':'']" v-for="(item,index) in ErAsyncRows" :key="id?item[id]:_randomKey()" :style="itemStyle.concat(colstyle)" v-if="isshowList(index)">
							<div class="er-news-list-con" :style="panelStyle">
								<div class="articleCalendar" v-if="showdate&&$scopedSlots.date">
									<div class="er-news-listDate">
										<slot name="date" :index="index" :item="item"></slot>
									</div>
								</div>
								<div class="er-news-listLineBody">
									<div class="articleCircleOuter" v-if="showdate&&$scopedSlots.date">
										<div class="articleCircle"></div>
									</div>
									<div :class="{'articleTitlePanel':true,'articleTitlePanel_nodate':!showdate}">
										<div class="articleTitlePanel-title" v-if="$scopedSlots.title">
											<slot name="title" :index="index" :item="item"></slot>
										</div>
										<div class="articleTitlePanel-con" v-if="showdetail&&$scopedSlots.detail">
											<slot name="detail" :index="index" :item="item"></slot>
										</div>
										<div class="addition" v-if="showaddition&&$scopedSlots.addition">
											<slot name="addition" :index="index" :item="item"></slot>
										</div>
									</div>
								</div>
								<!--新增内容，默认为false-->
								<div class="er-news-list-addcontent" v-if="showaddcontent&&$scopedSlots.addcontent">
									<slot name="addcontent" :index="index" :item="item"></slot>
								</div>
							</div>
						</div>
						</div>
					</div>
				
				<template v-if="slidopen&&slidShowArrow&&slidDirection=='horizontal'&&!!slidInterval">
					<div class="er-slit-prev">
						<a><i :class="['fa',slidArrowLeft]"></i></a>
					</div>
					<div class="er-slit-next">
						<a><i :class="['fa',slidArrowRight]"></i></a>
					</div>
				</template>
				<template v-if="slidopen&&slidShowArrow&&slidDirection=='vertical'&&!!slidInterval">
					<div class="er-slit-up">
						<a><i :class="['fa',slidArrowUp]"></i></a>
					</div>
					<div class="er-slit-down">
						<a><i :class="['fa',slidArrowDown]"></i></a>
					</div>
				</template>
				<template v-if="slidopen&&slidShowPagination&&!!slidInterval">
					<div :class="['er-slid-pagination',indicatorDirection]"></div>
				</template>
			</div>
		</template>
		<template v-else-if="type=='5'">
			<div :class="[{'er-slid':slidopen},slidopen?'er-slid-'+slidDirection:'']" :slid-vertical-num="slidVerticalNum" :slid-direction="slidDirection" :slid-speed="slidSpeed" :slid-interval="slidInterval" :cols="cols">
				<div :class="{'er-slid-interval':!!slidInterval&&slidShowArrow,'er-news-list-body':true,'er-slid-scroll':slidopen}">
					<div class="er-slid-scroll-con">	<div @click="clickitem(item,index)" @mouseover="mouseoveritem(item,index)" :class="['er-news-list-box',openselected&&index==selected?'selected':'']"  v-for="(item,index) in ErAsyncRows" :key="id?item[id]:_randomKey()" :style="itemStyle.concat(colstyle)" v-if="isshowList(index)">
							<div class="er-news-list-con" :style="panelStyle">
								<div class="er-news-list-box-photo er-news-list-box-item" :style="imgStyle" v-if="showdate&&$scopedSlots.date">
									<div class="time" :style="[imageStyle]">
										<div class="bili" :style="[imageRatioStype]">
											<div class="tt">
												<slot name="date" :index="index" :item="item"></slot>
											</div>
										</div>
									</div>
								</div>
								<div class="er-news-list-box-title">
									<div class="title" v-if="$scopedSlots.title">
										<slot name="title" :index="index" :item="item"></slot>
									</div>
									<div class="news" v-if="showdetail&&$scopedSlots.detail">
										<slot name="detail" :index="index" :item="item"></slot>
									</div>
									<div class="addition" v-if="showaddition&&$scopedSlots.addition">
										<slot name="addition" :index="index" :item="item"></slot>
									</div>
								</div>
								<!--新增内容，默认为false-->
								<div class="er-news-list-addcontent" v-if="showaddcontent&&$scopedSlots.addcontent">
									<slot name="addcontent" :index="index" :item="item"></slot>
								</div>
							</div>
						</div>
					</div>
					</div>
				
				<template v-if="slidopen&&slidShowArrow&&slidDirection=='horizontal'&&!!slidInterval">
					<div class="er-slit-prev">
						<a><i :class="['fa',slidArrowLeft]"></i></a>
					</div>
					<div class="er-slit-next">
						<a><i :class="['fa',slidArrowRight]"></i></a>
					</div>
				</template>
				<template v-if="slidopen&&slidShowArrow&&slidDirection=='vertical'&&!!slidInterval">
					<div class="er-slit-up">
						<a><i :class="['fa',slidArrowUp]"></i></a>
					</div>
					<div class="er-slit-down">
						<a><i :class="['fa',slidArrowDown]"></i></a>
					</div>
				</template>
				<template v-if="slidopen&&slidShowPagination&&!!slidInterval">
					<div :class="['er-slid-pagination',indicatorDirection]"></div>
				</template>
			</div>
		</template>
		<div v-show="ErAsyncRows.length==0&&shownodata" class="er-news-list-nodata">
			<slot name="nodata">暂无数据</slot>
		</div>
		<el-pagination v-if="showMorePage()" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="cpage" :page-sizes="listpageSizes" :page-size="ErAsyncParames.rows||(ErAsyncParames.parames?ErAsyncParames.parames.rows:listpageSize)||listpageSize" :layout="pagelayout" :total="pagetotal" />
		<a v-if="showMoreButton()" href="javascript:void(0)" class="loadMore" @click="clickLoadMore()">点击加载更多</a>
	</div>
</template>
<script>
	import ErAsync from "../../common/ErAsync.js"
	import ListBase from "./listbase.js"
	import Slid from "./slid.js"
	export default {
		name: "ErNewsList",
		mixins: [ErAsync, ListBase, Slid],
		data: function() {
			return {
				cpage: this.listcurrentPage,
				pagetotal: this.listtotal
			}
		},
		props: {
		    id:{/////区别字段id,for循环key关键字段
		      type:String,
				default(){
		          return ""
				}
			},
		    shownodata:{
		      	type:Boolean,
				default(){
		          return false
				}
			},
			colWidth: { //第列宽度，分列显示模式该属性无效
				type: String,
				default: function() {
					return "";
				}
			},
			isCols: { //是否启用分列显示模式
				type: Boolean,
				default: function() {
					return true;
				}
			},
			cols: { //每行显示数量，默认5
				type: [String,Number],
				default: function() {
					return 1;
				}
			},
			imageRatio: {
				type: String,
				default: function() {
					return "";
				}
			},
			imageWidth: {
				type: String,
				default: function() {
					return "";
				}
			},
			/*图片*/
			showphoto: {
				type: Boolean,
				default: function() {
					return true;
				}
			},
			/*附加信息*/
			showaddition: {
				type: Boolean,
				default: function() {
					return false;
				}
			},
			/*附加内容*/
			showaddcontent: {
				type: Boolean,
				default: function() {
					return false;
				}
			},
			/*描述*/
			showdetail: {
				type: Boolean,
				default: function() {
					return true;
				}
			},
			/*日期*/
			showdate: {
				type: Boolean,
				default: function() {
					return true;
				}
			},
			//列表类型
			type: {
				type: String,
				default: function() {
					return "1";
				}
			},
			panelStyle: {
				type: Array,
				default: function() {
					return [];
				}
			},
            imgStyle: {
                type: Array,
                default: function() {
                    return [];
                }
            }
		},
		computed: {
			colstyle: function() {
				var _style = {};
				
				if(this.isCols) {
					var p = parseInt((1 / parseInt(this.cols))*1000)/1000 * 100;
					_style.width = p + "%";
				} else if(this.colWidth) {
					_style.width = this.colWidth;
				} else {
					_style.width = "100%";
				}
				return _style;
			},
			imageStyle: function() {
				var _style = {};
				if(this.imageWidth) {
					var reg = new RegExp("^[0-9]*$");
					if(reg.test(this.imageWidth)) {
						_style.width = this.imageWidth + "px";
						//全数字带上单位
					} else {
						_style.width = this.imageWidth; //+ "px";//不能带单位，单位用户自定义
					}
				}
				return _style;
			},
			imageRatioStype: function() {
				var _style = {};
				if(this.imageRatio) {
					var ratio = this.imageRatio.split(":");
					if(ratio.length == 2) {
						var r = (ratio[1] / ratio[0]).toFixed(3);
						_style["paddingTop"] = r * 100 + "%";
					}
				}
				return _style;
			}
		},
		methods: {
			clickitem: function(item, index) {
				this.$emit("clickitem", item, index);
			},
            mouseoveritem:function (item,index) {
                this.$emit("mouseoveritem", item, index);
            }
		}
	}
</script>
