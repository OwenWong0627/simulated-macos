<template>
    <div
        class="modal draggable-window"
        :data-app="`project-${project.id}`"
        :class="{ minimized: isMinimized }"
    >
        <TitleBar
            :title="project.title"
            @close="$emit('close')"
            @minimize="toggleMinimize"
            @maximize="toggleMaximize"
            @startDrag="handleStartDrag($event)"
        />
        <div class="content" v-show="!isMinimized">
            <div class="project-container">
                <div class="project-image">
                    <img :src="project.image" :alt="project.title" />
                </div>
                <div class="project-info">
                    <h2>{{ project.title }}</h2>
                    <p class="description">{{ project.description }}</p>
                    <div class="tech-stack">
                        <h3>Technologies:</h3>
                        <div class="tech-tags">
                            <span
                                v-for="tech in project.technologies"
                                :key="tech"
                                class="tech-tag"
                            >
                                {{ tech }}
                            </span>
                        </div>
                    </div>
                    <div class="actions">
                        <a
                            :href="project.githubUrl"
                            class="btn primary"
                            target="_blank"
                        >
                            View on GitHub
                        </a>
                        <a
                            v-if="project.liveUrl"
                            :href="project.liveUrl"
                            class="btn secondary"
                            target="_blank"
                        >
                            Live Demo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TitleBar from "./TitleBar.vue";
import { startDrag } from "../utils/windowHelpers";

export default defineComponent({
    name: "ProjectDetail",
    components: { TitleBar },
    props: {
        project: {
            type: Object,
            required: true,
        },
    },
    emits: ["close", "updateZIndex"],
    setup(props, { emit }) {
        const isMinimized = ref(false);
        const isMaximized = ref(false);
        const originalSize = ref({ width: "1000px", height: "600px" });

        const toggleMinimize = () => {
            isMinimized.value = !isMinimized.value;
        };

        const toggleMaximize = () => {
            isMaximized.value = !isMaximized.value;
            console.log(props.project);
            const element = document.querySelector(
                `.draggable-window[data-app="project-${props.project.id}"]`
            ) as HTMLElement;
            console.log(element);
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
                element.style.top = "25%";
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
        };
    },
});
</script>

<style scoped>
.modal {
    width: 1100px;
    height: 600px;
    top: 25%;
    left: 50%;
    transform: translate(-50%, 0);
}

.content {
    height: calc(100% - 28px);
    overflow: hidden;
}

.project-container {
    display: grid;
    grid-template-columns: 1.85fr 1fr;
    height: 100%;
    text-align: left;
    animation: slideIn 0.4s ease-out;
}

.project-image {
    background: #f5f5f5;
    height: 100%;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.project-info {
    padding: 2rem;
    overflow-y: auto;
}

.project-info h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #333;
}

.description {
    font-size: 1rem;
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.tech-stack {
    margin-bottom: 2rem;
}

.tech-stack h3 {
    font-size: 1rem;
    color: #444;
    margin-bottom: 1rem;
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tech-tag {
    background: #eff6ff;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    color: #1d4ed8;
    transition: all 0.2s ease;
}

.tech-tag:hover {
    transform: translateY(-2px);
    background: #e8e8e8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
    font-size: 0.9rem;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    transition: 0.5s;
}

.btn:hover:after {
    left: 100%;
}

.btn.primary {
    background: #1a1a1a;
    color: white;
}

.btn.secondary {
    background: #007bff;
    color: white;
}

.minimized {
    height: 28px !important;
    min-height: 28px;
    overflow: hidden;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
