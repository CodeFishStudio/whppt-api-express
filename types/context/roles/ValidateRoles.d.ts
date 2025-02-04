declare function _exports({ $mongo: { $db }, $env }: {
    $mongo: {
        $db: any;
    };
    $env: any;
}): (user: any, requiredRoles?: any[], requiresAdmin?: boolean) => Promise<void>;
export = _exports;
