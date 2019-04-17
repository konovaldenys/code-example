<template>
    <div v-if="!isRecordingStarted" class="ai-tooltip">
        <Tooltip></Tooltip>
    </div>
</template>

<script>
import Tooltip from './Toupoint-tooltip.vue';
import { mapState } from 'vuex';

export default {
    name: 'Tourpoint',
    components: {
        Tooltip
    },
    data() {
        return {};
    },
    computed: {
        ...mapState(['isRecordingStarted'])
    }
};
</script>

<style scoped lang="scss">
.ai-tooltip {
    z-index: 100;
    position: absolute;
    display: inline-block;
    top: -5px;
    right: 47px;
}
</style>
