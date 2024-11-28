<template>
    <div
        class="modal draggable-window"
        data-app="resume"
        :class="{ minimized: isMinimized }"
    >
        <TitleBar
            title="Resume"
            @close="$emit('close')"
            @minimize="toggleMinimize"
            @maximize="toggleMaximize"
            @startDrag="handleStartDrag($event)"
        />
        <div class="content" v-show="!isMinimized">
            <img
                src="../assets/owen-wong-blank-resume.png"
                alt="Resume"
                class="resume-image"
            />
            <button @click="openPDF" class="pdf-button">Open PDF</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import TitleBar from "./TitleBar.vue";
import { startDrag } from "../utils/windowHelpers";

export default defineComponent({
    components: { TitleBar },
    emits: ["close", "updateZIndex"],
    setup(_, { emit }) {
        const isMinimized = ref(false);
        const isMaximized = ref(false);
        const originalSize = ref({ width: "0px", height: "0px" });
        const topPercent = ref("20%");
        const pdfUrl = ref("/resume.pdf");

        onMounted(() => {
            let width = 0;
            let height = 0;
            const aspectRatio = 595 / 950;
            const maxWidth = window.innerWidth * 0.8;
            const maxHeight = window.innerHeight * 0.8;

            if (maxWidth / aspectRatio <= maxHeight) {
                width = maxWidth;
                height = maxWidth / aspectRatio;
            } else {
                height = maxHeight;
                width = maxHeight * aspectRatio;
            }

            originalSize.value = {
                width: width + "px",
                height: height + "px",
            };
        });

        const toggleMinimize = () => {
            isMinimized.value = !isMinimized.value;
        };

        const toggleMaximize = () => {
            isMaximized.value = !isMaximized.value;
            const element = document.querySelector(
                `.draggable-window[data-app="resume"]`
            ) as HTMLElement;
            if (isMaximized.value) {
                originalSize.value = {
                    width: element.style.width,
                    height: element.style.height,
                };
                element.style.width = "100%";
                element.style.height = "calc(100% - 101px)";
                element.style.top = "24px";
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

        const openPDF = () => {
            window.open(pdfUrl.value, "_blank");
        };

        return {
            isMinimized,
            toggleMinimize,
            toggleMaximize,
            handleStartDrag,
            pdfUrl,
            openPDF,
        };
    },
});
</script>

<style scoped>
.modal {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -20%);
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    min-width: 300px;
}

.content {
    height: calc(100% - 28px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.resume-image {
    max-width: 100%;
    max-height: calc(100% - 40px);
    object-fit: contain;
}

.pdf-button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
}

.minimized {
    height: 28px !important;
    min-height: 28px;
    overflow: hidden;
}
</style>
