<template>
    <div>
        <Tips-button
            :button-text="'show tips'"
            @click_button="show_tips"
        ></Tips-button>
        <transition name="tips-slide">
            <Tips-popup v-if="is_tips_open" @hide_tips="hide_tips"></Tips-popup>
        </transition>
    </div>
</template>

<script>
import TipsButton from './Tips-button.vue';
import Tipspopup from './Tips-popup.vue';

export default {
    name: 'TipsComponent',
    components: {
        'Tips-button': TipsButton,
        'Tips-popup': Tipspopup
    },
    data() {
        return {
            is_tips_open: true
        };
    },
    methods: {
        show_tips() {
            this.is_tips_open = true;
        },
        hide_tips() {
            this.is_tips_open = false;
        }
    }
};
</script>

<style scoped lang="scss">
.tips-slide-enter-active,
.tips-slide-leave-active {
    transform: translateX(0);
    transition: transform 0.5s;
}
.tips-slide-enter,
.tips-slide-leave-to,
.tips-slide-leave-active {
    transform: translateX(320px);
}
</style>
