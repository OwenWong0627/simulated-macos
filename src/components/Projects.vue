<template>
    <div
        class="modal draggable-window"
        data-app="projects"
        :class="{ minimized: isMinimized }"
    >
        <TitleBar
            title="Projects"
            @close="$emit('close')"
            @minimize="toggleMinimize"
            @maximize="toggleMaximize"
            @startDrag="handleStartDrag($event)"
        />
        <div class="content" v-show="!isMinimized">
            <iframe
                src="https://docs.google.com/presentation/d/e/2PACX-1vSgVmlLMIRpT5HdPMdCJs00LbrLkhf8hB3oe3AKj1XesZjO1RZTMVrXZtUJTr8gBUHJGiF7Sa_f9AZq/embed?start=false&loop=false&delayms=3000"
                frameborder="0"
                width="100%"
                height="100%"
                allowfullscreen="true"
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
            ></iframe>
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
        const originalSize = ref({ width: "960px", height: "569px" });
        const topPercent = ref("30%");

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
                element.style.transform = "none";
            } else {
                element.style.width = originalSize.value.width;
                element.style.height = originalSize.value.height;
                element.style.top = topPercent.value;
                element.style.left = "50%";
                element.style.transform = `translate(-50%, -${topPercent.value})`;
            }
        };

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
    top: 30%;
    left: 50%;
    transform: translate(-50%, -30%);
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.content {
    height: calc(100% - 28px);
}

.minimized {
    height: 28px !important;
    min-height: 28px;
    overflow: hidden;
}
</style>
