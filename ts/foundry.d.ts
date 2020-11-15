/* Util Types */
type Dictionary<K extends string | number | symbol, V> = {
    [key in K]: V;
};
type Weird<T> = Dictionary<string, any> & T;
type ActorConfig = {
    name: string;
    type: string;
    img: string;
    folder: any;
    sort: number;
    data: any;
    token: any;
    items: any[];
    flags: any;
};

declare type _DataType<T> = {
    name: string;
    data: T;
    dtypes: string[];
};

declare type PositionData = {
    left: number;
    top: number;
    width: number;
    height: number;
    scale: number;
};

type RenderOptions = PositionData & {
    log: number;
    renderContext: string;
    renderData: string;
};

type Resource = {
    value: number;
    min: number;
    max: number;
};

type SubEntity<T> = {
    items: Item<any>[];
    data: T;
} & T;

type EntityData<T> = {
    _id: number;
    name: string;
    permission: any;
    type: string;
    data: T;
};

type ActorData<T> = EntityData<T> & { items: EntityData<any>[] };

/* Official Types*/

declare class Actor<T> extends Entity<T> {
    static config: Object;
    static createTokenActor<T2>(baseActor: Actor<T2>, token: Token): Actor<T2>;
    static fromToken<T2>(token: Token): Actor<T2>;
    constructor(config: ActorConfig);
    apps: Application;
    compendium: Compendium | null;
    data: ActorData<T>;
    img: string;
    isPc: boolean;
    items: Item<any>[];
    itemTypes: Dictionary<string, Array<any>>;
    limited: boolean;
    name: string;
    options: Object;
    owner: boolean;
    permission: Number;
    sheet: BaseEntitySheet<Actor<T>>;
    token: Token;
    uuid: string;
    visible: boolean;
    getActiveTokens(linked?: boolean): Array<Token>;
    getOwnedItem(itemId: string): Item<any>;
    deleteOwnedItem(itemId: string, options?: Object): Promise<Object>;
    getRollData(): T;
    update(data: any, options?: any): Promise<Actor<T>>;
}

declare module Actors {
    function registerSheet<T extends Function>(name: string, sheet: T, options?: { makeDefault: boolean }): void;
    function unregisterSheet<T extends Function>(name: string, sheet: T): void;
}

declare abstract class ActorSheet<ActorType extends Actor<ActorDataType>, ActorDataType> extends BaseEntitySheet<
    ActorType
    > {
    constructor(actor: ActorType, options: Object);
    public static get defaultOptions(): Object;
    actor: ActorType;
    id: string;
    title: String;
    token: Token;
    _canDragDrop(): boolean;
    _canDragStart(): boolean;
    _getHeaderButtons(): any;
    _onDragItemStart(): any;
    _onDrop(): Promise<any>;
    getData(): _DataType<ActorDataType>;
}

declare class Application { }

declare abstract class BaseEntitySheet<T> extends FormApplication<T> {
    setPosition(options: Partial<PositionData>): PositionData;
    element: JQuery;
    activateListeners(html: JQuery): void;
}

declare class ChatMessage {
    static create(content: { user: string; speaker: Actor<any>; content: HTMLElement }): Promise<void>;
    static getSpeaker(notes: { actor: Actor<any> }): Actor<any>;

    constructor();
}

declare class Compendium {
    importEntity(entity: Entity<any>): Promise<any>;
}
declare class ClientSettings {
    get(module: string, key: string): void;
    register(module: string, key: string, data: any): void;
}
declare class Collection<T, U> { }
type Data = any; //TODO: What this?

declare abstract class Entity<T> {
    _id: string;
    id: string;
    data: EntityData<T>;
    name: string;
    options: any;
    sheet: BaseEntitySheet<Entity<T>>;
    constructor(data: Partial<_DataType<T>>);
    clone(createData: any, options: any): Promise<Entity<T>>;
    createEmbeddedEntity(
        embeddedName: string,
        data: Data | Array<Data>,
        options: { temporary?: boolean; renderSheet?: boolean }
    ): Promise<Data | Array<Data>>;
    createOwnedItem(itemData: Object, options: { renderSheet: boolean }): Promise<Object>;
    delete(options: any): Promise<Entity<T>>;
    deleteEmbeddedEntity(embeddedName: string, data: string | Array<string>, options: any): Promise<Data | Array<Data>>;
    deleteOwnedItems(itemId: string, options: Object): Promise<Object>;
    exportToJson(): void;
    getEmbeddedCollection(embeddedName: string): Array<any>;
    update(data: _DataType<T>, options?: any): Promise<Entity<T>>;
}

declare abstract class FormApplication<T> {
    constructor(object: any, options?: any);
    static defaultOptions: any;
    editors: any;
    form: HTMLElement;
    options: { editable: boolean };
    object: T;
    render(force: boolean, options?: RenderOptions): Promise<void>;
    _renderInner(): Promise<void>;
    abstract _updateObject(event: Event, formData: any): Promise<T>;
    _onSubmit(event: JQuery.ClickEvent): void;
}

declare interface Game {
    packs: Map<string, Compendium>;
    settings: ClientSettings;
    user: User;
}

declare class Item<T> extends Entity<T> {
    static create<T>(data: Partial<EntityData<T>>): Promise<Item<T>>;
    static delete(id: string): Promise<void>;
    sheet: ItemSheet<Item<T>, T>;
}

declare class ItemDirectory {
    static collection: Map<string, Item<any>>;
}

declare module Items {
    function unregisterSheet<T extends Function>(name: string, sheet: T): void;
    function registerSheet<T extends Function>(name: string, sheet: T, options?: { makeDefault: boolean }): void;
}

declare class ItemSheet<ItemType extends Item<ItemDataType>, ItemDataType> extends BaseEntitySheet<ItemType> {
    public static get defaultOptions(): Object;
    item: ItemType;
    getData(): _DataType<ItemDataType>;
    _updateObject(event: Event, formData: any): Promise<ItemType>;
}

declare class Roll {
    constructor(formula: string, data?: any);
    roll(): void;
    render(chatOptions?: any): Promise<HTMLElement>;
    result: string;
    total: number;
}

declare class Token { }

declare class User {
    _id: string;
}

declare const game: Game;
declare const ui: any;
declare const CONFIG: {
    Actor: {
        entityClass: Function;
    };
    Combat: {
        initiative: {
            formula: string;
            decimals: number;
        };
    };
};
declare module Hooks {
    function once(trigger: string, callback: () => Promise<any>): void;
}

declare function duplicate<T>(original: T): T;
declare function mergeObject(
    original: Object,
    other: Object,
    insert?: boolean,
    overwrite?: boolean,
    inplace?: boolean,
    enforceTypes?: boolean,
    _d?: number
): Object;
declare function expandObject(original: Object): any;

/* Secret Sauce */

interface String {
    slugify(options: { strict?: boolean }): string;
}