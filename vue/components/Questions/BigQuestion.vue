<template>
    <transition name="question-fade">
        <div
            v-if="isBigQuestionActive && isRecordingStarted"
            class="big-question"
        >
            <div class="big-question-wrap">
                <div class="big-question__icon"></div>
                <div v-if="!isQuestionsFinish" class="big-question__text">
                    {{ question.text }}
                </div>
                <div v-if="isQuestionsFinish" class="big-question__text">
                    That's it! Thank you for the interview!
                </div>
                <button
                    v-if="isQuestionsFinish"
                    class="next-btn"
                    @click="nextInterviewPage"
                >
                    Next
                    <i class="icon icon-keyboard-right-arrow-button"></i>
                </button>
                <TimeLine v-if="!isQuestionsFinish"></TimeLine>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import TimeLine from '../TimeLine.vue';
export default {
    name: 'BigQuestion',
    components: {
        TimeLine
    },
    computed: {
        ...mapGetters({
            questions: 'questions_store/get_questions',
            isBigQuestionActive: 'questions_store/get_big_questions_status',
            question: 'questions_store/get_question',
            isQuestionsFinish: 'questions_store/get_questions_finished',
            isRecordingStarted: 'get_recording_status'
        })
    },
    methods: {
        nextInterviewPage() {
            location.href = '/main';
        }
    }
};
</script>

<style lang="scss" scoped>
.big-question {
    .icon-keyboard-right-arrow-button {
        font-size: 12px;
    }
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    background: rgba(20, 22, 23, 0.9);
    opacity: 0.9;
    &-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
    }
    &__icon {
        width: 49px;
        height: 49px;
        background-repeat: no-repeat;
        background-image: url(../../assets/frame.svg);
        margin-bottom: 22px;
    }
    &__text {
        font-style: normal;
        font-weight: normal;
        font-size: 32px;
        line-height: 44px;
        text-align: center;
        color: #ffffff;
        margin-bottom: 40px;
    }
    .next-btn {
        background: #469aeb;
        border-radius: 3px;
        border: none;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: normal;
        text-align: center;
        text-transform: uppercase;
        padding: 10px 25px;
        color: #ffffff;
    }
}
/* animation for big question */

.question-fade-enter-active,
.question-fade-leave-active {
    transition: all 1s;
}

.question-fade-enter,
.question-fade-leave-to {
    opacity: 0;
}
</style>
