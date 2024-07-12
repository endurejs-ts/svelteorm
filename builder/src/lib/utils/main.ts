import * as fs from 'fs';
import { determineType } from '$lib/tools/index.js';

type TS_OR_JS = "ts" | "js";
type nos = number | string;
type nos_ob = nos | object | string[] | number[] | object[];

export default function svelteorm({option}: {option: TS_OR_JS} = { option: "js" }): SvelteORMInterface {
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
        // values.json에 데이터를 저장
        const jsonData = JSON.stringify(dataValues, null, 4);
        fs.writeFileSync(this.svpath, jsonData, 'utf-8');

        // option이 "ts"일 경우 types.json에 타입 정보를 저장
        if (this.svoption === "ts" && this.svop_path) {
            const typesData: Record<string, string> = {};

            for (const key in dataValues) {
                if (dataValues.hasOwnProperty(key)) {
                    const value = dataValues[key];
                    typesData[key] = determineType(value);
                }
            }

            const typesJsonData = JSON.stringify(typesData, null, 4);
            fs.writeFileSync(this.svop_path, typesJsonData, 'utf-8');
        }
        const datas = JSON.stringify(dataValues, null, 4);
        fs.writeFileSync(this.svpath, datas, "utf-8");
    }
}