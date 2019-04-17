<template>
    <div class="tips-block">
        <div class="tips-block-btn">
            <Tips-button
                :button-text="'hide tips'"
                @click_button="hide_tips"
            ></Tips-button>
        </div>
        <div class="tips-block__content">
            <p class="tips-content__entry">
                <span class="entry__icon-face"></span>
                <span class="entry__text">
                    <span class="entry--white">Lorem ipsum dolor</span> sit
                    amet, consectetur, adipicing edit, euismod bibendum loareet.
                </span>
            </p>
            <p class="tips-content__entry">
                <span class="entry__icon-lips"></span>
                <span class="entry__text">
                    <span class="entry--white">Lorem ipsum dolor sit amet</span
                    >, consectetur, adipicing edit, euismod bibendum loareet.
                </span>
            </p>
            <p class="tips-content__entry">
                <span class="entry__icon-eye"></span>
                <span class="entry__text">
                    <span class="entry--white">Lorem ipsum</span> dolor sit
                    amet, consectetur, adipicing edit, euismod bibendum loareet.
                </span>
            </p>
            <p class="tips-content__entry">
                <span class="entry__icon-face"></span>
                <span class="entry__text">
                    <span class="entry--white">Lorem</span> ipsum dolor sit
                    amet, consectetur, adipicing edit, euismod bibendum loareet.
                </span>
            </p>
            <p class="tips-content__entry">
                <span class="entry__icon-face"></span>
                <span class="entry__text">
                    <span class="entry--white">Lorem ipsum dolor</span> sit
                    amet, consectetur, adipicing edit, euismod bibendum loareet.
                </span>
            </p>
            <p class="tips-content__entry">
                <span class="entry__icon-lips"></span>
                <span class="entry__text">
                    <span class="entry--white">Lorem ipsum dolor sit amet</span
                    >, consectetur, adipicing edit, euismod bibendum loareet.
                </span>
            </p>
            <p class="tips-content__entry">
                <span class="entry__icon-eye"></span>
                <span class="entry__text">
                    <span class="entry--white">Lorem ipsum</span> dolor sit
                    amet, consectetur, adipicing edit, euismod bibendum loareet.
                </span>
            </p>
        </div>
    </div>
</template>

<script>
import TipsButton from './Tips-button.vue';

export default {
    name: 'Tipspopup',
    components: {
        'Tips-button': TipsButton
    },
    methods: {
        hide_tips() {
            this.$emit('hide_tips');
        }
    }
};
</script>

<style scoped lang="scss">
.tips-block {
    display: block;
    z-index: 110;
    border-radius: 10px;
    position: fixed;
    background: #474a4b;
    box-shadow: -10px 0px 10px rgba(20, 22, 23, 0.25);
    width: 320px;
    height: 98.5vh;
    top: 6px;
    right: 0px;
    &-btn {
        margin-left: auto;
        margin-right: 30px;
        margin-top: 24px;
        margin-bottom: 20px;
        border: 1px solid #469aeb;
        border-radius: 14px;
        max-width: 90px;
        padding-left: 0;
        padding-right: 0;
        text-align: center;
        height: 25px;
    }
    &__text {
        display: flex;
        align-items: center;
        padding: 5px;
        .show-tips-icon {
            display: inline-block;
            margin-right: 5px;
            width: 10px;
            height: 13px;
            background-image: url(../../assets/show-off.svg);
            background-repeat: no-repeat;
        }
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
        text-transform: uppercase;
        color: #469aeb;
        vertical-align: middle;
    }
    &__content {
        padding: 0 30px 0;
    }
    .tips-content {
        &__entry {
            font-style: normal;
            font-size: 13px;
            line-height: 18px;
            color: #c4c4c4;
            margin-bottom: 30px;
            text-align: left;
            display: flex;
            .entry {
                &--white {
                    font-weight: bold;
                }
            }
            .entry__icon {
                &-face,
                &-lips,
                &-eye {
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                    background-repeat: no-repeat;
                    flex-basis: 20%;
                    max-width: 20%;
                    margin-right: 10px;
                }
                &-face {
                    background-image: url(../../assets/face.svg);
                }
                &-lips {
                    background-image: url(../../assets/lips.svg);
                }
                &-eye {
                    background-image: url(../../assets/eye.svg);
                }
            }
        }
    }
}
</style>
