(this["webpackJsonpPluginksk-heptacom-admin-open-auth"]=this["webpackJsonpPluginksk-heptacom-admin-open-auth"]||[]).push([[10],{CpQT:function(e,i,n){"use strict";n.r(i);i.default={template:'{% block heptacom_admin_open_auth_provider_jira_settings %}\n    <sw-card position-identifier="heptacom-admin-open-auth-provider-jira-settings">\n        <sw-text-field\n            :label="$t(\'heptacomAdminOpenAuthClient.providerFields.jira.clientId\')"\n            v-model="item.config.clientId"\n        ></sw-text-field>\n        <sw-password-field\n            :label="$t(\'heptacomAdminOpenAuthClient.providerFields.jira.clientSecret\')"\n            v-model="item.config.clientSecret"\n        ></sw-password-field>\n        <heptacom-admin-open-auth-scope-field\n            :label="$t(\'heptacomAdminOpenAuthClient.providerFields.jira.additionalScopes\')"\n            :defaultScopes="[\'read:me\', \'read:jira-user\', \'offline_access\']"\n            v-model="item.config.scopes"\n        ></heptacom-admin-open-auth-scope-field>\n    </sw-card>\n{% endblock %}\n',props:{item:{required:!0}}}}}]);