
export class PowerItem extends Item<PowerData> {

}


export class PowerData {

}


export class PowerSheet extends ItemSheet<PowerData, PowerItem> {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.submitOnChange = true;
        return options;
    }
    get template() {
        return "systems/foured/templates/items/power.html";
    }
}