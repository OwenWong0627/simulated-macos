<template>
    <div class="menu-bar">
        <div class="menu-left">
            <img
                src="../assets/menuBar/white-apple.svg"
                alt="Apple"
                class="apple-icon menu-item"
            />
            <div class="menu-item current-window">{{ currentWindow }}</div>
            <div class="menu-item">File</div>
            <div class="menu-item">Edit</div>
            <div class="menu-item">View</div>
            <div class="menu-item">Help</div>
        </div>

        <div class="menu-right">
            <div class="menu-item">
                <img
                    src="../assets/menuBar/battery.svg"
                    alt="Battery"
                    class="menu-icon"
                />
            </div>
            <div class="menu-item">
                <img
                    src="../assets/menuBar/wifi-icon.svg"
                    alt="WiFi"
                    class="menu-icon"
                />
            </div>
            <div class="menu-item">
                <img
                    src="../assets/menuBar/search.svg"
                    alt="Search"
                    class="menu-icon"
                />
            </div>
            <div class="menu-item">
                <img
                    src="../assets/menuBar/control-centre.svg"
                    alt="Menu"
                    class="menu-icon"
                />
            </div>
            <div class="menu-item datetime">{{ formattedDateTime }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted, ref } from "vue";

export default defineComponent({
    props: {
        activeWindow: {
            type: String,
            default: "",
        },
    },
    setup(props) {
        const currentWindow = computed(() => {
            return props.activeWindow || "Finder";
        });

        const datetime = ref("");

        const updateDateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            };
            datetime.value = now
                .toLocaleString("en-US", options)
                .replace(/,/g, "");
        };

        let timer: number;

        onMounted(() => {
            updateDateTime();
            timer = window.setInterval(updateDateTime, 1000);
        });

        onUnmounted(() => {
            clearInterval(timer);
        });

        return {
            currentWindow,
            formattedDateTime: datetime,
        };
    },
});
</script>

<style scoped>
.menu-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background-color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.menu-left,
.menu-right {
    display: flex;
    align-items: center;
}

.menu-item {
    margin-right: 20px;
    font-size: 15px;
    color: #fff;
    cursor: pointer;
}

.menu-right .menu-item {
    margin-right: 18px;
}

.menu-right .menu-item:last-child {
    margin-right: 0;
}

.menu-item:hover {
    color: #007aff;
}

.menu-icon {
    width: 20px;
    height: 20px;
    padding-top: 6px;
}

[alt="Battery"].menu-icon {
    width: 30px;
    height: 30px;
}

.menu-item:hover .menu-icon {
    filter: brightness(0) invert(37%) sepia(100%) saturate(1529%)
        hue-rotate(199deg) brightness(100%) contrast(107%);
}

.apple-icon {
    width: 18px;
    height: 18px;
    margin-right: 20px;
}

.current-window {
    font-weight: bold;
}

.datetime {
    cursor: default;
    font-size: 15px;
}
</style>
