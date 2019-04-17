<template>
    <span @click="click">
        <span class="tips__text">
            <span class="show-tips-icon"></span>
            {{ buttonText }}
        </span>
    </span>
</template>

<script>
export default {
    name: 'TipsButton',
    props: {
        buttonText: {
            type: String,
            required: true
        }
    },
    methods: {
        click() {
            this.$emit('click_button');
        }
    }
};
</script>

<style scoped lang="scss">
.tips__text {
    cursor: pointer;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    padding: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: normal;
    text-transform: uppercase;
    color: #469aeb;
    vertical-align: middle;

    .show-tips-icon {
        display: inline-block;
        margin-right: 5px;
        width: 10px;
        height: 13px;
        background-image: url(../../assets/show-off.svg);
        background-repeat: no-repeat;
    }
}
</style>
