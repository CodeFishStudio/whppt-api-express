declare const subheader: (order: any, contact: any, memberTier: any) => {
    layout: string;
    table: {
        alignment: string;
        widths: string[];
        verticalAlignment: string;
        body: {
            alignment: string;
            verticalAlignment: string;
            fillColor: string;
            color: number[];
            margin: number[];
            layout: string;
            table: {
                verticalAlignment: string;
                widths: string[];
                body: ({
                    text: string;
                    fontSize: number;
                    color: number[];
                    font: string;
                    alignment: string;
                    verticalAlignment: string;
                }[] | ({
                    text: string;
                    fontSize: number;
                    font: string;
                    verticalAlignment: string;
                    alignment: string;
                } | {
                    text: string;
                    fontSize: number;
                    alignment: string;
                    font: string;
                    verticalAlignment?: undefined;
                })[])[];
            };
        }[][];
    };
}[];
export default subheader;
