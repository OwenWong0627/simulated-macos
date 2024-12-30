<template>
    <div class="homescreen-container">
        <MenuBar :activeWindow="currentActiveWindow" />
        <div class="drag-select-area">
            <div
                v-for="app in menuApps"
                :key="app.name"
                class="desktop-icon"
                @dblclick="focusApp(app.nickName)"
            >
                <img :src="app.icon" :alt="app.name" class="app-icon" />
                <div class="app-name">{{ app.name }}</div>
            </div>
        </div>
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
            @openProjectDetail="openProjectDetail"
            class="draggable-window"
            :style="{ zIndex: zIndexes['projects'] }"
            data-app="projects"
        />
        <ProjectDetail
            v-for="project in openProjects"
            :key="project.id"
            :project="project"
            @updateZIndex="updateZIndex(`project-${project.id}`)"
            @close="closeProjectDetail(project.id)"
            class="draggable-window"
            :style="{ zIndex: zIndexes[`project-${project.id}`] }"
            :data-app="`project-${project.id}`"
        />
        <SpeedInsights />
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
import ProjectDetail from "./components/ProjectDetail.vue";
import MenuBar from "./components/MenuBar.vue";
import { SpeedInsights } from "@vercel/speed-insights/vue";
import { App, VisibleApps, IsPressed, ZIndexes, Project } from "./types";

export default defineComponent({
    components: {
        AboutMe,
        Experience,
        Resume,
        Projects,
        Navbar,
        MenuBar,
        ProjectDetail,
        SpeedInsights,
    },
    setup() {
        const apps = reactive<App[]>([
            {
                name: "About Me",
                icon: new URL(
                    "./assets/customApps/chill_guy.png",
                    import.meta.url
                ).toString(),
                nickName: "aboutMe",
            },
            {
                name: "Experience",
                icon: new URL(
                    "./assets/customApps/experience.png",
                    import.meta.url
                ).toString(),
                nickName: "experience",
            },
            {
                name: "Resume",
                icon: new URL(
                    "./assets/customApps/preview.png",
                    import.meta.url
                ).toString(),
                nickName: "resume",
            },
            {
                name: "Projects",
                icon: new URL(
                    "./assets/customApps/project.png",
                    import.meta.url
                ).toString(),
                nickName: "projects",
            },
        ]);
        const menuApps = reactive<App[]>([
            {
                name: "About Me",
                icon: new URL(
                    "./assets/customApps/chill_guy.png",
                    import.meta.url
                ).toString(),
                nickName: "aboutMe",
            },
            {
                name: "Experience",
                icon: new URL(
                    "./assets/customApps/experience.png",
                    import.meta.url
                ).toString(),
                nickName: "experience",
            },
            {
                name: "Resume",
                icon: new URL(
                    "./assets/customApps/previewPDF.png",
                    import.meta.url
                ).toString(),
                nickName: "resume",
            },
            {
                name: "Projects",
                icon: new URL(
                    "./assets/customApps/project.png",
                    import.meta.url
                ).toString(),
                nickName: "projects",
            },
        ]);

        const openProjects = ref<Array<Project>>([]);
        const visibleApps = reactive<VisibleApps>({});
        const isPressed = reactive<IsPressed>({});
        const zIndexes = reactive<ZIndexes>({});
        const maxZIndex = ref<number>(10);
        const currentActiveWindow = ref<string>("Finder");
        let ds: DragSelect | null = null;

        const openProjectDetail = (project: Project) => {
            if (!openProjects.value.find((p) => p.id === project.id)) {
                openProjects.value.push(project);
                updateZIndex(`project-${project.id}`);

                setTimeout(() => {
                    const projectWindow = document.querySelector(
                        `.draggable-window[data-app="project-${project.id}"]`
                    );
                    if (projectWindow) {
                        projectWindow.addEventListener(
                            "mousedown",
                            handleWindowMouseDown
                        );
                    }
                }, 0);
            }
        };

        const closeProjectDetail = (projectId: number) => {
            const projectWindow = document.querySelector(
                `.draggable-window[data-app="project-${projectId}"]`
            );
            if (projectWindow) {
                projectWindow.removeEventListener(
                    "mousedown",
                    handleWindowMouseDown
                );
            }

            openProjects.value = openProjects.value.filter(
                (p) => p.id !== projectId
            );
            delete zIndexes[`project-${projectId}`];
        };

        const updateZIndex = (appName: string) => {
            maxZIndex.value++;
            zIndexes[appName] = maxZIndex.value;
            const app = apps.find((a) => a.nickName === appName);
            if (app) {
                currentActiveWindow.value = app.name;
            }
        };

        const focusApp = (appName: string) => {
            visibleApps[appName] = true;
            updateZIndex(appName);
        };
        const closeApp = (appName: string) => {
            visibleApps[appName] = false;

            // Change to window with highest z-index that is still open
            const openApps = Object.entries(visibleApps)
                .filter(([, isOpen]) => isOpen)
                .map(([appName]) => appName);
            const highestZIndexApp = Object.entries(zIndexes)
                .filter(([appName]) => openApps.includes(appName))
                .sort((a, b) => b[1] - a[1])[0];
            if (highestZIndexApp) {
                currentActiveWindow.value =
                    apps.find((app) => app.nickName === highestZIndexApp[0])
                        ?.name || "Finder";
            } else {
                currentActiveWindow.value = "Finder";
            }

            // If no apps are open, set Finder as the active window
            if (!Object.values(visibleApps).some((isOpen) => isOpen)) {
                currentActiveWindow.value = "Finder";
            }
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

        function initDragSelect() {
            if (window.ds) {
                window.ds.stop();
            }

            const area = document.querySelector(".drag-select-area");
            if (area instanceof HTMLElement) {
                // Use setTimeout to ensure all DOM elements are rendered
                setTimeout(() => {
                    ds = new DragSelect({
                        selectables: Array.from(
                            document.querySelectorAll(".desktop-icon")
                        ),
                        area: area,
                        selectedClass: "selected-icon",
                        hoverClass: "hovered-icon",
                    });
                    window.ds = ds;

                    const draggableWindows =
                        document.querySelectorAll(".draggable-window");
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
                const app = apps.find((a) => a.nickName === appName);
                if (app) {
                    currentActiveWindow.value = app.name;
                }
            }
        }

        const handleExternalMessage = (event: MessageEvent) => {
            console.log("Received message from external source:", event);
            // if (event.origin !== "http://your-trusted-origin.com") return;

            const { action } = JSON.parse(event.data);

            switch (action) {
                case "aboutMe":
                    focusApp("aboutMe");
                    break;
                case "experience":
                    focusApp("experience");
                    break;
                case "project":
                    focusApp("project");
                    break;
                default:
                    console.log("Unknown action received");
            }
        };

        onMounted(() => {
            initDragSelect();
            positionDesktopIcons();
            window.addEventListener("message", handleExternalMessage);
        });

        const positionDesktopIcons = () => {
            const icons = document.querySelectorAll(".desktop-icon");
            icons.forEach((icon, index) => {
                const element = icon as HTMLElement;
                element.style.top = `${50 + index * 100}px`;
                element.style.left = "25px";
            });
        };

        onUnmounted(() => {
            if (window.ds) {
                window.ds.stop();
            }
            window.ds = null;
            window.removeEventListener("message", handleExternalMessage);
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
            menuApps,
            openProjects,
            openProjectDetail,
            closeProjectDetail,
            currentActiveWindow,
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
    background-image: url("./assets/background.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.draggable-window {
    position: absolute;
    top: 20%;
    left: 30%;
    border: 1px solid #ccc;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.desktop-icon {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    text-align: center;
    padding: 5px 0;
    border-radius: 5px;
    transition: background-color 0.2s ease;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    cursor: default;
}

.desktop-icon .app-icon {
    width: 53px;
    height: 53px;
    margin-bottom: 5px;
    pointer-events: none;
}

.desktop-icon .app-name {
    font-size: 12px;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.desktop-icon.selected-icon,
.desktop-icon.selected-icon:hover {
    background-color: rgba(50, 50, 255, 0.2);
    border-radius: 4px;
}

.desktop-icon:hover {
    background-color: rgba(97, 97, 97, 0.5);
    border-radius: 4px;
}
</style>
