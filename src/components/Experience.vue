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
            <TransitionGroup name="timeline" tag="div" class="timeline">
                <div class="timeline-line">
                    <div class="line-start"></div>
                    <div class="line-end"></div>
                </div>
                <div
                    v-for="(item, index) in experience"
                    :key="item.id"
                    class="timeline-item"
                >
                    <div class="timeline-dot"></div>
                    <div
                        :class="[
                            'timeline-content',
                            index % 2 === 0 ? 'right' : 'left',
                            index === 0 ? 'first' : '',
                        ]"
                    >
                        <div class="timeline-text">
                            <div class="company-icon">
                                <img :src="item.icon" :alt="item.company" />
                            </div>
                            <h3>{{ item.title }} @ {{ item.company }}</h3>
                            <span class="period">{{ item.period }}</span>
                            <p class="description">{{ item.description }}</p>
                        </div>
                    </div>
                </div>
            </TransitionGroup>
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
        const originalSize = ref({ width: "800px", height: "600px" });

        const experience = ref([
            {
                id: 1,
                title: "SWE Intern",
                company: "Hubspot",
                period: "May 2025 - Present",
                description:
                    "Excited to work on the Flywheel Product team at Hubspot to develop internal tools!!",
                icon: new URL(
                    "../assets/experience/hubspot.png",
                    import.meta.url
                ).toString(),
            },
            {
                id: 2,
                title: "SWE Intern",
                company: "Dandelion Networks",
                period: "September 2024 - December 2024",
                description:
                    "Developed UI features for a crypto-wallet app with React Native & TypeScript, built secure Go API endpoints, and integrated Firebase/Redux for data persistence.",
                icon: new URL(
                    "../assets/experience/dandelion.png",
                    import.meta.url
                ).toString(),
            },
            {
                id: 3,
                title: "SWE Intern",
                company: "Ontario Health",
                period: "January 2024 - April 2024",
                description:
                    "Developed an Azure & .NET healthcare data app, migrated healthcare data from ELK to Power BI, and created NUnit unit tests.",
                icon: new URL(
                    "../assets/experience/ontario_health.png",
                    import.meta.url
                ).toString(),
            },
            {
                id: 4,
                title: "SWE Intern",
                company: "Ownersbox",
                period: "May 2023 - August 2023",
                description:
                    "Implemented Java-based API endpoints for Ownersbox's Battle Pass system, redesigned user onboarding with React & TypeScript, and implemented Jest/Cucumber tests.",
                icon: new URL(
                    "../assets/experience/ownersbox.png",
                    import.meta.url
                ).toString(),
            },
            {
                id: 5,
                title: "SWE Intern",
                company: "Unyte Health",
                period: "May 2022 - August 2022",
                description:
                    "Developed features for a React & ExpressJS app used by 10k+ health professionals, revamped login UX with AWS S3/Cognito, and implemented Cypress E2E tests.",
                icon: new URL(
                    "../assets/experience/unyte.png",
                    import.meta.url
                ).toString(),
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
                element.style.top = "20%";
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
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0);
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 1000px;
    height: 600px;
}

.content {
    height: calc(100% - 28px);
    max-width: 1000px;
    padding: 40px;
    padding-top: 10px;
    margin: 0 auto;
    overflow-y: auto;
}

.timeline {
    position: relative;
    padding: 20px 0 0;
    margin: 0 40px 60px;
}

.timeline-line {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 100%;
    background-color: #000;
    animation: drawLine 1s ease-out forwards;
    transform-origin: top center;
}

.line-start,
.line-end {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 23px;
    height: 4px;
    background-color: #000;
}

.line-start {
    top: 0;
}

.line-end {
    bottom: 0;
}

.timeline::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: calc(100% + 40px);
    background-color: #f5f5f5;
    z-index: -1;
    border-radius: 10px;
    top: 0;
}

.timeline-item {
    position: relative;
    margin: 20px 0;
    animation: slideIn 0.5s ease-out forwards;
    opacity: 0;
}

.timeline-dot {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    z-index: 2;
    top: 13px;
    animation: pulse 2s infinite;
}

.timeline-item:nth-child(odd) .timeline-dot {
    background-color: #ff4444;
}

.timeline-item:nth-child(even) .timeline-dot {
    background-color: #2196f3;
}

.timeline-content {
    position: relative;
    width: 45%;
    z-index: 1;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-content:hover {
    z-index: 2;
    transform: scale(1.02);
}

.timeline-content.left {
    margin-left: 55%;
    margin-top: -30px;
}

.timeline-content.right {
    margin-right: 55%;
    margin-top: -30px;
}

.timeline-content.first {
    margin-top: 0;
}

.timeline-text {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
    animation: fadeIn 0.5s ease-out forwards;
    animation-delay: 0.3s;
    opacity: 0;
}

.company-icon {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    overflow: hidden;
}

.timeline-content.left .company-icon {
    right: -50px;
}

.timeline-content.right .company-icon {
    left: -50px;
}

.company-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.timeline-text h3 {
    display: inline-block;
    margin: 0;
    font-size: 1.1em;
    padding: 8px 15px;
    position: relative;
    color: white;
}

.timeline-item:nth-child(odd) h3 {
    background-color: #ff4444;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

.timeline-item:nth-child(even) h3 {
    background-color: #2196f3;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

.timeline-text h3::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border-top: 21px solid transparent;
    border-bottom: 21px solid transparent;
}

.timeline-content.left h3::after {
    left: -31px;
    transform: translateY(-50%);
    border-right: 31px solid #ff4444;
}

.timeline-content.right h3::after {
    right: -31px;
    transform: translateY(-50%);
    border-left: 31px solid #2196f3;
}

.period {
    color: #666;
    font-size: 0.9em;
}

.description {
    margin: 0;
    font-size: 0.9em;
    line-height: 1.4;
}

.minimized {
    height: 28px !important;
    min-height: 28px;
    overflow: hidden;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(0px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(33, 150, 243, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(33, 150, 243, 0);
    }
}

@keyframes drawLine {
    from {
        transform: translateX(-50%) scaleY(0);
    }
    to {
        transform: translateX(-50%) scaleY(1);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
