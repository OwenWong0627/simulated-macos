<template>
    <div
        class="modal draggable-window"
        data-app="experience"
        :class="{ minimized: isMinimized }"
    >
        <TitleBar
            title="Experience"
            @close="$emit('close')"
            @minimize="toggleMinimize"
            @maximize="toggleMaximize"
            @startDrag="handleStartDrag($event)"
        />
        <div class="content" v-show="!isMinimized">
            <ul class="timeline">
                <li v-for="item in experience" :key="item.id">
                    <h3>{{ item.title }}</h3>
                    <h4>{{ item.company }}</h4>
                    <p>{{ item.period }}</p>
                    <p>{{ item.description }}</p>
                </li>
            </ul>
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
        const originalSize = ref({ width: "600px", height: "400px" });

        const experience = ref([
            {
                id: 1,
                title: "Software Engineer",
                company: "Example Inc.",
                period: "Jan 2021 - Present",
                description:
                    "Developing software solutions to improve business processes.",
            },
            {
                id: 2,
                title: "Junior Developer",
                company: "Startup XYZ",
                period: "Jan 2020 - Dec 2020",
                description:
                    "Contributed to projects in the health tech space.",
            },
        ]);

        const toggleMinimize = () => {
            isMinimized.value = !isMinimized.value;
        };

        const toggleMaximize = () => {
            isMaximized.value = !isMaximized.value;
            const element = document.querySelector(
                `.draggable-window[data-app="experience"]`
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
                element.style.top = "30%";
                element.style.left = "50%";
                element.style.transform = `translate(-50%, 0)`;
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
            experience,
        };
    },
});
</script>

<style scoped>
.modal {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, 0);
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    min-width: 300px;
}

.content {
    height: calc(100% - 28px);
    overflow-y: auto;
    padding: 20px;
}

.timeline h3,
.timeline h4 {
    margin: 0;
}

.timeline p {
    margin: 5px 0;
}

.minimized {
    height: 28px !important;
    min-height: 28px;
    overflow: hidden;
}
</style>
