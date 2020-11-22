import { PowerEffects } from "../logic/combat/powereffects.js";
import DataObjectParser from "../util/dataobject-parser.js";
import { FouredItemSheet, FouredItemSheetData } from "./data.js";

export class PowerItem extends Item<PowerData> {

}


export class PowerData {

}


export class PowerSheet extends FouredItemSheet<PowerData, PowerItem> {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.submitOnChange = true;
        return options;
    }
    get template() {
        return "systems/foured/templates/items/power.html";
    }

    getData(): FouredItemSheetData<PowerData> {
        const data = super.getData();
        data.values.onUse = PowerEffects.GetOnUseOptions();
        data.values.onUsed = PowerEffects.GetOnUsedOptions();
        return data;
    }

    _updateObject(_: Event, formData: any) {
        let sanitized = DataObjectParser.transpose(formData).data();
        return this.object.update(sanitized);
    }

    activateListeners(html: JQuery<HTMLElement>) {
        super.activateListeners(html);
        html.find("#add-on-use").on('click', () => { this.addEffect("on-use"); });
        html.find("#add-on-success").on('click', () => { this.addEffect("on-success"); });
        html.find("#add-on-fail").on('click', () => { this.addEffect("on-fail"); });
        html.find("#add-on-complete").on('click', () => { this.addEffect("on-complete"); });
    }

    addEffect(type: string) {
        const effectDef = {
            "effect": "",
            "config": {}
        }
        switch (type) {
            case "on-use":
                this.object.data.data.onUse.push(effectDef);
                break;
            case "on-success":
                this.object.data.data.onSuccess.push(effectDef);
                break;
            case "on-fail":
                this.object.data.data.onFail.push(effectDef);
                break;
            case "on-complete":
                this.object.data.data.onComplete.push(effectDef);
                break;
        }
        this.render();
    }
}