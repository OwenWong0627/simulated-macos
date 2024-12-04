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
    min-width: 11%;
    position: absolute;
    bottom: 1px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 8px;
    border-radius: 16px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
    padding: 0px;
    background: transparent;
    box-shadow: none;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.pressed .app-icon {
    filter: brightness(90%);
    transform: scale(0.95);
    box-shadow: none;
}

[alt="Projects"].app-icon {
    transform: scale(0.95);
}

.pressed [alt="Projects"].app-icon {
    transform: scale(0.9);
}

[alt="About Me"].app-icon {
    background: linear-gradient(to bottom, #ffffff, #f5f5f5);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24),
        inset 0 0 0 1px rgba(255, 255, 255, 0.5);
}

.pressed [alt="About Me"].app-icon {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12),
        inset 0 0 0 1px rgba(255, 255, 255, 0.4);
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
