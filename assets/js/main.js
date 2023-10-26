"use strict";
class DragHandle {
    constructor(element) {
        this.dragContainer = element;
    }
    createCopy(element) {
        let el = this.createCopy(element);
    }
}
const dragHandle = new DragHandle(document.querySelector(".drag-handler"));
class DraggableElement {
    constructor(element) {
        this.element = element;
        if (!this.element) {
            throw new Error(`Element not found`);
        }
        this.offsetX = 0;
        this.offsetY = 0;
        this.element.addEventListener("mousedown", (event) => this.onMouseDown(event));
        document.addEventListener("mouseup", () => this.onMouseUp());
    }
    onMouseDown(event) {
        dragHandle.createCopy(this.element);
        this.offsetX = event.clientX;
        this.offsetY = event.clientY;
        // Сохраняем ссылку на функцию onMouseMove
        const onMouseMoveHandler = (event) => this.onMouseMove(event);
        document.addEventListener("mousemove", onMouseMoveHandler);
        // Удаляем слушатель при отпускании кнопки мыши
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onMouseMoveHandler);
            this.onMouseUp();
        });
    }
    onMouseMove(event) {
        const x = event.clientX - this.offsetX;
        const y = event.clientY - this.offsetY;
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }
    onMouseUp() { }
}
let dragElements = document.querySelectorAll(".draggable-element");
dragElements.forEach((element) => {
    let draggableElement = new DraggableElement(element);
});
