<template>
    <div class="small-question__profile">
        <div class="see-profile__button" @click="toggleProfileText">
            see image
        </div>
        <transition name="info-fade">
            <div v-if="isShowQuestionImages" class="see-profile__popup">
                <div class="profile-text">
                    <p v-for="(image, index) in questionImages" :key="index">
                        {{ image }}
                    </p>
                </div>
                <div class="close-profile-text" @click="closeProfileText"></div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'ImageQuestion',
    props: {
        questionImages: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            isShowQuestionImages: false
        };
    },
    methods: {
        toggleProfileText() {
            this.isShowQuestionImages = !this.isShowQuestionImages;
        },
        closeProfileText() {
            this.isShowQuestionImages = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.small-question__profile {
    position: relative;
}
.see-profile {
    &__button {
        cursor: pointer;
        border: 1px solid #469aeb;
        border-radius: 14px;
        padding-left: 0;
        padding-right: 0;
        text-align: center;
        height: 25px;
        display: flex;
        align-items: center;
        padding: 5px 15px;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
        text-transform: uppercase;
        color: #469aeb;
        vertical-align: middle;
    }
    &__popup {
        z-index: 5;

        color: #848788;
        border-radius: 4px;
        position: absolute;
        left: -60px;
        top: -195px;
        background: white;

        line-height: 19px;

        .profile-text {
            width: 442px;
            height: 149px;
            margin: 15px 7px 19px 17px;
            padding-right: 10px;
            overflow-y: scroll;
            box-sizing: border-box;
        }

        .close-profile-text {
            cursor: pointer;
            position: absolute;
            top: 0;
            right: -25px;
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
            background-image: url(../../assets/close-see-profile.svg);
        }

        &:after {
            top: 100%;
            left: 100px;
            content: ' ';
            border: 5px solid transparent;
            border-top: 5px solid white;
            position: absolute;
            pointer-events: none;
        }
    }
    &:hover {
        .tooltip {
            display: block;
        }
    }
}

.info-fade-enter-active,
.info-fade-leave-active {
    transition: all 0.5s;
}

.info-fade-enter,
.info-fade-leave-to {
    opacity: 0;
}
</style>
