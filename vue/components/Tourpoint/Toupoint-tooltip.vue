/* eslint-disable vue/html-indent */
<template>
    <div class="ai-tourpoint-wrap">
        <div
            class="tourpoint-marker-wrap"
            @mouseenter="onMouseEnter"
            @click="onMouseClick"
        >
            <div class="tourpoint-marker"></div>
        </div>
        <div
            v-if="isTooltipActive"
            v-click-outside="onMouseLeave"
            class="tooltiptext"
        >
            <span class="tooltiptext-header">Important.</span>
            <span class="tooltiptext-content"
                >Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                 Doloremque deserunt error aliquid id, illo, tempore nemo ipsam
                 it aspernatur sint enim natus ducimus! Explicabo dicta, 
                 corrupti tenetur quo voluptatum natus..</span
            >
            <span class="tooltiptext-close" @click="onMouseLeave"></span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Tooltip',
    directives: {
        'click-outside': {
            bind: function(el, binding, vnode) {
                el.clickOutsideEvent = function(event) {
                    if (
                        !event.target.classList.contains(
                            'tooltiptext-header'
                        ) &&
                        !event.target.classList.contains(
                            'tooltiptext-content'
                        ) &&
                        !event.target.classList.contains('tooltiptext') &&
                        !event.target.classList.contains(
                            'tourpoint-marker-wrap'
                        )
                    ) {
                        if (!(el == event.target)) {
                            vnode.context[binding.expression](event);
                        }
                    }
                };
                document.body.addEventListener('click', el.clickOutsideEvent);
            },
            unbind: function(el) {
                document.body.removeEventListener(
                    'click',
                    el.clickOutsideEvent
                );
            }
        }
    },
    data() {
        return {
            isTooltipActive: false
        };
    },
    created() {
        this.isTooltipActive = false;
    },
    methods: {
        onMouseClick() {
            this.isTooltipActive = !this.isTooltipActive ? true : false;
        },
        onMouseEnter() {
            this.isTooltipActive = true;
        },
        onMouseLeave() {
            this.isTooltipActive = false;
        }
    }
};
</script>
<style lang="scss" scoped>
.tourpoint-wrap {
    position: absolute;
    width: 17px;
    height: 17px;
    border-radius: 100%;
    background: rgba(70, 154, 235, 0.3);
    top: 0px;
    right: -12px;
}
/* Tooltip text */
.tooltiptext {
    display: block;
    line-height: normal;
    font-size: 13px;
    background-color: #469aeb;
    color: #fff;
    text-align: left;
    padding: 11px 40px 14px;
    border-radius: 3px;
    position: absolute;
    z-index: 1;
    width: 316px;
    bottom: 5px;
    left: 50%;
    margin-left: -154px; /* Use half of the width to center the tooltip */
    &::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #469aeb transparent transparent transparent;
    }
}
.tooltiptext-header {
    font-weight: bold;
    display: block;
    line-height: 18px;
    position: relative;
    &::before {
        position: absolute;
        content: '';
        background-repeat: no-repeat;
        height: 16px;
        width: 18px;
        display: inline-block;
        background-image: url(../../assets/attention.svg);
        left: -28px;
        top: 3px;
    }
}
.tooltiptext-close {
    position: absolute;
    width: 16px;
    height: 16px;
    background-image: url(../../assets/close-white.svg);
    right: 8px;
    top: 12px;
}
.tooltiptext-content {
    line-height: 18px;
    font-weight: normal;
    display: block;
    text-transform: none;
}
.tourpoint-marker-wrap {
    position: absolute;
    width: 17px;
    height: 17px;
    border-radius: 100%;
    background: rgba(70, 154, 235, 0.3);
    top: 0px;
    right: -12px;
    &:hover {
        & ~ .tooltiptext {
            display: block;
        }
    }
}
.tourpoint-marker {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    display: block;
    position: absolute;
    background: #469aeb;
    border-radius: 100%;
    backface-visibility: hidden;
    pointer-events: none;
    top: 5px;
    left: 5px;
    &:before,
    &:after {
        content: '';
        display: block;
        width: 120px;
        height: 120px;
        position: absolute;
        top: -58px;
        left: -57px;
        background: rgba(70, 172, 243, 0.5);
        border: 1px solid #46acf3;
        border-radius: 50%;
        z-index: -1;
        animation: tourpoint-marker-pulse 1.7s infinite ease-out;
    }
    &:after {
        animation: tourpoint-marker-pulse-inner 1.7s infinite ease-out;
    }
}

@keyframes tourpoint-marker-pulse {
    0% {
        opacity: 0.65;
        transform: scale(0.1);
    }
    100% {
        opacity: 0;
        transform: scale(1);
    }
}

@keyframes tourpoint-marker-pulse-inner {
    0% {
        opacity: 0;
        transform: scale(0.1);
    }
    24%,
    90% {
        opacity: 0;
    }
    25% {
        opacity: 0.65;
        transform: scale(0.1);
    }
    100% {
        opacity: 0;
        transform: scale(1);
    }
}
</style>
