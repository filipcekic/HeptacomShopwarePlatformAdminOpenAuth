"use strict";(window["webpackJsonpPluginksk-heptacom-admin-open-auth"]=window["webpackJsonpPluginksk-heptacom-admin-open-auth"]||[]).push([[864],{864:function(e,t,i){i.r(t),i.d(t,{default:function(){return n}});var n={template:'{% block heptacom_admin_open_auth_provider_jumpcloud_settings %}\n    {% block heptacom_admin_open_auth_provider_jumpcloud_settings_idp %}\n        <sw-card\n            :title="$t(\'heptacomAdminOpenAuthClient.providerFields.saml2.identityProviderCardTitle\')"\n            position-identifier="heptacom-admin-open-auth-provider-jumpcloud-settings-idp"\n        >\n            \n            <sw-textarea-field\n                :disabled="!!item.config.identityProviderMetadataUrl"\n                :label="$t(\'heptacomAdminOpenAuthClient.providerFields.jumpcloud.identityProviderMetadataXml\')"\n                v-model:value="item.config.identityProviderMetadataXml"\n            ></sw-textarea-field>\n        </sw-card>\n    {% endblock %}\n\n    {% block heptacom_admin_open_auth_provider_jumpcloud_settings_attribute_mapping %}\n        <sw-card\n            :title="$t(\'heptacomAdminOpenAuthClient.providerFields.saml2.attributeMapping.cardTitle\')"\n            position-identifier="heptacom-admin-open-auth-provider-jumpcloud-settings-attribute-mapping"\n        >\n            {% block heptacom_admin_open_auth_provider_jumpcloud_settings_attribute_mapping_inner %}\n                <template v-for="mappedProperty of availableProperties">\n                    <sw-text-field :label="$t(\'heptacomAdminOpenAuthClient.providerFields.saml2.attributeMapping.field.\' + mappedProperty)"\n                                   v-model:value="item.config.attributeMapping[mappedProperty]"\n                    ></sw-text-field>\n                </template>\n            {% endblock %}\n        </sw-card>\n    {% endblock %}\n{% endblock %}\n',props:{item:{required:!0}},data(){return{availableProperties:["firstName","lastName","email","timezone","locale","roles"]}},watch:{item(e){e.config.attributeMapping||(e.config.attributeMapping={})}}}}}]);
//# sourceMappingURL=8809e559cc7ccbee64f2.js.map