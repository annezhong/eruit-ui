export default{
	props:{
        indicatorDirection:{////指示器方向
            type:String,
            default:function(){
                return "center";
            }
		},
		slidopen:{ //是否启用移动
			type:Boolean,
			default:function(){
				return false;
			}
		},
        slidMode:{ //移动方式(move和fadeIn,默认为fadeIn)
            type:String,
            default:function(){
                return "move";
            }
        },
		slidShowArrow:{ //显示移动图标
			type:Boolean,
			default:function(){
				return false;
			}
		},
		slidArrowLeft:{ //左移动图标
			type:String,
			default:function(){
				return "fa-angle-left";
			}
		},
		slidArrowRight:{ //右移动图标
			type:String,
			default:function(){
				return "fa-angle-right";
			}
		},
		slidArrowUp:{ //上移动图标
			type:String,
			default:function(){
				return "fa-angle-up";
			}
		},
		slidArrowDown:{ //下移动图标
			type:String,
			default:function(){
				return "fa-angle-down";
			}
		},
		slidVerticalNum:{ //纵向移动显示条数
			type:[Number,String],
			default:function(){
				return 5;
			}
		},
		slidDirection:{
			type:String,
			default:function(){
				return "horizontal";
			}
		},
		slidSpeed:{//移动速度，单位秒
			type:[Number,String],
			default:function(){
				return 3;
			}
		},
		slidInterval:{//翻页间隔时间,单位秒
			type:Number,
			default:function(){
				return 3;
			}
		},
		slidShowPagination:{ //是否显示分页
			type:Boolean,
			default:function(){
				return true;
			}
		}
	}
}
