declare function _exports({ $mongo: { $db }, $pageTypes, $fullUrl }: {
    $mongo: {
        $db: any;
    };
    $pageTypes: any;
    $fullUrl: any;
}, { page, size, slug, freq, pageType, priority, lastModTo, lastModFrom, domainId }: {
    page: any;
    size: any;
    slug: any;
    freq: any;
    pageType: any;
    priority: any;
    lastModTo: any;
    lastModFrom: any;
    domainId: any;
}): Promise<{
    sitemap: any[];
    total: number;
}>;
export = _exports;
