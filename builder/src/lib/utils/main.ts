import * as fs from 'fs';

type TS_OR_JS = "ts" | "js";

export function svelteorm({option = "js"}: {option: TS_OR_JS}) {
    const PATH = process.cwd();
    const R_PATH = {
        r1_path: PATH + "/dist/values.json",
        r2_path: PATH + "/dist/types.json"
    }

    if (option == "js") {}
    else if (option == "ts") {}
}