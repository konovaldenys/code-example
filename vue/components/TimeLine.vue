<template>
    <div v-if="isTimeLineActive" class="time-line-wrap">
        <div class="time-line"></div>
        <div :style="{ width: percent + '%' }" class="sub-time-line"></div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'TimeLine',
    data() {
        return {
            isTimeLineActive: false,
            percent: 100
        };
    },
    computed: {
        ...mapGetters({
            isRecordingStarted: 'get_recording_status',
            isQuestionsFinished: 'questions_store/get_questions_finished',
            isBigQuestionActive: 'questions_store/get_big_questions_status'
        })
    },
    watch: {
        isTimeLineActive(isActive) {
            let timeLineInterval;
            if (isActive) {
                timeLineInterval = setInterval(() => {
                    if (this.percent >= 0 && !this.isQuestionsFinished) {
                        this.percent -= 0.16;
                    } else {
                        clearInterval(timeLineInterval);
                        this.isTimeLineActive = false;
                        this.BIG_QUESTION_HIDE();
                        this.BUTTONS_ACTIVE();
                        if (!this.isQuestionsFinished) {
                            this.SMALL_QUESTION_SHOW();
                        } else {
                            this.BIG_QUESTION_SHOW();
                        }
                    }
                }, 16);
            }
        }
    },
    created() {
        this.isTimeLineActive = true;
    },

    methods: {
        ...mapActions({
            SMALL_QUESTION_SHOW: 'questions_store/SMALL_QUESTION_SHOW',
            BIG_QUESTION_HIDE: 'questions_store/BIG_QUESTION_HIDE',
            BIG_QUESTION_SHOW: 'questions_store/BIG_QUESTION_SHOW',
            BUTTONS_ACTIVE: 'video_store/BUTTONS_ACTIVE'
        })
    }
};
</script>
<style lang="scss" scoped>
.time-line-wrap {
    width: 60%;

    position: relative;
    margin: auto;
}
.sub-time-line {
    margin-top: -2px;
    z-index: 10;
    background: #469aeb;
    opacity: 0.9;
    border-radius: 3px;
    width: 100%;
    height: 2px;
}
.time-line {
    z-index: 9;
    background: #636667;
    opacity: 0.9;
    height: 2px;
    width: 100%;
}
</style>
