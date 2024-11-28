<template>
    <div class="homescreen-container">
        <div class="drag-select-area"></div>
        <Navbar
            :apps="apps"
            :visibleApps="visibleApps"
            :isPressed="isPressed"
            @mouseDown="handleMouseDown"
            @mouseUp="handleMouseUp"
            @mouseLeave="handleMouseLeave"
        />

        <!-- App windows -->
        <AboutMe
            v-if="visibleApps.aboutMe"
            @updateZIndex="updateZIndex('aboutMe')"
            @close="closeApp('aboutMe')"
            class="draggable-window"
            :style="{ zIndex: zIndexes['aboutMe'] }"
            data-app="aboutMe"
        />
        <Experience
            v-if="visibleApps.experience"
            @updateZIndex="updateZIndex('experience')"
            @close="closeApp('experience')"
            class="draggable-window"
            :style="{ zIndex: zIndexes['experience'] }"
            data-app="experience"
        />
        <Resume
            v-if="visibleApps.resume"
            @updateZIndex="updateZIndex('resume')"
            @close="closeApp('resume')"
            class="draggable-window"
            :style="{ zIndex: zIndexes['resume'] }"
            data-app="resume"
        />
        <Projects
            v-if="visibleApps.projects"
            @updateZIndex="updateZIndex('projects')"
            @close="closeApp('projects')"
            class="draggable-window"
            :style="{ zIndex: zIndexes['projects'] }"
            data-app="projects"
        />
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive,
    onUnmounted,
    onMounted,
    watch,
} from "vue";
import Navbar from "./components/Navbar.vue";
import DragSelect from "dragselect";
import AboutMe from "./components/AboutMe.vue";
import Experience from "./components/Experience.vue";
import Resume from "./components/Resume.vue";
import Projects from "./components/Projects.vue";
import { App, VisibleApps, IsPressed, ZIndexes } from "./types";

export default defineComponent({
    components: {
        AboutMe,
        Experience,
        Resume,
        Projects,
        Navbar,
    },
    setup() {
        const apps = reactive<App[]>([
            {
                name: "About Me",
                icon: new URL(
                    "./assets/profile.png",
                    import.meta.url
                ).toString(),
                nickName: "aboutMe",
            },
            {
                name: "Experience",
                icon: new URL(
                    "./assets/experience.png",
                    import.meta.url
                ).toString(),
                nickName: "experience",
            },
            {
                name: "Resume",
                icon: new URL(
                    "./assets/resume.png",
                    import.meta.url
                ).toString(),
                nickName: "resume",
            },
            {
                name: "Projects",
                icon: new URL(
                    "./assets/project.png",
                    import.meta.url
                ).toString(),
                nickName: "projects",
            },
        ]);
        const visibleApps = reactive<VisibleApps>({});
        const isPressed = reactive<IsPressed>({});
        const zIndexes = reactive<ZIndexes>({});
        const maxZIndex = ref<number>(10);
        let ds: DragSelect | null = null;
        const updateZIndex = (appName: string) => {
            maxZIndex.value++;
            zIndexes[appName] = maxZIndex.value;
            console.log(zIndexes);
        };

        const focusApp = (appName: string) => {
            visibleApps[appName] = true;
            updateZIndex(appName);
        };

        const handleMouseDown = (appName: string) => {
            isPressed[appName] = true;
        };
        const handleMouseUp = (appName: string) => {
            if (isPressed[appName]) {
                focusApp(appName);
                isPressed[appName] = false;
            }
        };

        const handleMouseLeave = (appName: string) => {
            isPressed[appName] = false;
        };

        const closeApp = (appName: string) => {
            visibleApps[appName] = false;
        };

        function initDragSelect() {
            if (window.ds) {
                window.ds.stop();
            }

            const area = document.querySelector(".drag-select-area");
            if (area instanceof HTMLElement) {
                // Use setTimeout to ensure all DOM elements are rendered
                setTimeout(() => {
                    const draggableWindows =
                        document.querySelectorAll(".draggable-window");
                    ds = new DragSelect({
                        // selectables: undefined, // to be replaced with actual moveable icons
                        area: area,
                        draggability: false,
                        usePointerEvents: true,
                        selectorClass: "ds-selector",
                        selectedClass: "ds-selected",
                    });

                    window.ds = ds;
                    draggableWindows.forEach((window) => {
                        window.addEventListener(
                            "mousedown",
                            handleWindowMouseDown
                        );
                    });
                }, 0);
            }
        }
        function handleWindowMouseDown(e: Event) {
            e.stopPropagation();
            if (window.ds) {
                window.ds.break();
            }
            const appName = (e.currentTarget as HTMLElement).getAttribute(
                "data-app"
            );
            if (appName) {
                updateZIndex(appName);
            }
        }

        onMounted(() => {
            initDragSelect();
        });

        onUnmounted(() => {
            if (window.ds) {
                window.ds.stop();
            }
            window.ds = null;
        });

        watch(
            () => apps.map((app) => visibleApps[app.nickName]),
            () => {
                initDragSelect();
            },
            { deep: true }
        );

        return {
            apps,
            visibleApps,
            focusApp,
            closeApp,
            zIndexes,
            isPressed,
            handleMouseDown,
            handleMouseUp,
            handleMouseLeave,
            updateZIndex,
        };
    },
});
</script>

<style>
.homescreen-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
}

.drag-select-area {
    flex-grow: 1;
    position: relative;
    background-image: url("./assets/Background.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.draggable-window {
    position: absolute;
    top: 20%; /* Initial top position for better visibility */
    left: 10%; /* Initial left position for staggered arrangement */
    border: 1px solid #ccc;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
}
</style>
