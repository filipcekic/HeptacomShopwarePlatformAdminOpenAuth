(this["webpackJsonpPluginksk-heptacom-admin-open-auth"]=this["webpackJsonpPluginksk-heptacom-admin-open-auth"]||[]).push([[1],{"4fjU":function(e,n,t){var i=t("7IeD");i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,t("P8hj").default)("e26e57be",i,!0,{})},"7IeD":function(e,n,t){},P8hj:function(e,n,t){"use strict";function i(e,n){for(var t=[],i={},o=0;o<n.length;o++){var r=n[o],s=r[0],a={id:e+":"+o,css:r[1],media:r[2],sourceMap:r[3]};i[s]?i[s].parts.push(a):t.push(i[s]={id:s,parts:[a]})}return t}t.r(n),t.d(n,"default",(function(){return f}));var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var r={},s=o&&(document.head||document.getElementsByTagName("head")[0]),a=null,u=0,c=!1,l=function(){},d=null,p="data-vue-ssr-id",m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function f(e,n,t,o){c=t,d=o||{};var s=i(e,n);return _(s),function(n){for(var t=[],o=0;o<s.length;o++){var a=s[o];(u=r[a.id]).refs--,t.push(u)}n?_(s=i(e,n)):s=[];for(o=0;o<t.length;o++){var u;if(0===(u=t[o]).refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete r[u.id]}}}}function _(e){for(var n=0;n<e.length;n++){var t=e[n],i=r[t.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](t.parts[o]);for(;o<t.parts.length;o++)i.parts.push(g(t.parts[o]));i.parts.length>t.parts.length&&(i.parts.length=t.parts.length)}else{var s=[];for(o=0;o<t.parts.length;o++)s.push(g(t.parts[o]));r[t.id]={id:t.id,refs:1,parts:s}}}}function h(){var e=document.createElement("style");return e.type="text/css",s.appendChild(e),e}function g(e){var n,t,i=document.querySelector("style["+p+'~="'+e.id+'"]');if(i){if(c)return l;i.parentNode.removeChild(i)}if(m){var o=u++;i=a||(a=h()),n=k.bind(null,i,o,!1),t=k.bind(null,i,o,!0)}else i=h(),n=w.bind(null,i),t=function(){i.parentNode.removeChild(i)};return n(e),function(i){if(i){if(i.css===e.css&&i.media===e.media&&i.sourceMap===e.sourceMap)return;n(e=i)}else t()}}var b,v=(b=[],function(e,n){return b[e]=n,b.filter(Boolean).join("\n")});function k(e,n,t,i){var o=t?"":i.css;if(e.styleSheet)e.styleSheet.cssText=v(n,o);else{var r=document.createTextNode(o),s=e.childNodes;s[n]&&e.removeChild(s[n]),s.length?e.insertBefore(r,s[n]):e.appendChild(r)}}function w(e,n){var t=n.css,i=n.media,o=n.sourceMap;if(i&&e.setAttribute("media",i),d.ssrId&&e.setAttribute(p,n.id),o&&(t+="\n/*# sourceURL="+o.sources[0]+" */",t+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}},fvyJ:function(e,n,t){"use strict";t.r(n);t("4fjU"),n.default={inheritAttrs:!1,template:'{% block heptacom_admin_open_auth_scope_field %}\n    <div class="heptacom-admin-open-auth-scope-field">\n        {% block heptacom_admin_open_auth_scope_field_confirm %}\n            <sw-confirm-field\n                v-bind="exceptInput($attrs)"\n                v-on="exceptInput($listeners)"\n                :preventEmptySubmit="true"\n                @input="addItem"\n                ref="confirmField"\n            ></sw-confirm-field>\n        {% endblock %}\n\n        {% block heptacom_admin_open_auth_scope_field_default_scopes_grid %}\n            <sw-grid\n                :header="false"\n                :selectable="false"\n                :table="true"\n                :items="defaultScopeItems">\n                {% block heptacom_admin_open_auth_scope_field_default_scopes_grid_inner %}\n                {% endblock %}\n\n                <template slot="columns" slot-scope="{ item }">\n                    {% block heptacom_admin_open_auth_scope_field_default_scopes_grid_columns %}\n                        {% block heptacom_admin_open_auth_scope_field_default_scopes_grid_columns_name %}\n                            <sw-grid-column>\n                                {{ item.name }}\n                            </sw-grid-column>\n                        {% endblock %}\n                    {% endblock %}\n                </template>\n            </sw-grid>\n        {% endblock %}\n\n        {% block heptacom_admin_open_auth_scope_field_items_grid %}\n            <sw-grid\n                :header="false"\n                :selectable="false"\n                :table="true"\n                :items="innerValue">\n                {% block heptacom_admin_open_auth_scope_field_items_grid_inner %}\n                {% endblock %}\n\n                <template slot="columns" slot-scope="{ item }">\n                    {% block heptacom_admin_open_auth_scope_field_items_grid_columns %}\n                        {% block heptacom_admin_open_auth_scope_field_items_grid_columns_name %}\n                            <sw-grid-column\n                                flex="1fr"\n                            >\n                                {{ item.name }}\n                            </sw-grid-column>\n                        {% endblock %}\n\n                        {% block heptacom_admin_open_auth_scope_field_items_grid_columns_actions %}\n                            <sw-grid-column\n                                align="right"\n                                flex="auto"\n                            >\n                                {% block heptacom_admin_open_auth_scope_field_items_grid_columns_actions_remove %}\n                                    <sw-button\n                                        @click="removeItem(item.name)"\n                                        size="x-small"\n                                        variant="danger"\n                                        square\n                                    >\n                                        <sw-icon\n                                            name="regular-minus-xs"\n                                            small\n                                        ></sw-icon>\n                                    </sw-button>\n                                {% endblock %}\n                            </sw-grid-column>\n                        {% endblock %}\n                    {% endblock %}\n                </template>\n            </sw-grid>\n        {% endblock %}\n    </div>\n{% endblock %}\n',props:{value:{required:!0,type:Array},defaultScopes:{required:!1,type:Array,default:function(){return[]}}},data:function(){var e=this;return{innerValue:this.value.filter((function(n){return-1===e.defaultScopes.indexOf(n)})).map((function(e){return{name:e}}))}},watch:{value:function(e){this.items=e}},computed:{defaultScopeItems:function(){return this.defaultScopes.map((function(e){return{name:e}}))},items:{get:function(){return this.innerValue.map((function(e){return e.name}))},set:function(e){this.innerValue=e.map((function(e){return{name:e}}))}}},methods:{addItem:function(e){this.isDefaultScope(e)||(this.innerValue=this.innerValue.filter((function(n){return n.name!==e})),this.innerValue.push({name:e}),this.$emit("input",this.items))},removeItem:function(e){this.innerValue=this.innerValue.filter((function(n){return n.name!==e})),this.$emit("input",this.items)},exceptInput:function(e){return e&&e.hasOwnProperty?Object.keys(e).reduce((function(n,t){return"input"!==t&&(n[t]=e[t]),n}),{}):e},isDefaultScope:function(e){return-1!==this.defaultScopes.findIndex((function(n){return n===e}))}}}}}]);