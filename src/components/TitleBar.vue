<template>
    <div class="title-bar" @mousedown="handleMouseDown">
        <div class="title-buttons">
            <button
                class="title-button close"
                @click="$emit('close')"
                @mousedown="buttonPressed('close')"
                @mouseup="buttonReleased()"
                @mouseleave="buttonReleased()"
                :class="{ pressed: pressedButton === 'close' }"
            >
                <span class="icon">✕</span>
            </button>
            <button
                class="title-button minimize"
                @click="$emit('minimize')"
                @mousedown="buttonPressed('minimize')"
                @mouseup="buttonReleased()"
                @mouseleave="buttonReleased()"
                :class="{ pressed: pressedButton === 'minimize' }"
            >
                <span class="icon">−</span>
            </button>
            <button
                class="title-button maximize"
                @click="$emit('maximize')"
                @mousedown="buttonPressed('maximize')"
                @mouseup="buttonReleased()"
                @mouseleave="buttonReleased()"
                :class="{ pressed: pressedButton === 'maximize' }"
            >
                <span class="icon">+</span>
            </button>
        </div>
        <div class="title">{{ title }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    emits: ["close", "minimize", "maximize", "startDrag"],
    setup(_, { emit }) {
        const pressedButton = ref<string | null>(null);

        const buttonPressed = (button: string) => {
            pressedButton.value = button;
        };

        const buttonReleased = () => {
            pressedButton.value = null;
        };

        const handleMouseDown = (event: MouseEvent) => {
            if (!(event.target as HTMLElement).closest(".title-button")) {
                emit("startDrag", event);
            }
        };

        return {
            pressedButton,
            buttonPressed,
            buttonReleased,
            handleMouseDown,
        };
    },
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
    position: relative;
    overflow: hidden;
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

.close.pressed {
    background-color: #bf4b44;
}
.minimize.pressed {
    background-color: #bf8e23;
}
.maximize.pressed {
    background-color: #1d9730;
}

.icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgba(0, 0, 0, 0.5);
    font-size: 9px;
    opacity: 0;
}

.title-buttons:hover .icon {
    opacity: 1;
}

.title {
    flex-grow: 1;
    text-align: center;
    font-size: 13px;
    color: #333;
    user-select: none;
}
</style>
