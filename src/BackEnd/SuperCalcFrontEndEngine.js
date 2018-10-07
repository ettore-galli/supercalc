import SuperCalcEngine from '../BackEnd/SuperCalcEngine';

class SuperCalcFrontEndEngine {

    static finalDestinationColorFromIndex(index){
        let cbase = 255 - 16 * (index + 1);
        if (cbase < 127) {
            cbase = 127;
        }

        let hcbase = cbase.toString(16);
        let color = "#" + hcbase + hcbase + hcbase;

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