import DragSelect from "dragselect";

declare global {
    interface Window {
        ds: DragSelect | null;
    }
}
