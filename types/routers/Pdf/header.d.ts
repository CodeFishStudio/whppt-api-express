declare const header: (orderId: string, updatedAt: string) => {
    layout: string;
    table: {
        alignment: string;
        heights: number[];
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
                    alignment: string;
                    verticalAlignment: string;
                    fillColor: string;
                    color: number[];
                    layout: string;
                    table: {
                        verticalAlignment: string;
                        widths: string[];
                        body: ({
                            image: string;
                            width: number;
                            height: number;
                            alignment: string;
                        }[] | {
                            text: string;
                            fontSize: number;
                            font: string;
                            verticalAlignment: string;
                            alignment: string;
                        }[])[];
                    };
                    margin?: undefined;
                } | {
                    alignment: string;
                    verticalAlignment: string;
                    fillColor: string;
                    color: number[];
                    layout: string;
                    margin: number[];
                    table: {
                        verticalAlignment: string;
                        widths: string[];
                        body: {
                            text: string;
                            font: string;
                            fontSize: number;
                            alignment: string;
                            verticalAlignment: string;
                        }[][];
                    };
                })[][];
            };
        }[][];
    };
}[];
export default header;
