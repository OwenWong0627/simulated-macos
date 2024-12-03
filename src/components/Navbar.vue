<template>
    <div class="navbar">
        <div
            v-for="app in apps"
            :key="app.name"
            class="app-container"
            @mousedown="handleMouseDown(app.nickName)"
            @mouseup="handleMouseUp(app.nickName)"
            @mouseleave="handleMouseLeave(app.nickName)"
            :class="{ pressed: isPressed[app.nickName] }"
        >
            <img :src="app.icon" :alt="app.name" class="app-icon" />
            <div
                v-if="visibleApps[app.nickName]"
                class="app-open-indicator"
            ></div>
            <div class="tooltip">{{ app.name }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { App, VisibleApps, IsPressed } from "../types";

export default defineComponent({
    props: {
        apps: {
            type: Array as PropType<App[]>,
            required: true,
        },
        visibleApps: {
            type: Object as PropType<VisibleApps>,
            required: true,
        },
        isPressed: {
            type: Object as PropType<IsPressed>,
            required: true,
        },
    },
    emits: ["mouseDown", "mouseUp", "mouseLeave"],
    setup(_, { emit }) {
        const handleMouseDown = (appName: string) => {
            emit("mouseDown", appName);
        };

        const handleMouseUp = (appName: string) => {
            emit("mouseUp", appName);
        };

        const handleMouseLeave = (appName: string) => {
            emit("mouseLeave", appName);
        };

        return {
            handleMouseDown,
            handleMouseUp,
            handleMouseLeave,
        };
    },
});
</script>

<style>
.navbar {
    max-width: 80%;
    min-width: 12.5%;
    position: absolute;
    bottom: 1px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.5);
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1000;

    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
}

.app-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s ease;
    pointer-events: auto;
}

.app-open-indicator {
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: black;
}

.app-icon {
    width: 53px;
    height: 53px;
    margin-bottom: 6px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.pressed .app-icon {
    filter: brightness(70%);
    opacity: 0.6;
}

.tooltip {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
}

.app-container:hover .tooltip {
    visibility: visible;
    opacity: 1;
}

.app-name {
    margin-top: 8px;
    font-size: 14px;
    color: #333;
    text-align: center;
}
</style>
