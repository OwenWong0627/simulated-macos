<template>
    <div class="navbar">
        <div class="navbar-section">
            <div
                v-for="app in systemApps"
                :key="app.name"
                class="app-container"
                @mousedown="handleSystemMouseDown(app.nickName)"
                @mouseup="handleSystemMouseUp(app.nickName)"
                @mouseleave="handleSystemMouseLeave(app.nickName)"
                :class="{ pressed: systemPressed[app.nickName] }"
            >
                <img
                    :src="app.icon"
                    :alt="app.name"
                    class="app-icon system-icons"
                />
                <div class="tooltip">{{ app.name }}</div>
            </div>
        </div>
        <div class="navbar-divider"></div>

        <div class="navbar-section custom-app-section">
            <div
                v-for="app in apps"
                :key="app.name"
                class="app-container"
                @mousedown="handleMouseDown(app.nickName)"
                @mouseup="handleMouseUp(app.nickName)"
                @mouseleave="handleMouseLeave(app.nickName)"
                :class="{ pressed: isPressed[app.nickName] }"
            >
                <img :src="app.icon" :alt="app.name" class="app-icon" />
                <div
                    v-if="visibleApps[app.nickName]"
                    class="app-open-indicator"
                ></div>
                <div class="tooltip">{{ app.name }}</div>
            </div>
        </div>

        <div class="navbar-divider"></div>
        <div class="navbar-section">
            <div
                class="app-container"
                @mousedown="handleTrashMouseDown"
                @mouseup="handleTrashMouseUp"
                @mouseleave="handleTrashMouseLeave"
                :class="{ pressed: trashPressed }"
            >
                <img
                    :src="trashIcon"
                    alt="Trash"
                    class="app-icon system-icons"
                />
                <div class="tooltip">Trash</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import { App, VisibleApps, IsPressed } from "../types";

export default defineComponent({
    props: {
        apps: {
            type: Array as PropType<App[]>,
            required: true,
        },
        visibleApps: {
            type: Object as PropType<VisibleApps>,
            required: true,
        },
        isPressed: {
            type: Object as PropType<IsPressed>,
            required: true,
        },
    },
    emits: ["mouseDown", "mouseUp", "mouseLeave"],
    setup(_, { emit }) {
        const systemPressed = reactive<Record<string, boolean>>({});
        const trashPressed = ref(false);

        const systemApps = [
            {
                name: "Finder",
                icon: new URL(
                    "../assets/systemApps/finder.png",
                    import.meta.url
                ).toString(),
                nickName: "finder",
            },
            {
                name: "Launchpad",
                icon: new URL(
                    "../assets/systemApps/launchpad.png",
                    import.meta.url
                ).toString(),
                nickName: "launchpad",
            },
            {
                name: "Safari",
                icon: new URL(
                    "../assets/systemApps/safari.png",
                    import.meta.url
                ).toString(),
                nickName: "safari",
            },
            {
                name: "Messages",
                icon: new URL(
                    "../assets/systemApps/messages.png",
                    import.meta.url
                ).toString(),
                nickName: "messages",
            },
            {
                name: "Mail",
                icon: new URL(
                    "../assets/systemApps/mail.png",
                    import.meta.url
                ).toString(),
                nickName: "mail",
            },
            {
                name: "Maps",
                icon: new URL(
                    "../assets/systemApps/maps.png",
                    import.meta.url
                ).toString(),
                nickName: "maps",
            },
            {
                name: "Photos",
                icon: new URL(
                    "../assets/systemApps/photos.png",
                    import.meta.url
                ).toString(),
                nickName: "photos",
            },
            {
                name: "FaceTime",
                icon: new URL(
                    "../assets/systemApps/facetime.png",
                    import.meta.url
                ).toString(),
                nickName: "facetime",
            },
            {
                name: "Calendar",
                icon: new URL(
                    "../assets/systemApps/calendar.png",
                    import.meta.url
                ).toString(),
                nickName: "calendar",
            },
            {
                name: "Contacts",
                icon: new URL(
                    "../assets/systemApps/contacts.png",
                    import.meta.url
                ).toString(),
                nickName: "contacts",
            },
            {
                name: "Reminders",
                icon: new URL(
                    "../assets/systemApps/reminders.png",
                    import.meta.url
                ).toString(),
                nickName: "reminders",
            },
            {
                name: "Notes",
                icon: new URL(
                    "../assets/systemApps/notes.png",
                    import.meta.url
                ).toString(),
                nickName: "notes",
            },
            {
                name: "App Store",
                icon: new URL(
                    "../assets/systemApps/appstore.png",
                    import.meta.url
                ).toString(),
                nickName: "appstore",
            },
            {
                name: "Settings",
                icon: new URL(
                    "../assets/systemApps/settings.png",
                    import.meta.url
                ).toString(),
                nickName: "settings",
            },
        ];
        const trashIcon = new URL(
            "../assets/systemApps/trash_empty.png",
            import.meta.url
        ).toString();

        const handleSystemMouseDown = (appName: string) => {
            systemPressed[appName] = true;
        };

        const handleSystemMouseUp = (appName: string) => {
            systemPressed[appName] = false;
            console.log(`Clicked ${appName}`);
        };

        const handleSystemMouseLeave = (appName: string) => {
            systemPressed[appName] = false;
        };

        const handleTrashMouseDown = () => {
            trashPressed.value = true;
        };

        const handleTrashMouseUp = () => {
            trashPressed.value = false;
        };

        const handleTrashMouseLeave = () => {
            trashPressed.value = false;
        };

        const handleMouseDown = (appName: string) => {
            emit("mouseDown", appName);
        };

        const handleMouseUp = (appName: string) => {
            emit("mouseUp", appName);
        };

        const handleMouseLeave = (appName: string) => {
            emit("mouseLeave", appName);
        };

        return {
            systemApps,
            trashIcon,
            systemPressed,
            trashPressed,
            handleSystemMouseDown,
            handleSystemMouseUp,
            handleSystemMouseLeave,
            handleTrashMouseDown,
            handleTrashMouseUp,
            handleTrashMouseLeave,
            handleMouseDown,
            handleMouseUp,
            handleMouseLeave,
        };
    },
});
</script>

<style>
.navbar {
    max-width: 80%;
    min-width: 11%;
    position: absolute;
    bottom: 1px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 8px;
    border-radius: 16px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.navbar-section {
    display: flex;
    gap: 3px;
    align-items: center;
}

.custom-app-section {
    display: flex;
    margin: 0 8px;
    gap: 12px;
    align-items: center;
}

.navbar-divider {
    width: 1px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.2);
    margin: 0 8px;
    align-self: center;
}

.app-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s ease;
    pointer-events: auto;
}

.app-open-indicator {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: black;
}

.app-icon {
    width: 53px;
    height: 53px;
    margin-bottom: 3px;
    border-radius: 10px;
    padding: 0px;
    background: transparent;
    box-shadow: none;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.system-icons {
    width: 60px;
    height: 60px;
    border-radius: 10px;
}

.pressed .app-icon {
    filter: brightness(90%);
    transform: scale(0.95);
    box-shadow: none;
}

[alt="Projects"].app-icon {
    transform: scale(0.95);
}

.pressed [alt="Projects"].app-icon {
    transform: scale(0.9);
}

[alt="About Me"].app-icon {
    background: linear-gradient(to bottom, #ffffff, #f5f5f5);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24),
        inset 0 0 0 1px rgba(255, 255, 255, 0.5);
}

.pressed [alt="About Me"].app-icon {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12),
        inset 0 0 0 1px rgba(255, 255, 255, 0.4);
}

.tooltip {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
}

.app-container:hover .tooltip {
    visibility: visible;
    opacity: 1;
}

.app-name {
    margin-top: 8px;
    font-size: 14px;
    color: #333;
    text-align: center;
}
</style>
