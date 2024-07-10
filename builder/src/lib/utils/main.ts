import * as fs from 'fs';

type TS_OR_JS = "ts" | "js";
type nos = number | string;
type nos_ob = nos | object | string[] | number[] | object[];

export function svelteorm({option}: {option: TS_OR_JS} = { option: "js" }): SvelteORMInterface {
    const PATH = process.cwd();
    const R_PATH = {
        r1_path: PATH + "/dist/values.json",
        r2_path: PATH + "/dist/types.json"
    }

    if (option == "js" || !option) {
        return new SvelteORM(R_PATH.r1_path);
    }
    else if (option == "ts") {
        return new SvelteORM(R_PATH.r1_path, "ts", R_PATH.r2_path);
    }

    return new SvelteORM(R_PATH.r1_path);
}

interface SvelteORMInterface {
    create: (dataValues: Record<nos, nos_ob>) => void;
}

class SvelteORM implements SvelteORMInterface {

    constructor(private svpath: string, private svoption?: string, private svop_path?: string) {
        this.svpath = svpath;
        this.svoption = svoption;
    }

    create(dataValues: Record<nos, nos_ob>) {
        type keyofdatavalues = keyof typeof dataValues;
        const keyofdatavalues_impl = Object.keys(dataValues) as Array<keyofdatavalues>;

        for (const i of keyofdatavalues_impl) {
            console.log(i);
        }
    }
}