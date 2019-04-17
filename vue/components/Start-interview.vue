<template>
    <div class="start-interview-block">
        <div class="start-interview-btn" @click="show_disclaimer">
            <span class="start-interview-icon"></span>
            <span class="start-interview-btn-text"
            >Start AI Video Interview</span
            >
        </div>
        <div class="start-interview-text">
            You can't restart interview multiple times. Once started, you commit
            to a full interview that can last around 30 minutes.
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'StartInterview',
    methods: {
        ...mapActions(['DISCLAIMER_SHOW']),
        show_disclaimer() {
            this.DISCLAIMER_SHOW();
        }
    }
};
</script>

<style scoped lang="scss">
.start-interview-block {
    margin: 97px auto 12px;
    width: auto;
    background: #141617;
    opacity: 0.95;
    box-shadow: 0px 1px 3px rgba(45, 107, 185, 0.3);
    border-radius: 2px;
    display: flex;
    align-items: center;
    // padding: 18px 20px;
    padding: 13px 18px;
    .start-interview {
        &-text {
            display: inline-block;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: normal;
            max-width: 366px;
            color: #848788;
        }
        &-btn {
            cursor: pointer;
            text-transform: uppercase;
            background: #469aeb;
            border: 1px solid #469aeb;
            box-sizing: border-box;
            border-radius: 13px;
            display: inline-block;
            color: #fff;
            padding: 3px 15px;
            display: inline-flex;
            align-items: center;
            margin-right: 30px;
            .start-interview-icon {
                background-image: url(../assets/start-interview.svg);
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 7px;
            }
        }
    }
}
</style>
