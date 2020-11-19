export class CombatManager {
    private static _instance: CombatManager;
    public get instance() {
        return CombatManager._instance;
    }
    public static Register(): void {
        this._instance = new CombatManager();
        this._instance.registerHooks();
    }

    public CurrentRound: number = 0;
    public CurrentCombatant: any;
    public Active: boolean = false;
    public ActiveCombat: string;

    //preUpdateCombat, updateCombat, getCombatTrackerEntryContext, renderCombatTracker
    private registerHooks() {
        let startedCombat = false;
        Hooks.on('updateCombat', function (combat: Combat, changed: any, diff: any) {
            if (!diff.diff || !combat.visible || changed.active === false || changed.active === true || !combat.started) {
                return;
            }
            if ((combat.round == 0 || combat.round == 1) && combat.turn == 0 && diff.round == null && diff.turn == null) {
                Hooks.callAll('encounterStart', combat, combat.id);
                Hooks.callAll('roundStart', combat, 1);
                Hooks.callAll('turnStart', combat, combat.combatant);
                Hooks.callAll('turnActive', combat, combat.combatant);
                startedCombat = true;
            }
        });
        Hooks.on('updateCombat', function (combat: Combat, changed: any, diff: any, blah: any) {
            if (!combat.visible || !combat.started || !diff.diff || changed.active === false) {
                return;
            }

            let priorCombatant: any = null;
            if (combat.turn != 0) {
                priorCombatant = combat.getCombatantByToken((combat.turns[combat.turn - 1] as any).tokenId);
            }

            if (changed.round != null && changed.turn != null) {
                Hooks.callAll('turnEnd', combat, combat.turns[combat.turns.length - 1]);
            }

            if (changed.round != null && !startedCombat) {
                Hooks.callAll('roundEnd', combat, combat.round - 1);
                Hooks.callAll('roundStart', combat, combat.round);
            } else {
                startedCombat = false;
            }
            if (changed.turn != null) {
                if (!changed.round) {
                    Hooks.callAll('turnEnd', combat, priorCombatant);
                }
                Hooks.callAll('turnStart', combat, combat.combatant);
                Hooks.callAll('turnActive', combat, combat.combatant);
            }
        });

        Hooks.on('deleteCombat', function (combat: Combat) {
            Hooks.callAll('roundEnd', combat, combat.round);
            Hooks.callAll('encounterEnd', combat, combat.id);
        });

        Hooks.on('encounterStart', function (_: any, id: string) {
            console.log(`Foured | Starting Encounter ${id}`);
        });
        Hooks.on('roundStart', function (_: any, round: number) {
            console.log(`Foured | Starting Round ${round}`);
        });
        Hooks.on('turnStart', function (_: any, combatant: any) {
            console.log("Foured | Starting Turn", combatant);
        });
        Hooks.on('turnActive', function (_: any, combatant: any) {
            console.log("Foured | Allowing Active Turn", combatant);
        });
        Hooks.on('turnEnd', function (_: any, combatant: any) {
            console.log("Foured | Ending Turn", combatant);
        });
        Hooks.on('roundEnd', function (_: any, round: number) {
            console.log(`Foured | Ending Round ${round}`);
        });
        Hooks.on('encounterEnd', function (_: any, id: string) {
            console.log(`Foured | Ending Encounter ${id}`);
        });
    }

    public sync(tracker: CombatTracker, selector: any, settings: any): void {
        if (tracker.combat == null) {
            this.Active = false;
            this.CurrentRound = 0;
            this.CurrentCombatant = null;
            this.ActiveCombat = null;
        } else {
            this.Active = tracker.combat.started;
            this.ActiveCombat = tracker.combat.uuid;
            this.CurrentRound = tracker.combat.round;
            this.CurrentCombatant = tracker.combat.combatant;
        }
        console.log(tracker);
        console.log(this);
    }

}