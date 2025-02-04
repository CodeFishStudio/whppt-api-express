export declare const subheader: (shipping: any, contact: any) => {
    layout: string;
    table: {
        alignment: string;
        widths: string[];
        body: ({
            text: string;
            bold: boolean;
            font: string;
            style: string;
            margin: number[];
        }[] | {
            text: string;
            style: string;
            margin: number[];
        }[])[];
    };
}[];
