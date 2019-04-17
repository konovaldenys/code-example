<template>
    <div class="small-question__timer">
        <RadialProgressBar
            :diameter="60"
            :stroke-width="1"
            :completed-steps="timerCount"
            :total-steps="questionDuration"
            :start-color="timerStartColor"
            :stop-color="timerStartColor"
        >
            <div class="timer" @click="stopCircle">
                {{ minutes | timer }}:{{ seconds | timer }}
            </div>
        </RadialProgressBar>
        <transition name="info-fade">
            <div v-show="show30SecondsTooltip" class="small-question__tooltip">
                <div class="tooltip__text">
                    Time for answer this question is coming out
                </div>
                <div class="tooltip__btn" @click="add_30_seconds">
                    + 30 seconds
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { buttonClick } from '../../helpers/buttons_click.js';
import RadialProgressBar from 'vue-radial-progress';

export default {
    name: 'QuestionTimer',
    filters: {
        timer(value) {
            return value.toString().trim().length <= 1 ? '0' + value : value;
        }
    },
    components: {
        RadialProgressBar
    },
    props: {
        duration: {
            type: Number,
            default: 2
        }
    },
    data() {
        return {
            timerCount: 0,
            questionDuration: 0,
            show30SecondsTooltip: false,
            timeWasAdded: false,
            timerStartColor: '#2DD0B4'
        };
    },
    created() {
        if (this.duration) {
            this.timerCount = this.duration * 60 - 1;
            this.questionDuration = this.duration * 60;
        } else {
            this.timerCount = 119;
            this.questionDuration = 120;
        }
    },
    mounted() {
        this.driveCircle();
    },
    computed: {
        ...mapGetters({
            question: 'questions_store/get_question',
            quiestionsGenerator: 'get_questions_generator',
            buttonStatus: 'video_store/get_buttons_status',
            isRecordingStarted: 'get_recording_status',
            isQuestionFinished: 'questions_store/get_questions_finished',
            maxMainQuestionsCount: 'questions_store/get_max_main_questions',
            mainQuestionsCount: 'questions_store/get_answers_count'
        }),
        minutes() {
            return Math.floor(this.timerCount / 60);
        },
        seconds() {
            return Math.floor(this.timerCount % 60);
        }
    },
    watch: {
        timerCount(value) {
            if (value === 0) this.stopCircle();
            if (value === 30 && !this.timeWasAdded)
                this.show30SecondsTooltip = true;
        }
    },
    methods: {
        ...mapActions({
            BIG_QUESTION_HIDE: 'questions_store/BIG_QUESTION_HIDE',
            SET_QUESTION: 'questions_store/SET_QUESTION',
            SHOW_QUESTION: 'questions_store/SHOW_QUESTION',
            QUESTION_FINISHED: 'questions_store/QUESTION_FINISHED',
            ADD_ANSWERED_QUESTION: 'questions_store/ADD_ANSWERED_QUESTION',
            BUTTONS_ENABLE: 'video_store/BUTTONS_ENABLE',
            TIME_LINE_SHOW: 'TIME_LINE_SHOW'
        }),
        driveCircle() {
            this.interval = setInterval(() => {
                this.timerCount -= 1;
            }, 1000);
        },
        stopCircle() {
            clearInterval(this.interval);
            this.show30SecondsTooltip = false;
            buttonClick(this, 'answer');
        },
        add_30_seconds() {
            this.show30SecondsTooltip = false;
            this.timeWasAdded = true;
            this.timerCount += 30;
            this.timerStartColor = '#2DD0B4';
        }
    }
};
</script>

<style lang="scss" scoped>
.small-question {
    &__timer {
        display: inline-block;
        width: 60px;
        height: 65px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__tooltip {
        position: absolute;
        width: 202px;
        background: #141617;
        opacity: 0.95;
        border-radius: 3px;
        text-align: center;
        padding: 15px 20px;
        position: absolute;
        z-index: 1;
        top: -107px;
        right: -45px;
        &::after {
            content: ' ';
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: rgba(20, 22, 23, 0.95) transparent transparent
                transparent;
        }
    }
    .tooltip {
        &__text {
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            line-height: normal;
            text-align: center;

            color: #ffffff;
            margin-bottom: 10px;
        }
        &__btn {
            cursor: pointer;
            border: 1px solid #469aeb;
            border-radius: 14px;
            padding-left: 0;
            padding-right: 0;
            text-align: center;
            height: 25px;
            display: inline-block;
            padding: 5px 10px;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: normal;
            text-transform: uppercase;
            color: #469aeb;
            vertical-align: middle;
            margin: auto;
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
