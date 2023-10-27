class DragHandle {
  dragableElement: HTMLElement | undefined;
  private dragContainer: HTMLElement;
  private offsetX: number;
  private offsetY: number;

  constructor(element: HTMLElement) {
    this.dragContainer = element;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  public startDrag(element: HTMLElement, event: MouseEvent) {
    this.dragableElement = element.cloneNode(true) as HTMLElement;
    this.dragContainer.appendChild(this.dragableElement);

    this.dragableElement!.style.position = "absolute";
    const rect = element.getBoundingClientRect();
    this.offsetX = event.clientX - rect.left;
    this.offsetY = event.clientY - rect.top;

    const x = event.clientX - this.offsetX;
    const y = event.clientY - this.offsetY;
    this.dragableElement!.style.left = `${x}px`;
    this.dragableElement!.style.top = `${y}px`;

    this.dragableElement!.style.width = `${element.offsetWidth}px`;
    this.dragableElement!.style.height = `${element.offsetHeight}px`;

    // Сохраняем ссылку на функцию onMouseMove
    const onMouseMoveHandler = (event: MouseEvent) => this.onMouseMove(event);
    document.addEventListener("mousemove", onMouseMoveHandler);
    document.addEventListener("mouseup", () => this.onMouseUp());

    // Удаляем слушатель при отпускании кнопки мыши
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMoveHandler);
      this.onMouseUp();
    });
  }

  private onMouseUp() {
    while (this.dragContainer.firstChild) {
      this.dragContainer.removeChild(this.dragContainer.firstChild);
    }
  }

  private onMouseMove(event: MouseEvent) {
    const x = event.clientX - this.offsetX;
    const y = event.clientY - this.offsetY;

    this.dragableElement!.style.left = `${x}px`;
    this.dragableElement!.style.top = `${y}px`;

    //console.log(x, "  ", y);
  }

}

const dragHandle = new DragHandle(document.querySelector(".drag-handler") as HTMLElement);

class DraggableElement {
  private element: HTMLElement;


  constructor(element: HTMLElement) {
    this.element = element;
    if (!this.element) {
      throw new Error(`Element not found`);
    }

    this.element.addEventListener("mousedown", (event) =>
      this.onMouseDown(event));
  }

  private onMouseDown(event: MouseEvent) {
    dragHandle.startDrag(this.element, event);
  }

}

let dragElements = document.querySelectorAll(".draggable-element");
dragElements.forEach((element) => {
  let draggableElement = new DraggableElement(element as HTMLElement);
});

