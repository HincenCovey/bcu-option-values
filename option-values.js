var com_hincencovey_option_values = {

    bigCommerceID : null,

    setBCID: function(bcid) { this.bigCommerceID = bcid; },

    processOptions: function() {
        $.ajax({
            url: 'https://hincencovey.com/ords/bcpub/so/products/details/' + this.bigCommerceID,
            type: 'get',
            dataType: 'json',
            success: function(json) {
                        for (var opType in json) {
                            if ("option_label_prices" === opType) {
                                for (var option in json[opType]) {
                                    var product_option_id = json[opType][option]["product_option_id"];
                                    var option_name = json[opType][option]["option_name"];
                                    var option_type = json[opType][option]["option_type"];
                                    var label_changes = json[opType][option]["label_changes"];
                                    for (var i in label_changes) {
                                        var option_value_id = label_changes[i]["option_value_id"];
                                        var existing_label = label_changes[i]["existing_label"];
                                        var new_label = label_changes[i]["new_label"];
                                        if ("RB" === option_type) {

                                            $("div.productAttributeRow div.productAttributeValue ul input[name='attribute[" + product_option_id + "]'][value='" + option_value_id + "']")
                                                .parent()
                                                .parent()
                                                .siblings("span.name:contains('" + existing_label + "')")
                                                .html(new_label);

                                        } else if ("PI" === option_type) {

                                            $("div.productAttributeRow > div.productAttributeLabel span.name:contains(" + option_name + ")").each( function() {
                                                $("div.productAttributeRow > div.productAttributeValue span.name:contains(" + existing_label + ")")
                                                    .html(new_label);
                                            });

                                        } else if ("CS" === option_type) {

                                            $("div.productAttributeRow input[name='attribute[" + product_option_id + "]'][value='" + option_value_id + "']")
                                                .siblings("span.name")
                                                .html(new_label);

                                            // The call to parent() followed by the call to children() implies that these two
                                            // lines could be replaced by a single call to siblings(). While that will work in
                                            // some cases, there are cases where the target object is the child of a sibling and
                                            // not a sibling itself.
                                            $("div.productAttributeRow input[name='attribute[" + product_option_id + "]'][value='" + option_value_id + "']")
                                                .parent()
                                                .children("span[title='" + existing_label + "']")
                                                .prop('title', new_label);

                                        } else if ("S" === option_type) {

                                            $("div.productAttributeRow select[name='attribute[" + product_option_id + "]'] > option[value='" + option_value_id + "']")
                                                .html(new_label);

                                        } else if ("C" === option_type || "P" === option_type || "RT" === option_type) {

                                            $("div.productAttributeRow > div.productAttributeLabel span.name:contains(" + option_name + ")").each( function() {
                                                $("div.productAttributeRow > div.productAttributeValue label > span:contains(" + existing_label + ")")
                                                    .html(new_label);
                                            });

                                        }                                
                                    }
                                }
                            }
                        }
                     },
            error:  function(data) {
                    }
        });
    },

    setupProduct : function() {
        this.processOptions();
    }
};
