<template>
    <div
        v-if="isSmallQuestionActive && isRecordingStarted"
        class="small-question"
    >
        <div class="small-question-wrap">
            <div class="small-question__icon"></div>
            <div class="small-question__text">
                {{ question.text }}
            </div>
            <See-profile
                v-if="question.profile_text"
                :profile-text="question.profile_text"
            ></See-profile>
            <Image-question
                v-if="question.type == 'image'"
                :question-images="question.images"
            ></Image-question>
            <Question-timer :duration="question.time"> </Question-timer>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import QuestionTimer from './SmallQuestionTimer.vue';
import SeeProfile from './SeeProfile.vue';
import ImageQuestion from './ImageQuestion.vue';

export default {
    name: 'SmallQuestion',
    components: {
        'Question-timer': QuestionTimer,
        'See-profile': SeeProfile,
        'Image-question': ImageQuestion
    },
    data() {
        return {};
    },
    computed: {
        ...mapState(['isRecordingStarted']),
        ...mapState('questions_store', [
            'questions',
            'isSmallQuestionActive',
            'question'
        ])
    }
};
</script>

<style lang="scss" scoped>
.small-question {
    background: #141617;
    opacity: 0.95;
    border-radius: 10px;
    width: 80%;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;

    &-wrap {
        padding: 7px 22px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }
    &__icon {
        display: inline-block;
        width: 17px;
        height: 20px;
        background-repeat: no-repeat;
        background-image: url(../../assets/small-frame.svg);
        margin-right: -20px;
    }
    &__text {
        display: inline-block;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: normal;

        color: #ffffff;
        max-width: 70%;
    }
    &:hover {
        .tooltip {
            display: block;
        }
    }
}
</style>
