import SuperCalcEngine from '../BackEnd/SuperCalcEngine';

class SuperCalcFrontEndEngine {

    static finalDestinationColorFromIndex(index){
        let cbase = 255 - 16 * (index + 1);
        if (cbase < 127) {
            cbase = 127;
        }

        let rcbase = 255 -  0 - 8 * (index + 1);
        let gcbase = 255 - 8 - 4 * (index + 1);
        let bcbase = 255 - 16 -  8 * (index + 1);

        let hcbase = cbase.toString(16);

        let rhcbase = rcbase.toString(16);
        let ghcbase = gcbase.toString(16);
        let bhcbase = bcbase.toString(16);

        //let color = "#" + hcbase + hcbase + hcbase;
        let color = "#" + rhcbase + ghcbase + bhcbase;

        return color;
    }

    static getItemColor(item, all_totals) {

        const total = parseFloat(SuperCalcEngine.getFloatTotalPrice(item));

        // Nuovo
        if ((item.item_name === undefined) && (total === 0)) {
            return "GreenYellow";
        }

        // Senza prezzo
        if ((item.item_name !== undefined) && (total === 0)) {
            return "Salmon";
        }

        // Destinazione
        if ((item.item_name !== undefined) && (total !== 0)) {
            let final_destination_index = SuperCalcEngine.findFinalDestinationIndex(
                item.final_destination_1,
                all_totals.final_destination_1_totals
            )
            let color = SuperCalcFrontEndEngine.finalDestinationColorFromIndex(final_destination_index);
            return color;
        }
    }

}

export default SuperCalcFrontEndEngine;