if (typeof DataTablesGrid == 'undefined') {

    DataTablesGrid = function(id) {
        this.Id = id;
        this.table = null;
    };

    DataTablesGrid.prototype.load = function(url, afterRender, afterCreate) {
        $.ajax({
            url: url,
            context: this
        }).done(function(response) {
            this.loadData(response, afterRender, afterCreate);
        });
    };

    DataTablesGrid.prototype.loadData = function(responseText, afterRender, afterCreate) {
        var response = $.parseJSON(responseText);
        if (response && response.length > 0) {
            ccolumns = [];
            for( key in response[0] )
            {


                var sclass = "field-" + key;

                var sortable = true;



                var visible = true;


                var options = {mData: key, sTitle: key, sClass: sclass, bSortable: sortable, visible: visible};

                ccolumns.push(options);
            }

            var options = {
                aaData: response,
                scrollX: "100%",
                aoColumns: ccolumns,
                language: {
                    "emptyTable":     "Nessun dato disponibile",
                    "thousands":      ".",
                    "loadingRecords": "Caricamento...",
                    "processing":     "Caricamento...",
                    "lengthMenu":     "Visualizza: _MENU_",
                    "search":         "Cerca:",
                    "zeroRecords":    "Nessun record trovato",
                    "paginate": {
                        "first":      "Primi",
                        "last":       "Ultimi",
                        "next":       "Prossimi",
                        "previous":   "Precedenti"
                    },
                    "aria": {
                        "sortAscending":  ": ordine crescente",
                        "sortDescending": ": ordine descrescente"
                    }
                },
                fnInitComplete: function(oSettings, json) {
                    if (afterRender != undefined) {
                        afterRender();
                    }
                }
            };

            if (this.table && response.length > 0) {
                this.table.fnAddData(response);
            } else {
                this.table = $('#' + this.Id).dataTable( options );
            }
            

        }

        if (afterCreate) {
            afterCreate();
        }
    };

    DataTablesGrid.prototype.click = function(callback) {
        var thatTable = this.table;
        $('#' + this.Id + ' tbody, #' + this.Id + ' .DTFC_Cloned tbody').off( 'click', 'td' );
        $('#' + this.Id + ' tbody, #' + this.Id + ' .DTFC_Cloned tbody').on( 'click', 'td', function () {
            var aPos = thatTable.fnGetPosition( this );
            var myCol = aPos[1];
            var aData = thatTable.fnGetData( aPos[0] );
            if (callback) {
                callback(thatTable.fnSettings().aoColumns[myCol].mData, $(this).html(), aData );
            }
        });
    }

    DataTablesGrid.prototype.getSize = function() {
        if (this.table) {
            return this.table.fnGetData().length;
        }
        return 0;
    };

    DataTablesGrid.prototype.getItem = function(index) {
        if (this.table && index < this.getSize()) {
            return this.table.fnGetData(index);
        }
        return null;
    };

    DataTablesGrid.prototype.getData = function() {
        if (this.table) {
            return this.table.fnGetData();
        }
        return null;
    };

}
