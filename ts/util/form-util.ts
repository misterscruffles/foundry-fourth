export class FormUtil {
    public static CreateSelectbox(name: string, cssClass: string | string[], value: string, options: Map<string, string>): string {
        cssClass = this.ensureArray(cssClass);
        let output = `<select name="${name}" class="${cssClass.join(' ')}">`;
        options.forEach((optVal: string, key: string) => {
            let selected = "";
            if (value == key) {
                selected = ' selected="selected"';
            }
            output += `<option value="${key}"${selected}>${optVal}</option>`;
        });
        output += `</select>`;
        return output;
    }

    public static CreateText(name: string, cssClass: string | string[], value: string | number): string {
        cssClass = this.ensureArray(cssClass);
        return `<input type="text" class="${cssClass}" name="${name}" value="${value}" />`;
    }

    public static CreateCheck(name: string, cssClass: string | string[], value: boolean): string {
        cssClass = this.ensureArray(cssClass);
        let checked = "";
        if (value) {
            checked = ' checked="checked"';
        }
        return `<input type="checkbox" class="${cssClass}" name="${name}" value="true"${checked}/>`;
    }

    public static EnumToMap(enumValue: any): Map<string, string> {
        const output = new Map<string, string>();
        for (let [key, value] of Object.entries(enumValue)) {
            output.set((value as string), key);
        }
        return output;
    }

    private static ensureArray(value: string | string[]): string[] {
        if (typeof value === "string") {
            value = [value];
        }
        return value;
    }
}