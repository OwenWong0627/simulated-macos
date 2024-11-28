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
            @startDrag="handleStartDrag($event)"
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
import { startDrag } from "../utils/windowHelpers";

export default defineComponent({
    components: { TitleBar },
    emits: ["close", "updateZIndex"],
    setup(_, { emit }) {
        const isMinimized = ref(false);
        const isMaximized = ref(false);
        const originalSize = ref({ width: "300px", height: "200px" });
        const topPercent = ref("50%");

        const toggleMinimize = () => {
            isMinimized.value = !isMinimized.value;
        };

        const toggleMaximize = () => {
            isMaximized.value = !isMaximized.value;
            const element = document.querySelector(
                `.draggable-window[data-app="aboutMe"]`
            ) as HTMLElement;
            if (isMaximized.value) {
                originalSize.value = {
                    width: element.style.width,
                    height: element.style.height,
                };
                element.style.width = "100%";
                element.style.height = "calc(100% - 77px)";
                console.log("element.style.height", element.style.height);
                element.style.top = "0";
                element.style.left = "0";
                element.style.transform = "none";
            } else {
                element.style.width = originalSize.value.width;
                element.style.height = originalSize.value.height;
                element.style.top = topPercent.value;
                element.style.left = "50%";
                element.style.transform = `translate(-50%, -${topPercent.value})`;
            }
        };

        // const toggleMaximize = () => {
        //     isMaximized.value = !isMaximized.value;
        //     const element = document.querySelector(
        //         ".draggable-window"
        //     ) as HTMLElement;
        //     if (isMaximized.value) {
        //         originalSize.value = {
        //             width: width.value,
        //             height: height.value,
        //         };
        //         width.value = window.innerWidth;
        //         height.value = window.innerHeight;
        //         element.style.top = "0";
        //         element.style.left = "0";
        //         element.style.transform = "none";
        //     } else {
        //         width.value = originalSize.value.width;
        //         height.value = originalSize.value.height;
        //     }
        // };

        const handleStartDrag = (event: MouseEvent) => {
            if (window.ds) {
                startDrag(
                    event,
                    event.currentTarget as Element,
                    emit,
                    window.ds
                );
            }
        };

        return {
            isMinimized,
            toggleMinimize,
            toggleMaximize,
            handleStartDrag,
        };
    },
});
</script>

<style scoped>
.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
