<template>
    <transition name="popup">
        <div class="disclaimer-popup">
            <div class="inner">
                <div class="header">
                    <div class="title">
                        Disclaimer header
                    </div>
                </div>
                <div class="content">
                    <div class="simple-form">
                        <p class="entry">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aenean euismod bibendum laoreet. Proin gravida
                            dolor sit amet lacus accumsan et viverra justo
                            commodo. Proin sodales pulvinar sic tempor. Sociis
                            natoque penatibus et magnis dis parturient montes,
                            nascetur ridiculus mus. Nam fermentum, nulla luctus
                            pharetra vulputate, felis tellus mollis orci, sed
                            rhoncus pronin sapien nunc accuan eget
                        </p>
                        <p class="entry">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aenean euismod bibendum laoreet. Proin gravida
                            dolor sit amet lacus accumsan et viverra justo
                            commodo. Proin sodales pulvinar sic tempor. Sociis
                            natoque penatibus et magnis dis parturient montes,
                            nascetur ridiculus mus. Nam fermentum, nulla luctus
                            pharetra vulputate, felis tellus mollis orci, sed
                            rhoncus pronin sapien nunc accuan eget
                        </p>
                        <p class="entry">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aenean euismod bibendum laoreet. Proin gravida
                            dolor sit amet lacus accumsan et viverra justo
                            commodo. Proin sodales pulvinar sic tempor. Sociis
                            natoque penatibus et magnis dis parturient montes,
                            nascetur ridiculus mus. Nam fermentum, nulla luctus
                            pharetra vulputate, felis tellus mollis orci, sed
                            rhoncus pronin sapien nunc accuan eget
                        </p>
                        <div class="disclaimer-btns">
                            <button
                                class="disclaimer-accept"
                                @click="accept_disclaimer"
                            >
                                <span class="text">Agree</span>
                                <span class="fade"></span>
                            </button>
                            <button
                                class="disclaimer-cancel"
                                @click="cancel_disclaimer"
                            >
                                <span class="text">Cancel</span>
                                <span class="fade"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Disclaimer',
    methods: {
        ...mapActions({
            DISCLAIMER_HIDE: 'DISCLAIMER_HIDE',
            NOTIFICATION_HIDE: 'notification_store/NOTIFICATION_HIDE',
            BUTTONS_ENABLE: 'video_store/BUTTONS_ENABLE'
        }),
        accept_disclaimer() {
            this.NOTIFICATION_HIDE();
            this.DISCLAIMER_HIDE();
            this.BUTTONS_ENABLE();
        },
        cancel_disclaimer() {
            this.DISCLAIMER_HIDE();
        }
    }
};
</script>

<style scoped lang="scss">
.disclaimer-popup {
    position: fixed;
    z-index: 99;
    background: rgba(11, 11, 11, 0.8);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    white-space: nowrap;
    text-align: center;
    transition: opacity 0.3s ease;
    font-size: 0;
    padding: 15px;
    &:after {
        content: '';
        width: 0;
        height: 100%;
        display: inline-block;
        vertical-align: middle;
    }
    .inner {
        width: 100%;
        padding: 0;
        max-width: 643px;
        background: #ffffff;
        box-shadow: 0px 1px 15px rgba(150, 186, 221, 0.3);
        border-radius: 3px;
        text-align: left;
        font-size: 14px;
        white-space: normal;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        transition: all 0.2s ease;
        .header {
            padding: 17px 30px 0px;
            font-style: normal;
            font-weight: normal;
            font-size: 20px;
            line-height: normal;

            color: #333637;
        }
        .content {
            padding: 0 30px 30px;
            .entry {
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 19px;

                color: #141617;
                margin-top: 20px;
            }
        }
        .disclaimer-btns {
            text-align: center;
            .disclaimer {
                &-accept,
                &-cancel {
                    &::before {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 1;
                        border-radius: 0;
                    }
                    width: 100px;
                    height: 40px;
                    cursor: pointer;
                    border-width: 1px;
                    border-radius: 3px;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: normal;
                    text-align: center;
                    text-transform: uppercase;
                    .text {
                        position: relative;
                        display: block;
                        z-index: 3;
                        font-size: unset;
                        padding: 10px 25px;
                    }
                }
                &-accept {
                    margin-right: 10px;
                    background: #469aeb;
                    color: #ffffff;
                }
                &-cancel {
                    background: #ffffff;
                    color: #848788;
                    border-style: solid;
                }
            }
        }
    }

    &.active {
        opacity: 1;
        .inner {
            transition-delay: 0.2s;
            opacity: 1;
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
    }
}
@media screen and (max-width: 1024px) {
    .disclaimer-popup {
        &.skills-popup {
            .inner {
                max-width: 620px;
            }
        }
    }
}
@media screen and (max-width: 768px) {
    .disclaimer-popup {
        padding: 10px;

        .inner {
            .popup-head {
                padding: 18px 10px;
                .head-title {
                    font-size: 18px;
                    line-height: normal;
                    font-weight: normal;
                }
            }
            .content {
                padding: 20px 10px;
            }
            .simple-form {
                .btn {
                    min-width: 100px;
                    max-width: 155px;
                }
                .form-btn {
                    display: inline-block;
                    margin: 0 5px;
                    margin-right: 0;
                    .text {
                        padding-left: 5px;
                        padding-right: 5px;
                    }
                }
                .delete-btn {
                    margin-left: 0;
                    margin-right: 5px;
                }
            }
        }
    }
}
@media screen and (max-width: 640px) {
    .vue-popup {
        &.skills-popup {
            .inner {
                max-width: 420px;
            }
        }
    }
}
@media screen and (max-width: 480px) {
    .vue-popup {
        .inner {
            .simple-form {
                .btn {
                    min-width: 100px;
                    max-width: 100%;
                    margin: 0;
                    &:first-child {
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
}
.popup-fade-enter-active,
.popup-fade-leave-active {
    transition: all 0.3s;
}
.popup-fade-enter, .popup-fade-leave-to, .popup-fade-leave-active/* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
.popup-fade-enter .inner,
.popup-fade-leave-active .inner {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
}
</style>
