<template>
    <div
        class="modal draggable-window"
        data-app="aboutMe"
        :class="{ minimized: isMinimized }"
    >
        <TitleBar
            title="About Me"
            @close="$emit('close')"
            @minimize="toggleMinimize"
            @maximize="toggleMaximize"
            @startDrag="startDrag($event)"
        />
        <div class="content" v-show="!isMinimized">
            <h1>About Me</h1>
            <p>My name is Owen...</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TitleBar from "./TitleBar.vue";

export default defineComponent({
    components: { TitleBar },
    emits: ["close", "updateZIndex"],
    setup(props, { emit }) {
        const isMinimized = ref(false);
        const isMaximized = ref(false);
        const originalSize = ref({ width: "300px", height: "200px" });

        const toggleMinimize = () => {
            isMinimized.value = !isMinimized.value;
        };

        const toggleMaximize = () => {
            isMaximized.value = !isMaximized.value;
            const element = document.querySelector(
                ".draggable-window"
            ) as HTMLElement;
            if (isMaximized.value) {
                originalSize.value = {
                    width: element.style.width,
                    height: element.style.height,
                };
                element.style.width = "100%";
                element.style.height = "100%";
                element.style.top = "0";
                element.style.left = "0";
            } else {
                element.style.width = originalSize.value.width;
                element.style.height = originalSize.value.height;
            }
        };

        const startDrag = (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();

            const element = (event.currentTarget as Element).closest(
                ".draggable-window"
            ) as HTMLElement;
            if (!element) return;

            if (window.ds && typeof window.ds.break === "function") {
                window.ds.break();
            }

            let startX: number = event.clientX;
            let startY: number = event.clientY;
            let initialLeft = parseInt(
                window.getComputedStyle(element).left,
                10
            );
            let initialTop = parseInt(window.getComputedStyle(element).top, 10);

            const onDragging = (moveEvent: MouseEvent) => {
                const dx = moveEvent.clientX - startX;
                const dy = moveEvent.clientY - startY;
                element.style.left = `${initialLeft + dx}px`;
                element.style.top = `${initialTop + dy}px`;
                emit("updateZIndex");
            };

            const stopDrag = () => {
                document.removeEventListener("mousemove", onDragging);
                document.removeEventListener("mouseup", stopDrag);
                if (window.ds && typeof window.ds.start === "function") {
                    window.ds.start();
                }
            };

            document.addEventListener("mousemove", onDragging);
            document.addEventListener("mouseup", stopDrag);
        };

        return {
            isMinimized,
            toggleMinimize,
            toggleMaximize,
            startDrag,
        };
    },
});
</script>

<style scoped>
.modal {
    position: absolute;
    top: 45%;
    left: 44%;
    background: white;
    border: 1px solid #ccc;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    width: 300px;
    min-height: 200px;
    border-radius: 8px;
    overflow: hidden;
}

.content {
    padding: 20px;
}

.minimized {
    height: 28px !important;
    min-height: 28px;
    overflow: hidden;
}
</style>
