<template>
    <div
        v-if="!isRecordingStarted && !isQuestionFinished"
        class="not-ready-block"
    >
        <div class="not-ready-text">
            Not ready for an AI Video Interview now?
        </div>
        <div class="not-ready-btn" @click="cancelAndLater">
            Cancel and run it later
        </div>
    </div>
    <div
        v-else-if="isRecordingStarted && !isQuestionFinished"
        class="not-ready-block cancel"
    >
        <div class="not-ready-btn" @click="cancelInterview">
            Cancel Interview
        </div>
        <i class="icon icon-attention"></i>
        <!-- <span class="not-ready-icon"></span> -->
        <div class="not-ready-text">
            You will not be able to restart interview for another 7 days.
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'CancelInterview',
    components: {},
    computed: {
        ...mapGetters({
            isRecordingStarted: 'get_recording_status',
            isQuestionFinished: 'questions_store/get_questions_finished'
        })
    },
    methods: {
        ...mapActions(['CANCEL_INTERVIEW', 'RECORDING_STOP']),
        cancelAndLater() {
            console.log('I canceled and run later');
            this.RECORDING_STOP();

        },
        cancelInterview() {
            console.log('I canceled');
            this.CANCEL_INTERVIEW();
            this.RECORDING_STOP();
        }
    }
};
</script>
<style lang="scss" scoped>
.not-ready-block {
    width: auto;
    margin: auto;
    display: flex;
    align-items: center;
    .not-ready-text,
    .not-ready-btn {
        font-style: normal;
        font-weight: normal;
        line-height: normal;
        color: #848788;
    }
    .not-ready-text {
        font-size: 14px;
        margin-right: 10px;
    }
    .not-ready-btn {
        cursor: pointer;
        font-size: 12px;
        padding: 5px 15px;
        border: 1px solid #848788;
        box-sizing: border-box;
        border-radius: 14px;
        text-transform: uppercase;
    }
    .icon-attention {
        font-size: 18px;
        color: #848788;
        margin-right: 5px;
    }
    &.cancel {
        .not-ready-btn {
            margin-right: 10px;
        }
        margin-top: 97px;
    }
}
</style>
