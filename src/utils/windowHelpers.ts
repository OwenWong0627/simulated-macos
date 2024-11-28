export function startDrag(
    event: MouseEvent,
    element: Element,
    emit: (event: "close" | "updateZIndex", ...args: any[]) => void,
    ds: { break: () => void; start: () => void }
) {
    event.preventDefault();
    event.stopPropagation();
    console.log(element);

    const draggableWindow = element.closest(".draggable-window") as HTMLElement;
    if (!draggableWindow) return;

    if (ds && typeof ds.break === "function") {
        ds.break();
    }

    let startX: number = event.clientX;
    let startY: number = event.clientY;
    let initialLeft = parseInt(
        window.getComputedStyle(draggableWindow).left,
        10
    );
    let initialTop = parseInt(window.getComputedStyle(draggableWindow).top, 10);

    const onDragging = (moveEvent: MouseEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        const newLeft = initialLeft + dx;
        const newTop = Math.max(24, initialTop + dy);

        draggableWindow.style.left = `${newLeft}px`;
        draggableWindow.style.top = `${newTop}px`;
        emit("updateZIndex");
    };

    const stopDrag = () => {
        document.removeEventListener("mousemove", onDragging);
        document.removeEventListener("mouseup", stopDrag);
        if (ds && typeof ds.start === "function") {
            ds.start();
        }
    };

    document.addEventListener("mousemove", onDragging);
    document.addEventListener("mouseup", stopDrag);
}
