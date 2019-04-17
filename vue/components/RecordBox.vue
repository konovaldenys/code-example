<template>
    <div class="col-xs-6 col-ms-4 col-md-4 col-lg-6">
        <div class="row center-xs">
            <div
                class="record-progress"
                :style="{
                    'margin-top': padding + 'px'
                }"
            >
                <div v-if="!isRecordBoxActive" class="record-status">
                    <i class="icon record-not-started"></i>
                    <span clas="record-text">{{ text }}</span>
                </div>
                <div
                    v-else-if="isRecordBoxActive"
                    class="record-status--started"
                >
                    <i class="icon record-started"></i>
                    <span clas="record-text">{{ text }}</span>
                </div>
                <div v-if="isRecordBoxActive" class="record-time">
                    <span id="minutes">{{ minutes | two_digits }}</span
                    >:<span id="seconds">{{ seconds | two_digits }}</span>
                </div>
                <Info></Info>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Info from './Info.vue';
export default {
    name: 'RecordBox',
    components: {
        Info
    },
    filters: {
        two_digits(value) {
            if (value.toString().length <= 1) {
                return '0' + value.toString();
            }
            return value.toString();
        }
    },
    props: {
        padding: {
            default: 0,
            type: Number
        }
    },
    data() {
        return {
            text: 'Not recorded',
            minutes: 0,
            seconds: 0,
            isActive: false
        };
    },
    computed: {
        ...mapState(['isRecordingStarted', 'isRecordBoxActive']),
        ...mapState('questions_store', ['isQuestionsFinish'])
    },
    watch: {
        isRecordBoxActive(active) {
            active ? ((this.text = 'Recording'), this.ready()) : this.stop();
        },
        isQuestionsFinish(finished) {
            finished ? this.stop() : null;
        }
    },
    methods: {
        ...mapActions(['RECORD_BOX_IDLE']),
        ready() {
            this.interval = window.setInterval(() => {
                this.seconds >= 59
                    ? (this.minutes++, (this.seconds = 0))
                    : this.seconds++;
            }, 1000);
        },
        stop() {
            clearInterval(this.interval);
            this.RECORD_BOX_IDLE();
        }
    }
};
</script>
<style lang="scss" scoped>
.record-progress {
    margin-top: 7px; /* maybe design bug */
    width: 200px;
    display: flex;
    align-items: stretch;
    height: 40px;
    background: #474a4b;
    box-shadow: 0px 1px 3px rgba(45, 107, 185, 0.3);
    border-radius: 2px;
    position: relative;

    .record-status {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: normal;

        color: #c4c4c4;

        width: 100%;
        line-height: 40px;
        &--started {
            @extend .record-status;
            width: 60%;
        }
        .record-not-started,
        .record-started {
            display: inline-block;
            vertical-align: middle;
            width: 15px;
            height: 17px;
            background-image: url(../assets/not-started.svg);
            background-repeat: no-repeat;
            margin-right: 4px;
        }
        .record-started {
            background-image: url(../assets/record-started.svg);
        }
    }
    .record-time {
        border-left: 1px solid #585b5d;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        align-self: center;
        color: #c4c4c4;
        width: 40%;
    }
}
</style>
