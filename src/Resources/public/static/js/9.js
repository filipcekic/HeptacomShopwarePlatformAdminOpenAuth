(this["webpackJsonpPluginksk-heptacom-admin-open-auth"]=this["webpackJsonpPluginksk-heptacom-admin-open-auth"]||[]).push([[9],{WB7Y:function(e,n,o){"use strict";o.r(n);n.default={template:'{% block heptacom_admin_open_auth_client_google_cloud_settings %}\n    <sw-card position-identifier="heptacom-admin-open-auth-provider-google-cloud-settings">\n        <sw-text-field\n            required\n            :label="$t(\'heptacomAdminOpenAuthClient.providerFields.google_cloud.clientId\')"\n            v-model="item.config.clientId"\n        ></sw-text-field>\n        <sw-password-field\n            required\n            :label="$t(\'heptacomAdminOpenAuthClient.providerFields.google_cloud.clientSecret\')"\n            v-model="item.config.clientSecret"\n        ></sw-password-field>\n        <heptacom-admin-open-auth-scope-field\n            :label="$t(\'heptacomAdminOpenAuthClient.providerFields.google_cloud.additionalScopes\')"\n            v-model="item.config.scopes"\n        ></heptacom-admin-open-auth-scope-field>\n    </sw-card>\n{% endblock %}\n',props:{item:{required:!0}},watch:{item:function(e){e.config.scopes||(e.config.scopes=[])}}}}}]);