<template>
    <div class="title-bar" @mousedown="$emit('startDrag', $event)">
        <div class="title-buttons">
            <button class="close" @click="$emit('close')"></button>
            <button class="minimize" @click="$emit('minimize')"></button>
            <button class="maximize" @click="$emit('maximize')"></button>
        </div>
        <div class="title">{{ title }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    emits: ["close", "minimize", "maximize", "startDrag"],
});
</script>

<style scoped>
.title-bar {
    background-color: #f0f0f0;
    height: 28px;
    display: flex;
    align-items: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    position: relative;
}

.title-buttons {
    display: flex;
    gap: 8px;
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
}

.title-buttons button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    cursor: default;
    padding: 0;
}

.close {
    background-color: #ff5f56;
}
.minimize {
    background-color: #ffbd2e;
}
.maximize {
    background-color: #27c93f;
}

.title {
    flex-grow: 1;
    text-align: center;
    font-size: 13px;
    color: #333;
    user-select: none;
}
</style>
