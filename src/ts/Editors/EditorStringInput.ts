import { EditorItem } from "./EditorItem";

export class EditorStringInput extends EditorItem {
    constructor(
        data: unknown,
        private readonly id: string,
        private readonly name: string,
        private value: string,
        private readonly change?: (value: string) => void,
        private readonly autoSet = true
    ) {
        super(data);

        const input = this.element as HTMLInputElement;

        input.id = `input_${this.id}`;
        input.value = this.value;
        input.type = "text";

        input.addEventListener("change", () => {
            this.value = (this.element as HTMLInputElement).value;

            if (autoSet) {
                const obj = data as Record<string, string>;

                obj[name] = this.value;
            }

            if (change) {
                change(this.value);
            }
        });
    }

    protected createElement(): HTMLElement {
        return document.createElement("input");
    }
}
