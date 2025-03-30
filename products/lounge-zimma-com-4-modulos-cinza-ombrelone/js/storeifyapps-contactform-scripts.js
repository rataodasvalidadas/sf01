!(function() {
	  var B64={alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",lookup:null,ie:/MSIE /.test(navigator.userAgent),ieo:/MSIE [67]/.test(navigator.userAgent),encode:function(a){var e,f,g,b=B64.toUtf8(a),c=-1,d=b.length,h=[,,];if(B64.ie){for(var i=[];++c<d;)e=b[c],f=b[++c],h[0]=e>>2,h[1]=(3&e)<<4|f>>4,isNaN(f)?h[2]=h[3]=64:(g=b[++c],h[2]=(15&f)<<2|g>>6,h[3]=isNaN(g)?64:63&g),i.push(B64.alphabet.charAt(h[0]),B64.alphabet.charAt(h[1]),B64.alphabet.charAt(h[2]),B64.alphabet.charAt(h[3]));return i.join("")}for(var i="";++c<d;)e=b[c],f=b[++c],h[0]=e>>2,h[1]=(3&e)<<4|f>>4,isNaN(f)?h[2]=h[3]=64:(g=b[++c],h[2]=(15&f)<<2|g>>6,h[3]=isNaN(g)?64:63&g),i+=B64.alphabet[h[0]]+B64.alphabet[h[1]]+B64.alphabet[h[2]]+B64.alphabet[h[3]];return i},decode:function(a){if(a.length%4)throw new Error("InvalidCharacterError: 'B64.decode' failed: The string to be decoded is not correctly encoded.");var b=B64.fromUtf8(a),c=0,d=b.length;if(B64.ieo){for(var e=[];d>c;)b[c]<128?e.push(String.fromCharCode(b[c++])):b[c]>191&&b[c]<224?e.push(String.fromCharCode((31&b[c++])<<6|63&b[c++])):e.push(String.fromCharCode((15&b[c++])<<12|(63&b[c++])<<6|63&b[c++]));return e.join("")}for(var e="";d>c;)e+=b[c]<128?String.fromCharCode(b[c++]):b[c]>191&&b[c]<224?String.fromCharCode((31&b[c++])<<6|63&b[c++]):String.fromCharCode((15&b[c++])<<12|(63&b[c++])<<6|63&b[c++]);return e},toUtf8:function(a){var d,b=-1,c=a.length,e=[];if(/^[\x00-\x7f]*$/.test(a))for(;++b<c;)e.push(a.charCodeAt(b));else for(;++b<c;)d=a.charCodeAt(b),128>d?e.push(d):2048>d?e.push(192|d>>6,128|63&d):e.push(224|d>>12,128|63&d>>6,128|63&d);return e},fromUtf8:function(a){var c,b=-1,d=[],e=[,,];if(!B64.lookup){for(c=B64.alphabet.length,B64.lookup={};++b<c;)B64.lookup[B64.alphabet.charAt(b)]=b;b=-1}for(c=a.length;++b<c&&(e[0]=B64.lookup[a.charAt(b)],e[1]=B64.lookup[a.charAt(++b)],d.push(e[0]<<2|e[1]>>4),e[2]=B64.lookup[a.charAt(++b)],64!=e[2])&&(d.push((15&e[1])<<4|e[2]>>2),e[3]=B64.lookup[a.charAt(++b)],64!=e[3]);)d.push((3&e[2])<<6|e[3]);return d}};
	  //Add_storeify_data

    var replacer = function(finder, element, blackList) {
        if (!finder) {
            return
        }

        var regex = (typeof finder == 'string') ? new RegExp(finder, 'g') : finder;
        var regex2 = new RegExp(finder, 'g');

        var childNodes = element.childNodes;

        var len = childNodes.length;

        var list = typeof blackList == 'undefined' ? 'html,head,style,title,link,meta,script,object,iframe,pre,a,' : blackList;

        while (len--) {
            var node = childNodes[len];

            if (node.nodeType === 1 && true || (list.indexOf(node.nodeName.toLowerCase()) === -1)) {
                // console.log('---'); console.log(node); 
                replacer(finder, node, list);
            }
            //console.log(!regex.test(node.data));
            if (node.nodeType !== 3 || !regex.test(node.data)) {
                //console.log('+++'); console.log(node.data);
                var sliderId = regex2.exec(node.data);
                if (sliderId) {
                    var innerHTML = '<div class="storeify-formbuilder-view" id="storeify-formbuilder-view-' + sliderId[1] + '"></div>';
                    var str = node.data;

                    str = str.replace('[storeify-formbuilder-' + sliderId[1] + ']', innerHTML);
                    var node_child = document.createElement("span"); // Create a <li> node
                    node_child.innerHTML = str;
                    var parent = node.parentNode;

                    parent.insertBefore(node_child, node);
                    parent.removeChild(node);
                }
                continue;
            }
            var parent = node.parentNode;

            var str = parent.innerHTML;
            var array = [];
            while ((array1 = regex2.exec(str)) !== null) {
                if (array1[1]) array.push(array1[1]);

            }
            array.forEach((val) => {
                str = str.replace('[storeify-formbuilder-' + val + ']', '<div class="storeify-formbuilder-view" id="storeify-formbuilder-view-' + val + '"></div>');
            });
            var node_child = document.createElement("span"); // Create a <li> node
            node_child.innerHTML = str;
            parent.innerHTML = '';
            parent.appendChild(node_child);
        }
    };

    var loadScript = function(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        // If the browser is Internet Explorer.
        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
            // For any other browser.
        } else {
            script.onload = function() {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    var storeifyappsJavaScript = function(jQuery) {
        var config_reponse = JSON.parse(B64.decode(storeify_formbuilder_html));
        var storeifyapps_max = parseInt(B64.decode(storeifyapps_maxcount));
        var storeifyapps_filesize = parseFloat(B64.decode(storeifyapps_filesizeval));
        var storeifyapps_fileextensions = JSON.parse(B64.decode(ify_fileExtensions));
        jQuery(document).ready(function() {
            var blackList;
            jQuery('body').each(function() {
                replacer('\\[storeify-formbuilder-(\\d+)\\]', jQuery(this).get(0), blackList);
            });
        });

        function jviewFormbuilder(id, type, html, upload, max, storeify_filezie, fileExt, step_enabled, text_buton) {
            jQuery(document).ready(function() {
                jQuery('.storeify-formbuilder-button[data-target="#storeify-light-modal-' + id + '"]').show().addClass('btn-storeify-show');
                if (type != 3) {
                    jQuery('body').append(html);
                } else {
                    jQuery('#storeify-formbuilder-view-' + id).html(html);
                }
                //storeify_form_action_57 jQuery('#storeify_form_action_'+id)
                if (step_enabled == 1)
                    jQuery('#storeify_body_step_' + id).steps({
                        headerTag: ".storeify-step",
                        bodyTag: ".storeify-frm-tab",
                        transitionEffect: "slideLeft",
                        autoFocus: true,
                        labels: {
                            cancel: "Cancel",
                            current: "current step:",
                            pagination: "Pagination",
                            finish: text_buton.submit_button,
                            next: text_buton.next_button,
                            previous: text_buton.previous_button,
                            loading: "Loading ..."
                        },
                        titleTemplate: '<div class="storeify-dot dot-#index#"></div><span class="storeify-label">#title#</span>',
                        onStepChanging: function(event, currentIndex, newIndex) {
                            // Allways allow previous action even if the current form is not valid!
                            if (currentIndex > newIndex) {
                                return true;
                            }
                            // Forbid next action on "Warning" step if the user is to young
                            // if (newIndex === 3 && Number($("#age-2").val()) < 18)
                            // {
                            //     return false;
                            // }
                            // Needed in some cases if the user went back (clean up)
                            if (currentIndex < newIndex) {
                                // To remove error styles
                                jQuery('#storeify_form_action_' + id).find(".body:eq(" + newIndex + ") label.error").remove();
                                jQuery('#storeify_form_action_' + id).find(".body:eq(" + newIndex + ") .error").removeClass("error");
                            }
                            jQuery('#storeify_form_action_' + id).validate().settings.ignore = ":disabled,:hidden";
                            return jQuery('#storeify_form_action_' + id).valid();
                        },
                        onStepChanged: function(event, currentIndex, priorIndex) {
                            jQuery('#storeify_form_action_' + id + ' .steps ul li').removeClass('li-after');

                            jQuery('#storeify_form_action_' + id + ' .steps ul').find('li').each(function(i) {
                                // cache jquery var
                                var current = jQuery(this);
                                if (i > currentIndex) current.addClass('li-after');

                            });
                            // Used to skip the "Warning" step if the user is old enough.
                            // if (currentIndex === 2 && Number($("#age-2").val()) >= 18)
                            // {
                            //     jQuery('#storeify_form_action_'+id).steps("next");
                            // }
                            // Used to skip the "Warning" step if the user is old enough and wants to the previous step.
                            // if (currentIndex === 2 && priorIndex === 3)
                            // {
                            //     jQuery('#storeify_form_action_'+id).steps("previous");
                            // }
                        },
                        onFinishing: function(event, currentIndex) {
                            jQuery('#storeify_form_action_' + id).validate().settings.ignore = ":disabled,:hidden";
                            return jQuery('#storeify_form_action_' + id).valid();
                        },
                        onFinished: function(event, currentIndex) {
                            jQuery('#storeify_form_action_' + id).submit();
                        }
                    });
                if (upload.upload == 1)
                    uploadFile(id, upload.upload_label, upload.upload_url, max, storeify_filezie, fileExt);
            });
        }

        function uploadFile(id, label, url, max, storeify_filezie, fileExt) {
            var $storeifyapps_files = jQuery("#storeify_form_attach_file_" + id);
            var storeify_time = new Date().getTime();
            $storeifyapps_files.fileinput({
                allowedFileExtensions: fileExt, //['jpg', 'gif', 'png', 'jpeg', 'tiff', 'txt', 'mp3', 'mp4', 'zip', 'doc', 'docx', 'csv', 'xls', 'xlsx', 'ppt', 'pdf', 'psd', 'svg', 'esp', 'ai'],
                uploadUrl: url,
                uploadAsync: true,
                showPreview: false,
                showCaption: false,
                showCancel: false,
                showRemove: false,
                showUpload: false, // hide upload button
                showRemove: false, // hide remove button
                browseIcon: '<i class="fa fa-paperclip"> </i>',
                browseLabel: label,
                buttonLabelClass: 'label-attach',
                browseClass: 'btn-ctf-attach',
                removeLabel: '',
                removeClass: 'btn btn-ctf-remove-attach form-control',
                uploadLabel: '',
                uploadClass: 'btn btn-ctf-upload-attach form-control',
                msgInvalidFileExtension: 'Only "{extensions}" files are supported.',
                overwriteInitial: false, // append files to initial preview
                minFileCount: 1,
                maxFileCount: max,
                maxFileSize: storeify_filezie, //5Mb(5120)
                theme: 'fa',
                initialPreviewAsData: true,
                elErrorContainer: '#form_attach_file_error_' + id,
                uploadExtraData: function() {
                    return {
                        _token: jQuery("#storeify_form_action_" + id + " input[name='_token']").val(),
                        id: id,
                        shopify_domain: config_reponse.shopify_domain,
                    };
                },
                slugCallback: function(filename) {
                    filename = filename.replace('(', '_').replace('{', '_').replace('}', '_').replace('[', '_').replace(']', '_').replace(')', '_').replace(' ', '_').replace(',', '_').split();
                    filename = id + '_' + storeify_time + '_' + filename;
                    jQuery('#storeify_attach_filename_temp_' + id).val('storeify_v2');
                    // jQuery('#storeify_form_attach_filename_'+id).val(filename);
                    return filename;
                }
            }).on("filebatchselected", function(event, files) {
                // $storeifyapps_files.fileinput("upload");
                jQuery(event.target).fileinput("upload");
            }).on('filebatchpreupload', function(event, data, id, index) {

                var ele_id = data.extra.id;
                var string_name = jQuery('#storeify_form_attach_filename_' + ele_id).val();
                jQuery('#storeify_content_formbuilder_' + ele_id).addClass('storeify-frm-loading');
                if (string_name == '')
                    jQuery('#form_attach_file_success_' + ele_id).html('<ul></ul>').hide();

            }).on('fileuploaded', function(event, data, id, index) {
                var out = '';
                var ar_name = [];
                var ar_label = [];
                var ele_id = data.extra.id;
                var fname = data.files[index].name;
                var pathF = data.response.path;
                if (data.response.type == 'success') {
                    var string_name = jQuery('#storeify_form_attach_filename_' + ele_id).val() + ',' + pathF;
                    jQuery('#storeify_form_attach_filename_' + ele_id).val(string_name);
                    var li_item = '<li class="storeify-contact-img" data-id="' + ele_id + '" data-name="' + pathF + '"><i class="fa fa-file-o"></i>' + ' Uploaded file "' + fname + '" Successfully.' + ' <i style="font-size:14px;color:red;cursor: pointer;" class="fa fa-times storeify-delete-file" aria-hidden="true" title="Remove"></i></li>';
                } else {
                    var li_item = '<li class="storeify-contact-img" data-id="' + ele_id + '"><i class="fa fa-file-o"></i>' + ' Uploaded file "' + fname + '" Fail.' + ' <i style="font-size:14px;color:red;cursor: pointer;" class="fa fa-times storeify-delete-file" aria-hidden="true" title="Remove"></i></li>';
                }
                jQuery('#form_attach_file_success_' + ele_id + ' ul').append(li_item);
                jQuery('#form_attach_file_success_' + ele_id).fadeIn('slow');

                $storeifyapps_files.removeAttr('required');
                jQuery('#storeify_form_action_' + ele_id + ' .kv-upload-progress').hide();
                jQuery('#storeify_content_formbuilder_' + ele_id).removeClass('storeify-frm-loading');
                if (jQuery('#storeify_form_attach_filename_' + ele_id + '-error').length) jQuery('#storeify_form_attach_filename_' + ele_id + '-error').remove();

            });

            jQuery(document).on("click", ".storeify-contact-img .storeify-delete-file", function(e) {
                var ele_id = jQuery(this).parent().attr('data-id');
                var val = jQuery(this).parent().attr('data-name');
                var attach_submit = jQuery('#storeify_form_attach_filename_' + ele_id).val();
                jQuery('#storeify_form_attach_filename_' + ele_id).val(attach_submit.replace(',' + val, ''));
                jQuery(this).parent().remove();
                var child = jQuery('#form_attach_file_success_' + ele_id + ' ul li').length;
                if (child == 0) jQuery('#form_attach_file_success_' + ele_id).hide();
            });
        }
        var metaShopify = window.meta || {};
        var headerConfig = window.storeifyFormBuider || {};
        var ifyShopify = window.Shopify || {};
        var preMode = ifyShopify.designMode || false;
        var meta = {};
        jQuery.each(config_reponse.items, function(key, value) {
            if (value.show_all == 1 || preMode == true) {
                jviewFormbuilder(value.id, value.type, value.html, value.upload, storeifyapps_max, storeifyapps_filesize, storeifyapps_fileextensions, value.step_enabled, value.text_buton)
            } else {
                meta = metaShopify.page;
                if (headerConfig.page_type == 'index' && jQuery.inArray('home-', value.pages) != -1) {
                    jviewFormbuilder(value.id, value.type, value.html, value.upload, storeifyapps_max, storeifyapps_filesize, storeifyapps_fileextensions, value.step_enabled, value.text_buton)
                }
                if (headerConfig.page_type == 'product' && typeof meta.resourceId !== 'undefined') {
                    // console.log(jQuery.inArray(meta.resourceId.toString(),value.products))
                    if (jQuery.inArray(meta.resourceId.toString(), value.products) !== -1) {
                        jviewFormbuilder(value.id, value.type, value.html, value.upload, storeifyapps_max, storeifyapps_filesize, storeifyapps_fileextensions, value.step_enabled, value.text_buton)
                    }
                }
                if (headerConfig.page_type == 'collection') {

                    if (typeof meta.resourceId == 'undefined' && jQuery.inArray('collections-', value.pages) !== -1) {
                        jviewFormbuilder(value.id, value.type, value.html, value.upload, storeifyapps_max, storeifyapps_filesize, storeifyapps_fileextensions, value.step_enabled, value.text_buton)
                    }

                    if (typeof meta.resourceId != 'undefined' && jQuery.inArray(meta.resourceId.toString(), value.collections) !== -1) {
                        jviewFormbuilder(value.id, value.type, value.html, value.upload, storeifyapps_max, storeifyapps_filesize, storeifyapps_fileextensions, value.step_enabled, value.text_buton)
                    }
                }
                if (headerConfig.page_type == 'list-collections' && typeof meta.resourceId == 'undefined' && jQuery.inArray('catalog-', value.pages) !== -1) {
                    jviewFormbuilder(value.id, value.type, value.html, value.upload, storeifyapps_max, storeifyapps_filesize, storeifyapps_fileextensions, value.step_enabled, value.text_buton)
                }
                if (headerConfig.page_type == 'search' && jQuery.inArray('searchresult-', value.pages) !== -1) {
                    jviewFormbuilder(value.id, value.type, value.html, value.upload, storeifyapps_max, storeifyapps_filesize, storeifyapps_fileextensions, value.step_enabled, value.text_buton)
                }
                if (headerConfig.page_type == 'cart' && jQuery.inArray('cart-', value.pages) !== -1) {
                    jviewFormbuilder(value.id, value.type, value.html, value.upload, storeifyapps_max, storeifyapps_filesize, storeifyapps_fileextensions, value.step_enabled, value.text_buton)
                }
                if (typeof headerConfig.page_type != 'undefined' && headerConfig.page_type.indexOf("customers") != -1 && jQuery.inArray('customers-', value.pages) !== -1) {
                    jviewFormbuilder(value.id, value.type, value.html, value.upload, storeifyapps_max, storeifyapps_filesize, storeifyapps_fileextensions, value.step_enabled, value.text_buton)
                }
                if (headerConfig.page_type == 'blog' && jQuery.inArray('blog-', value.pages) !== -1) {
                    jviewFormbuilder(value.id, value.type, value.html, value.upload, storeifyapps_max, storeifyapps_filesize, storeifyapps_fileextensions, value.step_enabled, value.text_buton)
                }
                if (typeof meta.resourceId != 'undefined' && headerConfig.page_type == 'page') {
                    if (jQuery.inArray('page-' + meta.resourceId.toString(), value.pages) != -1) {
                        jviewFormbuilder(value.id, value.type, value.html, value.upload, storeifyapps_max, storeifyapps_filesize, storeifyapps_fileextensions, value.step_enabled, value.text_buton)
                    }
                }
            }
        });
        jQuery(document).ready(function() {
            jQuery(document).on("click", ".storeify-btn-trigger-popup,.storeify-formbuilder-button", function(e) {
                e.preventDefault();
                var target = jQuery(this).data('target');
                var form = jQuery(target).find('form');
                form.css("visibility", "visible");
                form.next(".storeify-formbuilder-mes").hide();
                form.find('.storeify-input-control').each(function() {
                    if (jQuery(this).hasClass('storeify-select') && jQuery(this).data('default') == '') {
                        jQuery(this).find('option:eq(0)').prop('selected', true);
                    } else {
                        jQuery(this).val(jQuery(this).data('default'));
                    }
                });
                form.find('.bg-success').html('');
                form.find('.file-error-message').html('');
                jQuery(target).addClass('target');
            });
            jQuery(document).on("click", ".storeify-formbuilder-button", function(e) {
                e.preventDefault();
                var target = jQuery(this).data('target');

                jQuery(target).addClass('target');
            });
            jQuery(document).on("click", ".storeify-frm-close", function(e) {
                e.preventDefault();
                var target = jQuery(this).parent().parent().parent();
                jQuery(target).removeClass('target');
            });

            var storeify_lang_cf = {
                autoclose: true,
                ignoreReadonly: true,
                format: 'DD/MM/YYYY'
            };
            if (typeof headerConfig.moment_lang !== 'undefined' && headerConfig.moment_lang !== '') storeify_lang_cf = {
                locale: headerConfig.moment_lang,
                autoclose: true,
                ignoreReadonly: true,
                format: 'DD/MM/YYYY'
            };
            jQuery(".datetimepicker-input").each(function() {
                storeify_lang_cf.format = jQuery(this).data('format');
                jQuery(this).parent().datetimepicker(storeify_lang_cf);
            });
            function getUtmSource(){
                let queryString = window.location.search;
                let urlParams = new URLSearchParams(queryString);
                let utm_source = urlParams.get('utm_source');
                if(utm_source == null) return '';
                return utm_source;
            }
            function submitAjax(form) {
                var pageType = '';
                if (typeof meta.pageType == 'undefined') {
                    if (window.location.pathname.indexOf('/cart')) {
                        pageType = 'cart';
                    }
                    if (window.location.pathname.indexOf('/acount')) {
                        pageType = 'acount';
                    }
                } else {
                    pageType = meta.pageType + '-' + meta.resourceId;
                }
                form.find('.submit_from').val(pageType);
                let ify_utm_source = getUtmSource();
                form.find('.ify_utm_source').val(ify_utm_source);
                jQuery.ajax({
                    type: 'POST',
                    url: form.attr('action'),
                    data: form.serialize(),
                    async: true,
                    cache: true,
                    beforeSend: function() {
                        form.parent().parent().addClass('storeify-frm-loading');

                    },

                    success: function(response) {
                        form.parent().parent().removeClass('storeify-frm-loading');
                        form.addClass('storeify-frm-sent');
                        form.css("visibility", "hidden");
                        form.next(".storeify-formbuilder-mes").removeClass('storeify-mes-alert');
                        form.next(".storeify-formbuilder-mes").removeClass('storeify-mes-success');
                        form.next(".storeify-formbuilder-mes").html(response.mes);
                        form.next(".storeify-formbuilder-mes").show();
                        var appConfig = window.storeifyFrombuilder || {};
                        if ((typeof appConfig['frmCallback_' + response.data.id]) === 'function') {
                            let callback = appConfig['frmCallback_' + response.data.id];
                            callback(response.data);
                        }
                        if (response.status == 0) {
                            form.next(".storeify-formbuilder-mes").addClass('storeify-mes-alert');
                        } else {
                            form.next(".storeify-formbuilder-mes").addClass('storeify-mes-success');
                            if (response.thankyoupage_url)
                                jQuery(location).attr('href', response.thankyoupage_url);
                        }
                    },
                    error: function(e) {
                        form.parent().parent().removeClass('storeify-frm-loading');
                        form.addClass('storeify-frm-sent');
                        form.css("visibility", "hidden");
                        form.next(".storeify-formbuilder-mes").addClass('storeify-mes-alert');
                        form.next(".storeify-formbuilder-mes").html('Error.');
                        form.next(".storeify-formbuilder-mes").show();
                    }

                });
            }
            jQuery('.storeify-form-action').each(function() {
                var id = jQuery(this).find("input[name='id']").val();
                var validations = {};
                var rule = {};
                var mes = {};
                jQuery.validator.addMethod("email", function(value, element) {
                    return this.optional(element) || /^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/i.test(value);
                }, "Email Address is invalid: Please enter a valid email address.");
                if (typeof storeifyValidate !== 'undefined') {
                    validations = storeifyValidate;
                    if (typeof validations[id].rules !== 'undefined')
                        rule = validations[id].rules;
                    if (typeof validations[id].mes !== 'undefined') {
                        //mes = validations[id].mes;
                        jQuery.each(validations[id].mes, function(key, value) {
                            var itemMes = {};
                            jQuery.each(value, function(k, l) {
                                itemMes[k] = jQuery.validator.format(l);
                            });
                            mes[key] = itemMes;
                        });
                    }
                }
                jQuery(this).validate({
                    ignore: '.storeify-hide .storeify-input-control,.storeify-hide input',
                    rules: rule,
                    messages: mes,
                    submitHandler: function(form) { // for demo
                        submitAjax(jQuery(form));
                    }
                });
            });
        });

    }; //end storeifyappsJavaScript


    if (typeof jQuery == 'undefined' || typeof jQuery.fn.on == 'undefined') {
        loadScript('//code.jquery.com/jquery-3.4.1.min.js', function() {

            storeifyAPPS = jQuery.noConflict(true);

            storeifyAPPS(document).ready(function() {

                storeifyappsJavaScript(storeifyAPPS);

            });

        });

    } else {

        storeifyappsJavaScript(jQuery);

    }

})();