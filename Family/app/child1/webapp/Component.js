sap.ui.define(
    ["sap/fe/core/AppComponent"],
    function (Component) {
        "use strict";

        return Component.extend("ns.child1.Component", {
            metadata: {
                manifest: "json"
            }
        });
    }
);