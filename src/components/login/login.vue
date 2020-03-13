<template>
    <div class="er-login">
        <div :class="[{'er-login-title':true},'er-login-'+logintype.replace(/,/gi,'-')]">
            <div
                v-if="isaccount"
                @click="type='account'"
                :class="{'selected':type=='account','er-login-name':true}"
            >{{title}}</div>
            <div
                @click="type='mobile'"
                v-if="ismobile"
                :class="{'selected':type=='mobile','er-login-name':true}"
            >短信登录</div>
            <div class="er-login-prcode" @click="switchtype()" v-if="isqrcode">
                <i class="fa fa-qrcode" v-if="type!='qrcode'"></i>
                <i class="fa fa-desktop" v-else-if="type=='qrcode'"></i>
                <span class="er-login-tip">{{tip}}</span>
            </div>
        </div>
        <template v-if="type=='account'||type=='mobile'">
            <div class="er-login-form">
                <div class="er-login-form-con">
                    <template v-if="type=='account'">
                        <div class="er-login-form-item">
                            <a class="er-login-icon">
                                <i class="fa fa-user"></i>
                            </a>
                            <input v-model="info.name" type="text" placeholder="邮箱/用户名" />
                        </div>
                        <div class="er-login-form-item">
                            <a class="er-login-icon">
                                <i class="fa fa-unlock-alt"></i>
                            </a>
                            <input
                                v-model="info.password"
                                :type="seepas?'text':'password'"
                                placeholder="密码"
                            />
                            <a>
                                <i
                                    @mousedown="switchsee(true)"
                                    @mouseup="switchsee(false)"
                                    :class="['fa',{'fa-eye':seepas,'fa-eye-slash':!seepas}]"
                                ></i>
                            </a>
                        </div>
                        <div class="er-login-form-item" v-show="showcode">
                            <a class="er-login-icon">
                                <i class="fa fa-check-circle"></i>
                            </a>
                            <input v-model="info.code" placeholder="验证码" />
                            <a class="er-login-iamge">
                                <slot name="code"></slot>
                                <!--<img src="/dist/image/random.png">-->
                            </a>
                        </div>
                        <div class="er-login-pashelp">
                            <slot name="passtip"></slot>
                        </div>
                    </template>
                    <template v-else>
                        <div class="er-login-form-item">
                            <a class="er-login-icon">
                                <i class="fa fa-mobile-phone"></i>
                            </a>
                            <input v-model="modileInfo.phone" type="text" placeholder="手机号" />
                        </div>
                        <div class="er-login-form-item er-login-form-code">
                            <a class="er-login-icon">
                                <i class="fa fa-unlock-alt"></i>
                            </a>
                            <input v-model="modileInfo.code" type="text" placeholder="验证码" />
                            <a @click="sendcode">{{prompt}}</a>
                        </div>
                    </template>
                    <div class="er-login-message">
                        <slot name="message"></slot>
                    </div>
                </div>
                <div class="er-login-form-action">
                    <er-button @click="login">登录</er-button>
                </div>
                <slot name="account"></slot>
            </div>
        </template>
        <slot name="other"></slot>
        <template v-if="type=='qrcode'">
            <div class="er-login-prcode-con">
                <div class="er-login-prcode-img">
                    <img :src="qrcode" />
                </div>
                <div class="er-login-prcode-info" v-html="qrcodeinfo"></div>
                <slot name="qrcode"></slot>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: "ErRelogin",
    data: function() {
        return {
            title: "用户登录",
            tip: "扫码登录",
            prompt: "获取验证码",
            type: this.defaulttype,
            seepas: false,
            info: {
                name: this.rname,
                password: this.rpassword,
                code: ""
            },
            modileInfo: {
                phone: "",
                code: ""
            }
        };
    },
    computed: {
        isaccount: function() {
            return this.logintype.indexOf("account") != -1;
        },
        isqrcode: function() {
            return this.logintype.indexOf("qrcode") != -1;
        },
        ismobile: function() {
            return this.logintype.indexOf("mobile") != -1;
        }
    },
    props: {
        showcode: {
            type: Boolean,
            default() {
                return false;
            }
        },
        logintype: {
            //登录方式，用户登录，扫码登录,短信登录
            type: String,
            default: function() {
                return "account,qrcode,mobile";
            }
        },
        defaulttype: {
            //默认登录方式，用户登录
            type: String,
            default: function() {
                return "account";
            }
        },
        qrcode: {
            type: String,
            default: function() {
                return "";
            }
        },
        qrcodeinfo: {
            type: String,
            default: function() {}
        },
        rname: {
            type: String,
            default: function() {
                return "";
            }
        },
        rpassword: {
            type: String,
            default: function() {
                return "";
            }
        }
    },
    methods: {
        switchtype: function() {
            if (this.type == "account") {
                this.type = "qrcode";
                this.title = "扫码登录";
                this.tip = "用户登录";
            } else {
                this.type = "account";
                this.title = "用户登录";
                this.tip = "扫码登录";
            }
        },
        switchsee: function(state) {
            this.seepas = state;
        },
        login: function() {
            var info = this.info;
            if (this.type == "modile") {
                info = this.mobileinfo;
            }
            this.$emit("login", info);
        },
        sendcode: function() {
            this.$emit("sendcode", this.mobileinfo.phone);
        },
        codeprompt: function(msg) {
            this.prompt(msg);
        }
    }
};
</script>
