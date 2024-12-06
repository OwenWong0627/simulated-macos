<template>
    <div
        class="modal draggable-window"
        data-app="projects"
        :class="{ minimized: isMinimized }"
    >
        <TitleBar
            title="My Projects"
            @close="$emit('close')"
            @minimize="toggleMinimize"
            @maximize="toggleMaximize"
            @startDrag="handleStartDrag($event)"
        />
        <div class="content" v-show="!isMinimized">
            <div class="projects-grid">
                <div
                    v-for="project in projects"
                    :key="project.id"
                    class="project-card"
                    @click="openProjectDetail(project)"
                >
                    <img :src="project.image" :alt="project.title" />
                    <h3>{{ project.title }}</h3>
                    <p>{{ project.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import TitleBar from "./TitleBar.vue";
import { startDrag } from "../utils/windowHelpers";
import { Project } from "../types";

export default defineComponent({
    components: { TitleBar },
    emits: ["close", "updateZIndex", "openProjectDetail"],
    setup(_, { emit }) {
        const isMinimized = ref(false);
        const isMaximized = ref(false);
        const originalSize = ref({ width: "960px", height: "569px" });

        const projects = reactive<Project[]>([
            {
                id: 1,
                title: "Personal Website",
                description:
                    "A personal website to showcase my projects and skills",
                technologies: ["VueJS", "Typescript", "Vite", "Tailwind CSS"],
                image: new URL(
                    "../assets/personal_website.png",
                    import.meta.url
                ).toString(),
                githubUrl: "https://github.com/OwenWong0627/Poker-Host-Ledger",
            },
            {
                id: 2,
                title: "Poker Host Ledger",
                description:
                    "A mobile app to manage poker games and track player balances",
                technologies: [
                    "React Native",
                    "Typescript",
                    "Redux",
                    "SQLite",
                    "Expo",
                ],
                image: new URL(
                    "../assets/poker_host_ledger.png",
                    import.meta.url
                ).toString(),
                githubUrl: "https://github.com/OwenWong0627/Poker-Host-Ledger",
            },
            {
                id: 3,
                title: "D00M",
                description:
                    "A mobile app to track screen time usage, set limits, and boost productivity",
                technologies: [
                    "React Native",
                    "Typescript",
                    "Firebase",
                    "Expo",
                ],
                image: new URL(
                    "../assets/D00M.png",
                    import.meta.url
                ).toString(),
                githubUrl: "https://github.com/OwenWong0627/",
            },
            {
                id: 4,
                title: "BLM-Toronto",
                description:
                    "BLM-Toronto aims to allow the general public easier access to the locations of black-owned businesses to potentially support them.",
                technologies: [
                    "React",
                    "Javascript",
                    "Google Maps API",
                    "Firebase",
                ],
                image: new URL(
                    "../assets/BLM_Toronto.png",
                    import.meta.url
                ).toString(),
                githubUrl: "https://github.com/OwenWong0627/",
            },
        ]);

        const toggleMinimize = () => {
            isMinimized.value = !isMinimized.value;
        };

        const toggleMaximize = () => {
            isMaximized.value = !isMaximized.value;
            const element = document.querySelector(
                `.draggable-window[data-app="projects"]`
            ) as HTMLElement;
            if (isMaximized.value) {
                originalSize.value = {
                    width: element.style.width,
                    height: element.style.height,
                };
                element.style.width = "100%";
                element.style.height = "calc(100% - 101px)";
                element.style.top = "30px";
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

        const openProjectDetail = (project: any) => {
            emit("openProjectDetail", project);
        };

        return {
            isMinimized,
            projects,
            toggleMinimize,
            toggleMaximize,
            handleStartDrag,
            openProjectDetail,
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
    min-width: 300px;
    width: 1200px;
    height: 800px;
}

.content {
    height: calc(100% - 28px);
    overflow-y: auto;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, 400px);
    column-gap: 5rem;
    row-gap: 2rem;
    padding: 2rem;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
}

.project-card {
    background: #f5f5f5;
    width: 100%;
    border-radius: 8px;
    padding: 1.5rem;
    cursor: pointer;
    transition: transform 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    animation: fadeInUp 0.5s ease-out;
    animation-fill-mode: both;
}

.project-card:nth-child(1) {
    animation-delay: 0.1s;
}
.project-card:nth-child(2) {
    animation-delay: 0.2s;
}
.project-card:nth-child(3) {
    animation-delay: 0.3s;
}
.project-card:nth-child(4) {
    animation-delay: 0.4s;
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.project-card img {
    width: 100%;
    height: 250px;
    object-fit: contain;
    border-radius: 4px;
}

.project-card h3 {
    margin: 1rem 0;
    font-size: 1.5rem;
    color: #333;
}

.project-card p {
    color: #666;
    line-height: 1.4;
}

.minimized {
    height: 28px !important;
    min-height: 28px;
    overflow: hidden;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
