$(document)
    .ready(function () {

        "use strict";

        $("#customer").DataTable({"responsive": true, "autoWidth": true});
        $("#transaction").DataTable({"responsive": true, "autoWidth": true});
        $("#productAttribute").DataTable({"responsive": true, "autoWidth": true});
        $("#vendor").DataTable({"responsive": true, "autoWidth": false});
        $("#productList").DataTable({"responsive": true, "autoWidth": false});
        $("#productVariation").DataTable({"responsive": true, "autoWidth": true});
        $("#productCategory").DataTable({"responsive": true, "autoWidth": true});

    });